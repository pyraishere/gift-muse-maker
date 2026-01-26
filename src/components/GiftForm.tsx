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
  occasion: string;
}

export const GiftForm = ({ onSubmit, isLoading }: GiftFormProps) => {
  const [formData, setFormData] = useState<GiftFormData>({
    recipient: "",
    age: "",
    interests: "",
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
    <Card className="p-6 lg:p-7 shadow-card animate-fade-in">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-gradient-warm rounded-xl">
          <Gift className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Find the Perfect Gift</h2>
          <p className="text-sm text-muted-foreground">Tell us about the special person</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="recipient" className="text-foreground font-medium text-sm">
            Who is this gift for?
          </Label>
          <Input
            id="recipient"
            name="recipient"
            placeholder="e.g., Mom, Best Friend, Colleague"
            value={formData.recipient}
            onChange={handleChange}
            required
            className="border-input bg-background h-9"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="age" className="text-foreground font-medium text-sm">
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
            className="border-input bg-background h-9"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="interests" className="text-foreground font-medium text-sm">
            What are their interests?
          </Label>
          <Textarea
            id="interests"
            name="interests"
            placeholder="e.g., Gardening, cooking, reading mystery novels"
            value={formData.interests}
            onChange={handleChange}
            required
            className="border-input bg-background min-h-[80px] resize-none text-sm"
          />
        </div>


        <div className="space-y-1.5">
          <Label htmlFor="occasion" className="text-foreground font-medium text-sm">
            What's the occasion?
          </Label>
          <Input
            id="occasion"
            name="occasion"
            placeholder="e.g., Birthday, Anniversary, Just Because"
            value={formData.occasion}
            onChange={handleChange}
            required
            className="border-input bg-background h-9"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-warm text-primary-foreground hover:opacity-90 transition-opacity shadow-soft h-10 text-sm font-medium mt-2"
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
