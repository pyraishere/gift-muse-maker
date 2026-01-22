import { Helmet } from "react-helmet-async";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface ArticleLayoutProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  publishDate?: string;
  readTime?: string;
  children: React.ReactNode;
}

export const ArticleLayout = ({
  title,
  description,
  canonicalUrl,
  publishDate,
  readTime,
  children,
}: ArticleLayoutProps) => {
  const siteUrl = "https://arguablybestgifts.com";
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : undefined;

  return (
    <>
      <Helmet>
        <title>{title} | Arguably Best Gifts</title>
        <meta name="description" content={description} />
        {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:site" content="@arguablybest" />
      </Helmet>

      <div className="min-h-screen bg-gradient-subtle">
        <Header />

        <article className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              to="/gift-ideas"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Gift Ideas
            </Link>
          </nav>

          {/* Article Header */}
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {publishDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {publishDate}
                </span>
              )}
              {readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {readTime}
                </span>
              )}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
            {children}
          </div>
        </article>
      </div>
    </>
  );
};
