import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import NotFound from "./pages/NotFound";
import { CursorTrail } from "./components/CursorTrail";

// Lazy load article pages for better performance
const ValentinesDayGiftIdeas = lazy(() => import("./pages/articles/ValentinesDayGiftIdeas"));
const AiGiftGeneratorBoyfriend = lazy(() => import("./pages/AiGiftGeneratorBoyfriend"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CursorTrail />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-gradient-subtle" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gift-ideas" element={<Articles />} />
            <Route path="/gift-guides/valentines-day-gift-ideas" element={<ValentinesDayGiftIdeas />} />
            <Route path="/ai-gift-generator-for-boyfriend" element={<AiGiftGeneratorBoyfriend />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
