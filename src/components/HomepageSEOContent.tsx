import { Link } from "react-router-dom";
import { Sparkles, Heart, Gift, Clock } from "lucide-react";

export const HomepageSEOContent = () => {
  return (
    <section className="mt-10 lg:mt-12 max-w-4xl mx-auto">
      {/* How It Works */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          How Arguably Best Gifts Works
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          Finding the perfect gift doesn't have to be stressful. Our AI-powered gift recommendation engine 
          analyzes your specific situation — including who you're shopping for, their interests, and your 
          budget — to generate personalized gift ideas in seconds. Whether you're looking for a birthday 
          present, anniversary surprise, or holiday gift, we help you discover thoughtful options that 
          feel personal and meaningful.
        </p>
        <p className="text-sm text-muted-foreground">
          Simply describe the recipient (their relationship to you, age, and interests), set your budget 
          range, and let our intelligent system do the heavy lifting. Each suggestion comes with a clear 
          explanation of why it's a good match, helping you make confident decisions without endless browsing.
        </p>
      </div>

      {/* Why Use a Gift Generator */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          Why Use an AI Gift Generator?
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          Traditional gift shopping often leads to decision fatigue. You browse dozens of websites, compare 
          hundreds of products, and still worry whether your choice will land well. Our approach is different: 
          instead of showing you everything, we curate a focused selection based on what actually matters — 
          the person you're buying for.
        </p>
        <p className="text-sm text-muted-foreground">
          Research shows that personalized, thoughtful gifts create stronger emotional connections than 
          expensive generic ones. By understanding context — like relationship dynamics, shared experiences, 
          and personal preferences — we help you find gifts that demonstrate genuine care and attention.
        </p>
      </div>

      {/* Gift Giving Tips & Internal Links */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Gift Giving Guides & Resources
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Need more inspiration? Explore our curated gift guides with expert tips and trending ideas for 
          every occasion. From seasonal celebrations to milestone moments, we've compiled research-backed 
          recommendations to help you become a better gift-giver.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link 
            to="/gift-ideas" 
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium text-sm"
          >
            <Clock className="w-4 h-4" />
            Browse All Gift Guides
          </Link>
          <Link 
            to="/gift-guides/valentines-day-gift-ideas" 
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium text-sm"
          >
            <Heart className="w-4 h-4" />
            Valentine's Day Gift Ideas
          </Link>
        </div>
      </div>
    </section>
  );
};
