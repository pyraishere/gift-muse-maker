import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";

const Articles = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Articles;
