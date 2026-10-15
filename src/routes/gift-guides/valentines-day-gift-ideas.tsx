import { createFileRoute } from "@tanstack/react-router";
import ValentinesDayGiftIdeas, { VALENTINES_ARTICLE } from "@/pages/articles/ValentinesDayGiftIdeas";
import { articleHead } from "@/components/ArticleLayout";

export const Route = createFileRoute("/gift-guides/valentines-day-gift-ideas")({
  head: () => articleHead(VALENTINES_ARTICLE),
  component: ValentinesDayGiftIdeas,
});
