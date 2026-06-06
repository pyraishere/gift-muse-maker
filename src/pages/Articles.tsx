import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";

const articles = [
  {
    slug: "valentines-day-gift-ideas",
    title: "Best Valentine's Day Gift Ideas for 2026",
    description: "Discover thoughtful Valentine's Day gift ideas backed by research. From experience gifts to personalized items.",
    icon: Heart,
    readTime: "6 min read",
  },
];

const Articles = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Helmet>
        <title>Gift Guides & Articles — Arguably Best Gifts</title>
        <meta
          name="description"
          content="Browse our gift guides: research-backed ideas for Valentine's Day, birthdays, anniversaries, and more. Find the perfect gift faster."
        />
        <link rel="canonical" href="https://arguablybestgifts.com/gift-ideas" />
        <meta property="og:title" content="Gift Guides & Articles — Arguably Best Gifts" />
        <meta
          property="og:description"
          content="Browse our research-backed gift guides for every occasion: Valentine's, birthdays, anniversaries, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arguablybestgifts.com/gift-ideas" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gift Guides & Articles — Arguably Best Gifts" />
        <meta
          name="twitter:description"
          content="Research-backed gift guides for every occasion."
        />
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-3">
            Gift Giving Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and inspiration for finding the perfect gift
          </p>
        </header>

        {/* Articles Grid */}
        <main className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/gift-guides/${article.slug}`}
                className="group block p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <article.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground mb-3">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{article.readTime}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Articles;
