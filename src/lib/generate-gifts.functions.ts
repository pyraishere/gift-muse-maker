import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const InputSchema = z.object({
  recipient: z.string().max(200),
  age: z.string().max(50).optional(),
  occasion: z.string().max(200),
  interests: z.string().max(1000),
});

export type GeneratedGiftIdea = { title: string; description: string; keyword: string };

const SYSTEM_PROMPT = `You are a helpful gift recommendation assistant. Generate creative, thoughtful gift ideas based on the user's requirements. Always respond with exactly 6 gift suggestions in valid JSON format.`;

export const generateGifts = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<{ giftIdeas: GeneratedGiftIdea[] }> => {
    const { recipient, occasion, interests } = data;

    const userPrompt = `Generate 6 gift ideas for:
- Recipient: ${recipient}
- Occasion: ${occasion}
- Interests: ${interests}

Respond with a JSON array containing exactly 6 objects, each with:
- "title": short gift name (2-4 words)
- "description": why this gift is perfect (1-2 sentences)
- "keyword": Amazon search keywords for this product (3-5 words)

Only output the JSON array, nothing else.`;

    // Prefer the project's own OpenAI key when configured; otherwise use the built-in AI gateway.
    const openAiKey = process.env["OPENAI_API_KEY"];
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const endpoint = openAiKey
      ? "https://api.openai.com/v1/chat/completions"
      : "https://ai.gateway.lovable.dev/v1/chat/completions";
    const apiKey = openAiKey ?? lovableKey;
    const model = openAiKey ? "gpt-4o-mini" : "google/gemini-2.5-flash";
    if (!apiKey) throw new Error("AI is not configured");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      console.error("AI gateway error:", response.status, await response.text());
      if (response.status === 429) throw new Error("Rate limit exceeded. Please try again in a moment.");
      if (response.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
      throw new Error("Failed to generate gift ideas");
    }

    const json = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const content = json.choices?.[0]?.message?.content ?? "";
    const match = content.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("Failed to parse gift suggestions");

    let giftIdeas: GeneratedGiftIdea[];
    try {
      giftIdeas = JSON.parse(match[0]) as GeneratedGiftIdea[];
    } catch {
      throw new Error("Failed to parse gift suggestions");
    }

    // Increment the public gift counter; never fail the request because of it.
    try {
      const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
      const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
      if (url && serviceKey) {
        const supabase = createClient(url, serviceKey);
        await supabase.rpc("increment_gift_count", { count_to_add: giftIdeas.length });
      }
    } catch (counterError) {
      console.error("Failed to increment counter:", counterError);
    }

    return { giftIdeas };
  });
