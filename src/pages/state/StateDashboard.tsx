import { ExternalLink, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const ZOHO_DASHBOARD_URL = "https://analytics.zoho.in/open-view/470516000000375125";

const StateDashboard = () => {
  return (
    <div className="flex flex-col h-[85vh] min-h-[850px] w-full gap-4 animate-slide-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between shrink-0 gap-4">
        <div>
          <h1 className="page-header flex items-center gap-2">
            <LayoutDashboard className="h-7 w-7 text-primary" />
            State Analytics Portal
          </h1>
          <p className="page-subtitle">
            Comprehensive State-level Intelligence powered by Zoho Analytics
          </p>
        </div>
        <div className="flex items-center gap-3 bg-card p-2 rounded-xl border shadow-sm self-start sm:self-auto">
          <span className="text-xs text-muted-foreground hidden md:inline-block font-medium pl-2">
            Unable to load dashboard here?
          </span>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => window.open(ZOHO_DASHBOARD_URL, "_blank")}
            className="flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <ExternalLink className="h-4 w-4" />
            Open in New Tab
          </Button>
        </div>
      </div>
      
      <div className="flex-1 w-full relative bg-muted/10 rounded-2xl overflow-hidden border shadow-sm flex flex-col">
        {/* Fallback that sits behind iframe in case iframe doesn't render well or fails completely */}
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-center p-6 bg-card z-0">
          <LayoutDashboard className="h-12 w-12 text-muted-foreground/30 animate-pulse" />
          <div className="max-w-md">
            <p className="text-lg font-semibold text-muted-foreground">Dashboard is loading...</p>
            <p className="text-sm text-muted-foreground mt-2">
              If the dashboard does not appear due to browser permissions, please use the button above to open it securely in a new tab.
            </p>
          </div>
        </div>
        
        <iframe
          src={ZOHO_DASHBOARD_URL}
          className="flex-1 w-full border-0 relative z-10"
          title="State Officer Dashboard - Zoho Analytics"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default StateDashboard;

