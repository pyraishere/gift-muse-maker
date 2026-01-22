import { Gift, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Articles = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Link to="/" className="p-4 bg-gradient-warm rounded-2xl shadow-soft hover:opacity-90 transition-opacity">
              <Gift className="w-10 h-10 text-primary-foreground" />
            </Link>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-3">
            Gift Giving Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and inspiration for finding the perfect gift
          </p>
        </header>

        {/* Articles Grid - Empty State */}
        <main className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-6 bg-muted/50 rounded-full mb-6">
              <FileText className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Coming Soon
            </h2>
            <p className="text-muted-foreground max-w-md">
              We're working on helpful articles about gift giving. Check back soon for tips on finding the perfect present for any occasion.
            </p>
            <Link
              to="/" 
              className="mt-6 text-primary hover:underline font-medium"
            >
              ← Back to Gift Generator
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Articles;
