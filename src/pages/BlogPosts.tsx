import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "The Art of Thoughtful Gift Giving",
    description: "Learn how to choose gifts that truly resonate with your loved ones and create lasting memories.",
    date: "Dec 1, 2025",
    readTime: "5 min read",
    category: "Tips",
  },
  {
    id: 2,
    title: "Budget-Friendly Gift Ideas That Feel Luxurious",
    description: "Discover how to give meaningful presents without breaking the bank. It's the thought that counts!",
    date: "Nov 28, 2025",
    readTime: "4 min read",
    category: "Budget",
  },
  {
    id: 3,
    title: "Personalized Gifts: Why They Matter",
    description: "Explore the psychology behind personalized gifts and why they create stronger emotional connections.",
    date: "Nov 25, 2025",
    readTime: "6 min read",
    category: "Psychology",
  },
  {
    id: 4,
    title: "Last-Minute Gift Ideas That Don't Feel Rushed",
    description: "Running out of time? These thoughtful gift ideas can be arranged quickly without sacrificing quality.",
    date: "Nov 20, 2025",
    readTime: "3 min read",
    category: "Quick Tips",
  },
];

const BlogPosts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Gift Finder
          </Button>
        </Link>

        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Gift Giving Blog
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tips, inspiration, and ideas to make every gift special
          </p>
        </header>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Card 
              key={post.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {post.category}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
