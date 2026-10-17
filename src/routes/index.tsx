import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { getHomepageJsonLd } from "@/components/HomepageJsonLd";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Gift Ideas for Boyfriend, Girlfriend & Family — Arguably Best Gifts",
      description:
        "Stuck on what to buy? Get 6 personalized gift ideas for your boyfriend, girlfriend, mom, dad or friend in under 30 seconds. Free, no signup.",
      path: "/",
      jsonLd: getHomepageJsonLd(),
    }),
  component: Index,
});
