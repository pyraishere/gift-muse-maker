import { Helmet } from "react-helmet-async";

export const HomepageJsonLd = () => {
  const siteUrl = "https://arguablybestgifts.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Arguably Best Gifts",
    url: siteUrl,
    description:
      "AI-powered gift recommendation engine helping you find thoughtful, personalized gift ideas for any occasion and budget.",
    sameAs: [
      "https://twitter.com/arguablybest",
      "https://www.facebook.com/arguablybestgifts",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Arguably Best Gifts",
    url: siteUrl,
    description:
      "Find the perfect gift for anyone. AI-powered personalized gift ideas for birthdays, holidays, anniversaries, and every occasion.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Arguably Best Gifts — AI Gift Idea Generator",
    url: siteUrl,
    applicationCategory: "ShoppingApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free AI gift idea generator. Get personalized gift recommendations based on recipient, occasion, interests, and budget in seconds.",
    featureList: [
      "Personalized gift recommendations",
      "Budget-based filtering",
      "Occasion-specific suggestions",
      "AI-powered gift matching",
      "Amazon and Etsy product links",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the AI gift idea generator work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply describe who you're buying for — their age, interests, your relationship, and your budget — and our AI analyzes thousands of gift options to surface the most thoughtful, personalized recommendations in seconds.",
        },
      },
      {
        "@type": "Question",
        name: "Is this gift recommendation tool free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Arguably Best Gifts is completely free. You can generate unlimited personalized gift ideas for any occasion without creating an account.",
        },
      },
      {
        "@type": "Question",
        name: "What occasions can I find gift ideas for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can find gift ideas for birthdays, Christmas, Valentine's Day, Mother's Day, Father's Day, anniversaries, weddings, baby showers, graduations, housewarmings, and any other special occasion.",
        },
      },
      {
        "@type": "Question",
        name: "Can I set a budget for gift suggestions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. You can specify your budget range and all gift recommendations will be tailored to fit within your price range, from affordable stocking stuffers to premium luxury gifts.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I buy the recommended gifts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each gift suggestion includes direct links to purchase on Amazon and Etsy. Links are automatically localized to your region (e.g., Amazon.de for Germany, Amazon.co.uk for the UK).",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gift Ideas & Guides",
        item: `${siteUrl}/gift-ideas`,
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webAppSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};
