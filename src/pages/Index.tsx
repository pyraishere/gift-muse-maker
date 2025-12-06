import { useState } from "react";
import { GiftForm, GiftFormData } from "@/components/GiftForm";
import { GiftCard, GiftIdea } from "@/components/GiftCard";
import { Button } from "@/components/ui/button";
import { RotateCcw, BookOpen, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import wizardLogo from "@/assets/wizard-gift-logo.png";

const Index = () => {
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

  const handleSubmit = async (formData: GiftFormData) => {
    setLastFormData(formData);
    await generateGifts(formData);
  };

  const handleRegenerate = async () => {
    if (lastFormData) {
      await generateGifts(lastFormData);
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
            <img 
              src={wizardLogo} 
              alt="Gift Wizard" 
              className="w-24 h-24 object-contain drop-shadow-lg"
            />
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
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleRegenerate}
                    variant="default"
                    className="flex items-center gap-2"
                    disabled={isLoading}
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? 'Generating...' : 'Regenerate'}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
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
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm space-y-3">
          <Link to="/blog">
            <Button variant="ghost" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Gift Giving Blog
            </Button>
          </Link>
          <p>Powered by AI • Amazon & Etsy Affiliate Links</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
