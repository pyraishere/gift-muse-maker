import { Header } from "./Header";
import { Link } from "@/lib/router-compat";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { ReactNode } from "react";

interface ArticleLayoutProps {
  title: string;
  publishDate?: string;
  readTime?: string;
  children: ReactNode;
}

import { pageHead, SITE_NAME, SITE_URL } from "@/lib/seo";

type ArticleMeta = {
  title: string;
  description: string;
  path: string;
  publishDate?: string;
  author?: string;
};

/** Server-rendered head tags + Article JSON-LD for an article route. */
export const articleHead = ({ title, description, path, publishDate, author = SITE_NAME }: ArticleMeta) => {
  const url = `${SITE_URL}${path}`;
  const parsedDate = publishDate ? new Date(publishDate) : null;
  const isoDate = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : undefined;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    ...(isoDate && { datePublished: isoDate, dateModified: isoDate }),
    author: { "@type": "Organization", name: author },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Gift Ideas & Guides", item: `${SITE_URL}/gift-ideas` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };
  return pageHead({
    title: `${title} | ${SITE_NAME}`,
    description,
    path,
    type: "article",
    jsonLd: [articleJsonLd, breadcrumbJsonLd],
  });
};

export const ArticleLayout = ({
  title,
  publishDate,
  readTime,
  children,
}: ArticleLayoutProps) => {
  return (
    <>
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
