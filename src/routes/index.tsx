import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { getHomepageJsonLd } from "@/components/HomepageJsonLd";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "AI Gift Idea Generator 2026 — Arguably Best Gifts",
      description:
        "Free AI gift idea generator. Personalized gift recommendations for birthdays, Christmas, Valentine's Day, anniversaries & more.",
      path: "/",
      jsonLd: getHomepageJsonLd(),
    }),
  component: Index,
});
