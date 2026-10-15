import { createFileRoute } from "@tanstack/react-router";
import AiGiftGeneratorBoyfriend from "@/pages/AiGiftGeneratorBoyfriend";
import { pageHead, SITE_URL } from "@/lib/seo";

const PATH = "/ai-gift-generator-for-boyfriend";
const DESCRIPTION =
  "Find the perfect gift for your boyfriend in seconds with our free AI gift generator. No signup needed.";

export const Route = createFileRoute("/ai-gift-generator-for-boyfriend")({
  head: () =>
    pageHead({
      title: "AI Gift Generator for Boyfriend (Free & Instant Ideas 2026)",
      description: DESCRIPTION,
      path: PATH,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "AI Gift Generator for Boyfriend",
          url: `${SITE_URL}${PATH}`,
          description: DESCRIPTION,
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "AI Gift Generator for Boyfriend", item: `${SITE_URL}${PATH}` },
            ],
          },
        },
      ],
    }),
  component: AiGiftGeneratorBoyfriend,
});
