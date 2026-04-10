import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard, MapPin, TrendingUp, AlertTriangle, Store, Users, Brain, FileText,
  BarChart3, ShoppingBag, Sprout, MessageSquare, Bot,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AI_ASSISTANT_ROUTE, getAiAssistantNavLabel } from "@/lib/aiAssistant";

const stateNav = [
  { title: "State Dashboard", url: "/state", icon: LayoutDashboard },
  { title: "District Intelligence", url: "/state/districts", icon: MapPin },
  { title: "Crop Prices", url: "/state/prices", icon: TrendingUp },
  { title: "Demand Alerts", url: "/state/alerts", icon: AlertTriangle },
  { title: "Mandi Analytics", url: "/state/mandis", icon: Store },
  { title: "Farmer Activity", url: "/state/farmers", icon: Users },
  { title: "Crop Cultivation Analytics", url: "/state/cultivation", icon: BarChart3 },
  { title: "AI Insights", url: "/state/ai", icon: Brain },
  { title: "AI Assistant", url: AI_ASSISTANT_ROUTE, icon: Bot },
  { title: "Reports", url: "/state/reports", icon: FileText },
];

const districtNav = [
  { title: "District Dashboard", url: "/district", icon: LayoutDashboard },
  { title: "Mandal Intelligence", url: "/district/mandals", icon: MapPin },
  { title: "Crop Prices", url: "/district/prices", icon: TrendingUp },
  { title: "Demand Alerts", url: "/district/alerts", icon: AlertTriangle },
  { title: "Mandi Monitoring", url: "/district/mandis", icon: Store },
  { title: "Farmer Activity", url: "/district/farmers", icon: Users },
  { title: "Crop Cultivation Analytics", url: "/district/cultivation", icon: BarChart3 },
  { title: "AI Insights", url: "/district/ai", icon: Brain },
  { title: "Reports", url: "/district/reports", icon: FileText },
  { title: "AI Assistant", url: AI_ASSISTANT_ROUTE, icon: Bot },
  { title: "Farmer Communication Center", url: "/district/chat", icon: MessageSquare },
];

const farmerNavEN = [
  { title: "Dashboard", url: "/farmer", icon: LayoutDashboard },
  { title: "Check Crop Prices", url: "/farmer/prices", icon: TrendingUp },
  { title: "Price Predictions", url: "/farmer/predictions", icon: BarChart3 },
  { title: "Demand Alerts", url: "/farmer/alerts", icon: AlertTriangle },
  { title: "Recommended Markets", url: "/farmer/markets", icon: ShoppingBag },
  { title: "My Crops", url: "/farmer/crops", icon: Sprout },
  { title: "Connect with Officer", url: "/farmer/chat", icon: MessageSquare },
  { title: "AI Assistant", url: AI_ASSISTANT_ROUTE, icon: Bot },
];

const farmerNavTE = [
  { title: "డాష్‌బోర్డ్", url: "/farmer", icon: LayoutDashboard },
  { title: "పంట ధరలు చూడండి", url: "/farmer/prices", icon: TrendingUp },
  { title: "ధర అంచనాలు", url: "/farmer/predictions", icon: BarChart3 },
  { title: "డిమాండ్ అలర్ట్‌లు", url: "/farmer/alerts", icon: AlertTriangle },
  { title: "సిఫారసు మార్కెట్లు", url: "/farmer/markets", icon: ShoppingBag },
  { title: "నా పంటలు", url: "/farmer/crops", icon: Sprout },
  { title: "అధికారితో మాట్లాడండి", url: "/farmer/chat", icon: MessageSquare },
  { title: "AI అసిస్టెంట్", url: AI_ASSISTANT_ROUTE, icon: Bot },
];

const AppSidebar = () => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const nav = user?.role === "state" ? stateNav : user?.role === "district" ? districtNav : (lang === "te" ? farmerNavTE : farmerNavEN);
  const roleLabel = user?.role === "state" ? "State Officer" : user?.role === "district" ? "District Officer" : (lang === "te" ? "రైతు" : "Farmer");
  const assistantLabel = getAiAssistantNavLabel(user?.role ?? "farmer", lang);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{collapsed ? "☰" : roleLabel}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map(item => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url} tooltip={item.title}>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
