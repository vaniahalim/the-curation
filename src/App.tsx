import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Pillars from "./pages/Pillars";
import Library from "./pages/Library";
import AIUpdates from "./pages/AIUpdates";
import AIUpdateDetail from "./pages/AIUpdateDetail";
import DailyArchive from "./pages/DailyArchive";
import TodayBriefings from "./pages/TodayBriefings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/today" element={<TodayBriefings />} />
            <Route path="/pillars" element={<Pillars />} />
            <Route path="/ai-updates" element={<AIUpdates />} />
            <Route path="/ai-updates/:id" element={<AIUpdateDetail />} />
            <Route path="/daily-archive" element={<DailyArchive />} />
            <Route path="/daily-archive/:date" element={<DailyArchive />} />
            <Route path="/library" element={<Library />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
