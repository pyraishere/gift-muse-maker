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

    // Prefer the project's own OpenAI key (original behaviour); otherwise use the built-in AI gateway.
    const openAiKey = process.env["OPENAI_API_KEY"];
    const content = openAiKey
      ? await callOpenAi(openAiKey, userPrompt)
      : await callLovableGateway(userPrompt);
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

function throwForStatus(status: number): never {
  if (status === 429) throw new Error("Rate limit exceeded. Please try again in a moment.");
  if (status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
  throw new Error("Failed to generate gift ideas");
}

async function callOpenAi(apiKey: string, userPrompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    }),
  });
  if (!response.ok) {
    console.error("AI error:", response.status, await response.text());
    throwForStatus(response.status);
  }
  const json = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  return json.choices?.[0]?.message?.content ?? "";
}

const IDEAS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["ideas"],
  properties: {
    ideas: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "description", "keyword"],
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          keyword: { type: "string" },
        },
      },
    },
  },
};

/** Streams a Responses call through the Lovable AI Gateway and returns the ideas as a JSON array string. */
async function callLovableGateway(userPrompt: string): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured");
  const response = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "fetch" },
    body: JSON.stringify({
      model: "openai/gpt-6-astra",
      instructions: SYSTEM_PROMPT,
      input: userPrompt,
      stream: true,
      store: false,
      reasoning: { effort: "low", summary: "auto" },
      include: ["reasoning.encrypted_content"],
      text: { format: { type: "json_schema", name: "gift_ideas", strict: true, schema: IDEAS_SCHEMA } },
    }),
  });
  if (!response.ok || !response.body) {
    console.error("AI gateway error:", response.status, await response.text());
    throwForStatus(response.status);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const event = JSON.parse(payload) as { type?: string; delta?: string };
        if (event.type === "response.output_text.delta" && event.delta) text += event.delta;
        if (event.type === "error" || event.type === "response.failed") throwForStatus(500);
      } catch (err) {
        if (err instanceof Error && err.message !== "Unexpected end of JSON input" && !(err instanceof SyntaxError)) throw err;
      }
    }
  }
  const parsed = JSON.parse(text) as { ideas?: GeneratedGiftIdea[] };
  return JSON.stringify(parsed.ideas ?? []);
}
