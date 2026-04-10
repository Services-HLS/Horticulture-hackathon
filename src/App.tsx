import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FarmerProvider } from "@/contexts/FarmerContext";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

// State pages
import StateDashboard from "./pages/state/StateDashboard";
import DistrictIntelligence from "./pages/state/DistrictIntelligence";
import StateCropPrices from "./pages/state/StateCropPrices";
import StateAlerts from "./pages/state/StateAlerts";
import StateMandiAnalytics from "./pages/state/StateMandiAnalytics";
import StateFarmerEngagement from "./pages/state/StateFarmerEngagement";
import StateAIInsights from "./pages/state/StateAIInsights";
import StateReports from "./pages/state/StateReports";
import StateCultivationAnalytics from "./pages/state/CropCultivationAnalytics";

// District pages
import DistrictDashboard from "./pages/district/DistrictDashboard";
import MandalIntelligence from "./pages/district/MandalIntelligence";
import DistrictCropPrices from "./pages/district/DistrictCropPrices";
import DistrictAlerts from "./pages/district/DistrictAlerts";
import DistrictMandiMonitoring from "./pages/district/DistrictMandiMonitoring";
import DistrictFarmerActivity from "./pages/district/DistrictFarmerActivity";
import DistrictAIInsights from "./pages/district/DistrictAIInsights";
import DistrictReports from "./pages/district/DistrictReports";
import DistrictCultivationAnalytics from "./pages/district/DistrictCultivationAnalytics";
import DistrictChat from "./pages/district/DistrictChat";

// Farmer pages
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import FarmerCropPrices from "./pages/farmer/FarmerCropPrices";
import FarmerPredictions from "./pages/farmer/FarmerPredictions";
import FarmerAlerts from "./pages/farmer/FarmerAlerts";
import FarmerMarkets from "./pages/farmer/FarmerMarkets";
import FarmerMyCrops from "./pages/farmer/FarmerMyCrops";
import FarmerChat from "./pages/farmer/FarmerChat";
import AiAssistantPage from "./pages/AiAssistantPage";

const queryClient = new QueryClient();

const AuthenticatedApp = () => {
  const { user } = useAuth();

  if (!user) return <Login />;

  const homeRoute = user.role === "state" ? "/state" : user.role === "district" ? "/district" : "/farmer";

  return (
    <Routes>
      <Route path="/" element={<Navigate to={homeRoute} replace />} />

      {/* State routes */}
      <Route element={<AppLayout />}>
        <Route path="/state" element={<StateDashboard />} />
        <Route path="/state/districts" element={<DistrictIntelligence />} />
        <Route path="/state/prices" element={<StateCropPrices />} />
        <Route path="/state/alerts" element={<StateAlerts />} />
        <Route path="/state/mandis" element={<StateMandiAnalytics />} />
        <Route path="/state/farmers" element={<StateFarmerEngagement />} />
        <Route path="/state/ai" element={<StateAIInsights />} />
        <Route path="/state/cultivation" element={<StateCultivationAnalytics />} />
        <Route path="/state/reports" element={<StateReports />} />

        {/* District routes */}
        <Route path="/district" element={<DistrictDashboard />} />
        <Route path="/district/mandals" element={<MandalIntelligence />} />
        <Route path="/district/prices" element={<DistrictCropPrices />} />
        <Route path="/district/alerts" element={<DistrictAlerts />} />
        <Route path="/district/mandis" element={<DistrictMandiMonitoring />} />
        <Route path="/district/farmers" element={<DistrictFarmerActivity />} />
        <Route path="/district/cultivation" element={<DistrictCultivationAnalytics />} />
        <Route path="/district/ai" element={<DistrictAIInsights />} />
        <Route path="/district/reports" element={<DistrictReports />} />
        <Route path="/district/chat" element={<DistrictChat />} />

        {/* Farmer routes */}
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/farmer/prices" element={<FarmerCropPrices />} />
        <Route path="/farmer/predictions" element={<FarmerPredictions />} />
        <Route path="/farmer/alerts" element={<FarmerAlerts />} />
        <Route path="/farmer/markets" element={<FarmerMarkets />} />
        <Route path="/farmer/crops" element={<FarmerMyCrops />} />
        <Route path="/farmer/chat" element={<FarmerChat />} />

        <Route path="/assistant" element={<AiAssistantPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <FarmerProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <AuthenticatedApp />
            </BrowserRouter>
          </TooltipProvider>
        </FarmerProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
