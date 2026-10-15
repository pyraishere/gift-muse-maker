export const SITE_URL = "https://arguablybestgifts.com";
export const SITE_NAME = "Arguably Best Gifts";

type PageHeadOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: object[];
};

/** Builds per-route head tags (server-rendered so crawlers and AI search see them). */
export function pageHead({ title, description, path, type = "website", jsonLd = [] }: PageHeadOptions) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((schema) => ({
      type: "application/ld+json",
      children: JSON.stringify(schema),
    })),
  };
}
