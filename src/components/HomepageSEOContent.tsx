import { Link } from "react-router-dom";
import { Sparkles, Heart, Gift, Clock, HelpCircle, CheckCircle } from "lucide-react";

export const HomepageSEOContent = () => {
  return (
    <section className="mt-10 lg:mt-12 max-w-4xl mx-auto">
      {/* How It Works */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          How Our AI Gift Idea Generator Works
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          Finding the <strong>perfect gift</strong> doesn't have to be stressful. Our <strong>AI-powered gift recommendation engine</strong> analyzes 
          your specific situation — including who you're shopping for, their interests, and your 
          budget — to generate <strong>personalized gift ideas</strong> in seconds. Whether you need a <strong>birthday 
          gift</strong>, <strong>anniversary present</strong>, <strong>Christmas gift</strong>, or <strong>Valentine's Day surprise</strong>, we help you discover 
          thoughtful options that feel personal and meaningful.
        </p>
        <p className="text-sm text-muted-foreground">
          Simply describe the recipient (their relationship to you, age, and interests), set your budget 
          range, and let our intelligent system do the heavy lifting. Each <strong>gift suggestion</strong> comes with a clear 
          explanation of why it's a good match, plus direct links to buy on Amazon and Etsy.
        </p>
      </div>

      {/* Gift Ideas by Occasion */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          Gift Ideas for Every Occasion
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          Whether you're looking for <strong>gifts for her</strong>, <strong>gifts for him</strong>, <strong>gifts for kids</strong>, or <strong>gifts for couples</strong>, 
          our generator covers every recipient and occasion. Popular categories include:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1.5 mb-3 list-none">
          {[
            "Birthday gift ideas — unique and personalized presents for any age",
            "Christmas & holiday gifts — from stocking stuffers to premium presents",
            "Valentine's Day gifts — romantic and thoughtful surprises",
            "Mother's Day & Father's Day gifts — show your appreciation",
            "Wedding & anniversary gifts — celebrate love milestones",
            "Graduation gifts — mark their achievement with something special",
            "Housewarming gifts — practical and memorable new-home presents",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          Research shows that <strong>personalized, thoughtful gifts</strong> create stronger emotional connections than 
          expensive generic ones. By understanding context — like relationship dynamics and personal preferences — we 
          help you find gifts that demonstrate genuine care and attention.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Frequently Asked Questions About Gift Ideas
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "How does the AI gift idea generator work?",
              a: "Describe who you're buying for — their age, interests, your relationship, and your budget — and our AI analyzes thousands of gift options to surface the most thoughtful, personalized recommendations in seconds.",
            },
            {
              q: "Is this gift recommendation tool free?",
              a: "Yes! Arguably Best Gifts is completely free. Generate unlimited personalized gift ideas for any occasion without creating an account.",
            },
            {
              q: "What occasions can I find gift ideas for?",
              a: "Birthdays, Christmas, Valentine's Day, Mother's Day, Father's Day, anniversaries, weddings, baby showers, graduations, housewarmings, and any other celebration.",
            },
            {
              q: "Can I set a budget for gift suggestions?",
              a: "Absolutely. Specify your budget range and all gift recommendations will be tailored to fit — from affordable stocking stuffers under $25 to premium luxury gifts over $200.",
            },
            {
              q: "Where can I buy the recommended gifts?",
              a: "Each suggestion includes direct links to Amazon and Etsy. Links are automatically localized to your region (e.g., Amazon.de for Germany, Amazon.co.uk for the UK).",
            },
          ].map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors list-none flex items-start gap-2">
                <span className="text-primary mt-0.5">Q:</span>
                {q}
              </summary>
              <p className="text-sm text-muted-foreground mt-1.5 ml-5">{a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Gift Giving Guides */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Gift Giving Guides & Resources
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Need more inspiration? Explore our curated <strong>gift guides</strong> with expert tips and trending ideas for 
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
