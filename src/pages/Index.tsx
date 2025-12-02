import { useState } from "react";
import { GiftForm, GiftFormData } from "@/components/GiftForm";
import { GiftCard, GiftIdea } from "@/components/GiftCard";
import { Button } from "@/components/ui/button";
import { Gift, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

const Index = () => {
  const [giftIdeas, setGiftIdeas] = useState<GiftIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: GiftFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-gifts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate gift ideas");
      }

      setGiftIdeas(data.giftIdeas);
      
      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'],
      });
      
      toast({
        title: "Gift ideas generated!",
        description: "Check out these perfect gift suggestions.",
      });
    } catch (error) {
      console.error("Error generating gifts:", error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGiftIdeas([]);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-warm rounded-2xl shadow-soft">
              <Gift className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-3">
            WhatShouldIBuy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered gift recommendations tailored to your loved ones
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          {giftIdeas.length === 0 ? (
            <GiftForm onSubmit={handleSubmit} isLoading={isLoading} />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between animate-fade-in">
                <h2 className="text-3xl font-semibold text-foreground">
                  Perfect Gift Ideas
                </h2>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {giftIdeas.map((idea, index) => (
                  <GiftCard key={index} idea={idea} index={index} />
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm">
          <p>Powered by AI • Amazon Affiliate Links</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
