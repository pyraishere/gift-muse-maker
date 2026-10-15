import { useState } from "react";
import { Link } from "@/lib/router-compat";
import { GiftForm, GiftFormData } from "@/components/GiftForm";
import { GiftCard, GiftIdea } from "@/components/GiftCard";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Sparkles, Zap, Heart, ShieldCheck, RotateCcw, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import { generateGifts as generateGiftIdeas } from "@/lib/generate-gifts.functions";

const AiGiftGeneratorBoyfriend = () => {
  const [giftIdeas, setGiftIdeas] = useState<GiftIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFormData, setLastFormData] = useState<GiftFormData | null>(null);
  const { toast } = useToast();

  const generateGifts = async (formData: GiftFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-gifts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate gift ideas");
      setGiftIdeas(data.giftIdeas);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
      });
      toast({ title: "Gift ideas generated!", description: "Check out these perfect gift suggestions." });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: GiftFormData) => {
    setLastFormData({ ...formData, recipient: "boyfriend" });
    await generateGifts({ ...formData, recipient: "boyfriend" });
  };

  const scrollToGenerator = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Hero */}
        <header className="text-center mb-8 animate-fade-in max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="p-3 bg-gradient-warm rounded-xl shadow-soft">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
            AI Gift Generator for Boyfriend
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-5">
            Find the perfect gift for your boyfriend in seconds — free and personalized.
          </p>
          <Button
            onClick={scrollToGenerator}
            size="lg"
            className="bg-gradient-warm text-primary-foreground hover:opacity-90 shadow-soft gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generate Gift Ideas
          </Button>
        </header>

        <main className="max-w-4xl mx-auto">
          {/* Generator */}
          <section id="generator" className="scroll-mt-20">
            {giftIdeas.length === 0 ? (
              <GiftForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                defaults={{ recipient: "boyfriend" }}
                hideFields={["recipient"]}
                title="Gift Ideas for Your Boyfriend"
                subtitle="Just a few details — we'll handle the rest"
              />
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between animate-fade-in">
                  <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
                    Gift Ideas for Your Boyfriend
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => lastFormData && generateGifts(lastFormData)}
                      variant="default"
                      className="flex items-center gap-2"
                      disabled={isLoading}
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                      {isLoading ? "Generating..." : "Regenerate"}
                    </Button>
                    <Button onClick={() => setGiftIdeas([])} variant="outline" className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Start Over
                    </Button>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {giftIdeas.map((idea, index) => (
                    <GiftCard key={index} idea={idea} index={index} />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Quick Benefits */}
          <section className="grid sm:grid-cols-3 gap-4 mt-10">
            <Card className="p-5 flex items-start gap-3">
              <div className="p-2 bg-gradient-warm rounded-lg shrink-0">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <p className="text-sm text-foreground"><strong>Personalized</strong> gift ideas in seconds</p>
            </Card>
            <Card className="p-5 flex items-start gap-3">
              <div className="p-2 bg-gradient-warm rounded-lg shrink-0">
                <ShieldCheck className="w-4 h-4 text-primary-foreground" />
              </div>
              <p className="text-sm text-foreground"><strong>No signup</strong> required — totally free</p>
            </Card>
            <Card className="p-5 flex items-start gap-3">
              <div className="p-2 bg-gradient-warm rounded-lg shrink-0">
                <Gift className="w-4 h-4 text-primary-foreground" />
              </div>
              <p className="text-sm text-foreground">Perfect for <strong>birthdays, anniversaries</strong>, or last-minute gifts</p>
            </Card>
          </section>

          {/* SEO Content */}
          <section className="mt-14 max-w-3xl mx-auto space-y-10 text-foreground">
            <article>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-3">How to choose a gift for your boyfriend</h2>
              <p className="text-muted-foreground leading-relaxed">
                Picking a gift for your boyfriend can feel surprisingly tricky. You want something that feels
                personal, but not over the top. Something he'll actually use, not stash in a drawer. Most people
                end up cycling between the same safe ideas — a wallet, a gadget, another hoodie — and miss the
                chance to give something he'll genuinely remember. Personalized gifts work better because they
                show you paid attention to what he actually likes, not what's trending on a generic gift list.
              </p>
            </article>

            <article>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-3">Why use an AI gift generator</h2>
              <p className="text-muted-foreground leading-relaxed">
                An AI gift generator takes a few quick details — his age, his interests, the occasion — and
                turns them into tailored ideas in seconds. No endless scrolling through "Top 100" lists, no
                guessing. It's faster than a Google search, more personal than a gift guide, and free to use.
                Whether you have weeks to plan or you're shopping the night before, you'll get suggestions that
                actually fit him.
              </p>
            </article>

            <article>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-3">Gift ideas for boyfriends</h2>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                <li><strong>Tech & gadgets</strong> — wireless earbuds, a smartwatch, or a mechanical keyboard for the setup nerd.</li>
                <li><strong>Experiences</strong> — concert tickets, a cooking class, a weekend escape, or an indoor skydiving session.</li>
                <li><strong>Personalized items</strong> — engraved leather wallets, custom star maps, or a photo book of your favorite moments.</li>
                <li><strong>Hobby gear</strong> — gym accessories, fishing tackle, art supplies, or upgraded gaming peripherals.</li>
                <li><strong>Style upgrades</strong> — a quality watch, a signature cologne, or a wardrobe staple in his favorite color.</li>
                <li><strong>Cozy & home</strong> — a great coffee setup, a whiskey decanter set, or noise-cancelling headphones for working from home.</li>
                <li><strong>Last-minute wins</strong> — digital subscriptions, premium gift cards, or a curated date night planned by you.</li>
              </ul>
            </article>
          </section>

          {/* Final CTA */}
          <section className="mt-14 mb-10">
            <Card className="p-8 text-center bg-gradient-warm">
              <h2 className="text-2xl lg:text-3xl font-semibold text-primary-foreground mb-2">
                Still not sure what to get?
              </h2>
              <p className="text-primary-foreground/90 mb-5">
                Let our AI do the thinking. Get personalized ideas in seconds.
              </p>
              <Button
                onClick={scrollToGenerator}
                size="lg"
                variant="secondary"
                className="gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Try the Gift Generator Now
              </Button>
            </Card>
          </section>

          {/* Internal links */}
          <nav aria-label="Related pages" className="mt-8 text-center text-sm text-muted-foreground">
            <p className="mb-2">Explore more gift tools:</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <Link to="/" className="text-primary hover:underline">Homepage gift generator</Link>
              <Link to="/gift-ideas" className="text-primary hover:underline">All gift guides</Link>
              <Link to="/gift-guides/valentines-day-gift-ideas" className="text-primary hover:underline">Valentine's Day gifts</Link>
            </div>
          </nav>
        </main>
      </div>
    </div>
  );
};

export default AiGiftGeneratorBoyfriend;
