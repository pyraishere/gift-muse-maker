import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export interface GiftIdea {
  title: string;
  description: string;
  keyword: string;
}

interface GiftCardProps {
  idea: GiftIdea;
  index: number;
}

export const GiftCard = ({ idea, index }: GiftCardProps) => {
  const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(idea.keyword)}`;

  return (
    <Card 
      className="p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up bg-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {idea.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {idea.description}
          </p>
        </div>
        
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft transition-all"
        >
          <a
            href={amazonSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            View on Amazon
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </Card>
  );
};
