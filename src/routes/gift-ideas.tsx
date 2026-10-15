import { createFileRoute } from "@tanstack/react-router";
import Articles from "@/pages/Articles";
import { pageHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/gift-ideas")({
  head: () =>
    pageHead({
      title: "Gift Guides & Articles — Arguably Best Gifts",
      description:
        "Browse our gift guides: research-backed ideas for Valentine's Day, birthdays, anniversaries, and more. Find the perfect gift faster.",
      path: "/gift-ideas",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Gift Guides & Articles",
          url: `${SITE_URL}/gift-ideas`,
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Gift Ideas & Guides", item: `${SITE_URL}/gift-ideas` },
          ],
        },
      ],
    }),
  component: Articles,
});
