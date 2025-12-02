import { useState } from "react";
import { GiftForm, GiftFormData } from "@/components/GiftForm";
import { GiftCard, GiftIdea } from "@/components/GiftCard";
import { Button } from "@/components/ui/button";
import { Gift, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [giftIdeas, setGiftIdeas] = useState<GiftIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: GiftFormData) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call to edge function
      // Simulating API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data - will be replaced with real API response
      const mockIdeas: GiftIdea[] = [
        {
          title: "Cozy Reading Lamp",
          description: "Perfect for late-night reading sessions. This adjustable LED lamp provides warm, eye-friendly lighting for book lovers.",
          keyword: "adjustable led reading lamp warm light"
        },
        {
          title: "Gourmet Coffee Sampler",
          description: "A collection of premium coffee beans from around the world. Great for coffee enthusiasts who enjoy trying new flavors.",
          keyword: "gourmet coffee sampler gift set"
        },
        {
          title: "Personalized Journal",
          description: "A beautiful leather-bound journal with custom embossing. Ideal for capturing thoughts, dreams, and daily reflections.",
          keyword: "personalized leather journal custom"
        }
      ];
      
      setGiftIdeas(mockIdeas);
      
      toast({
        title: "Gift ideas generated!",
        description: "Check out these perfect gift suggestions.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
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
