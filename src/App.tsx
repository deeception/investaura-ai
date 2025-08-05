import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Layout } from "@/components/Layout/Layout";
import Welcome from "./pages/Welcome";
import Portfolio from "./pages/Portfolio";
import Analytics from "./pages/Analytics";
import Suggestions from "./pages/Suggestions";
import News from "./pages/News";
import Learning from "./pages/Learning";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const userName = localStorage.getItem('ads-settings') ? 
    JSON.parse(localStorage.getItem('ads-settings') || '{}').userName : '';
  
  if (!userName) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/news" element={<News />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <PortfolioProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/*" element={<ProtectedRoutes />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PortfolioProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;
