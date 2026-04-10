import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import WhatsAppButton from "./WhatsAppButton";
import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full relative">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <AppHeader />
        <div className="flex items-center h-10 border-b px-2 bg-card shrink-0">
          <SidebarTrigger />
        </div>
        <main className="flex min-h-0 flex-1 flex-col overflow-auto p-4 md:p-6 pb-24">
          <Outlet />
        </main>
      </div>
      <WhatsAppButton />
    </div>
  </SidebarProvider>
);

export default AppLayout;
