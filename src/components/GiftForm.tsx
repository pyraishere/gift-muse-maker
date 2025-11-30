import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Gift, Sparkles } from "lucide-react";

interface GiftFormProps {
  onSubmit: (data: GiftFormData) => void;
  isLoading: boolean;
}

export interface GiftFormData {
  recipient: string;
  age: string;
  interests: string;
  budget: string;
  occasion: string;
}

export const GiftForm = ({ onSubmit, isLoading }: GiftFormProps) => {
  const [formData, setFormData] = useState<GiftFormData>({
    recipient: "",
    age: "",
    interests: "",
    budget: "",
    occasion: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card className="p-8 shadow-card animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-warm rounded-xl">
          <Gift className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Find the Perfect Gift</h2>
          <p className="text-muted-foreground">Tell us about the special person</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="recipient" className="text-foreground font-medium">
            Who is this gift for?
          </Label>
          <Input
            id="recipient"
            name="recipient"
            placeholder="e.g., Mom, Best Friend, Colleague"
            value={formData.recipient}
            onChange={handleChange}
            required
            className="border-input bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age" className="text-foreground font-medium">
            Their age
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            placeholder="e.g., 35"
            value={formData.age}
            onChange={handleChange}
            required
            className="border-input bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests" className="text-foreground font-medium">
            What are their interests?
          </Label>
          <Textarea
            id="interests"
            name="interests"
            placeholder="e.g., Gardening, cooking, reading mystery novels"
            value={formData.interests}
            onChange={handleChange}
            required
            className="border-input bg-background min-h-[100px] resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-foreground font-medium">
            Budget
          </Label>
          <Input
            id="budget"
            name="budget"
            placeholder="e.g., 20-50, under 100"
            value={formData.budget}
            onChange={handleChange}
            required
            className="border-input bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="occasion" className="text-foreground font-medium">
            What's the occasion?
          </Label>
          <Input
            id="occasion"
            name="occasion"
            placeholder="e.g., Birthday, Anniversary, Just Because"
            value={formData.occasion}
            onChange={handleChange}
            required
            className="border-input bg-background"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-warm text-primary-foreground hover:opacity-90 transition-opacity shadow-soft h-12 text-base font-medium"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 animate-spin" />
              Finding Perfect Gifts...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate Gift Ideas
            </span>
          )}
        </Button>
      </form>
    </Card>
  );
};
