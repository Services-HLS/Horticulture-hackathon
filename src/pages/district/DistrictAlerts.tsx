import { useState } from "react";
import { demandAlerts as baseAlerts, crops as baseCrops } from "@/data/dummyData";
import { districtCrops, marketScopes, MarketScope } from "@/data/districtDummyData";
import { AlertTriangle, BellRing, Filter, Clock, MapPin, Globe, CheckCircle2, Send, MessageCircle, Mail } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const severityConfig: Record<string, { color: string, iconColor: string, label: string, bg: string }> = {
  high: { color: "text-destructive", iconColor: "text-destructive", label: "Critical", bg: "bg-destructive/10" },
  medium: { color: "text-amber-600", iconColor: "text-amber-500", label: "Warning", bg: "bg-amber-500/10" },
  low: { color: "text-primary", iconColor: "text-primary", label: "Info", bg: "bg-primary/10" }
};

const DistrictAlerts = () => {
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [scope, setScope] = useState<MarketScope>("district");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [notifiedAlerts, setNotifiedAlerts] = useState<Set<number>>(new Set());

  const handleNotifyFarmers = (alertId: number) => {
    setNotifiedAlerts(prev => new Set(prev).add(alertId));
    setIsSuccessModalOpen(true);
  };

  const getScopedAlerts = () => {
    let alerts = [...baseAlerts].filter(a => a.crop.toLowerCase() !== "mango");

    if (scope === "district") {
      // Keep original district alerts
      return alerts.map(a => ({ ...a, crop: a.crop === "Mango" ? "Onion" : a.crop }));
    } else if (scope === "state") {
      return [
        { id: 101, crop: "Tomato", type: "Price Opportunity", severity: "high" as const, mandi: "Guntur Market", message: "Price 15% higher in Guntur due to local supply shortage. Recommend transport from Tirupati.", time: "1 hour ago" },
        { id: 102, crop: "Onion", type: "Demand Rise", severity: "medium" as const, mandi: "Kurnool", message: "Onion demand rising in Rayalaseema districts. Prices expected to climb ₹5/kg.", time: "3 hours ago" },
      ];
    } else if (scope === "other_states") {
      return [
        { id: 201, crop: "Onion", type: "Heavy Demand", severity: "high" as const, mandi: "Karnataka Markets", message: "Onion demand rising in Karnataka wholesale markets. Great export opportunity for Tirupati farmers.", time: "4 hours ago" },
        { id: 202, crop: "Banana", type: "Supply Alert", severity: "medium" as const, mandi: "Chennai", message: "Banana arrivals from southern districts down by 20%. Price spike likely in Tamil Nadu.", time: "6 hours ago" },
      ];
    } else {
      return [
        { id: 301, crop: "Banana", type: "Export Demand", severity: "high" as const, mandi: "Dubai", message: "Banana demand increasing in Dubai export markets. Quality grade A fetching 2x price.", time: "8 hours ago" },
        { id: 302, crop: "Chilli", type: "Global Trend", severity: "medium" as const, mandi: "Singapore", message: "Rising preference for organic chilli in SE Asia. Potential for premium certified exports.", time: "12 hours ago" },
      ];
    }
  };

  const filteredAlerts = getScopedAlerts().filter(a => {
    return selectedCrop === "all" || a.crop.toLowerCase() === selectedCrop;
  });

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="page-header flex items-center gap-2"><BellRing className="h-7 w-7 text-primary" /> Demand Alerts</h1>
          <p className="page-subtitle">Real-time demand and supply anomalies monitored by AI</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-xl border flex flex-wrap gap-4 items-center shadow-sm">
        <div className="flex items-center gap-2 text-muted-foreground mr-2">
          <Filter className="h-5 w-5" />
          <span className="font-semibold text-sm">Filter Alerts:</span>
        </div>
        <div className="w-56">
          <Select value={scope} onValueChange={(v) => setScope(v as MarketScope)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {marketScopes.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="w-48">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All Crops" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {districtCrops.map(c => (
                <SelectItem key={c.id} value={c.id}>
                  <div className="flex items-center gap-2">
                    {c.image ? <img src={c.image} alt={c.name} className="w-5 h-5 rounded-full object-cover" /> : c.icon}
                    {c.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alert Cards List */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? filteredAlerts.map(a => {
          const cfg = severityConfig[a.severity];
          const isNotified = notifiedAlerts.has(a.id);
          return (
            <div key={a.id} className={`bg-card border-l-4 rounded-xl p-5 shadow-sm transition-all hover:shadow-md ${a.severity === 'high' ? 'border-l-destructive' : a.severity === 'medium' ? 'border-l-amber-500' : 'border-l-primary'}`}>
              <div className="flex items-start gap-4">
                <div className={`${cfg.bg} p-3 rounded-full flex-shrink-0 mt-1`}>
                  {scope === "district" ? <AlertTriangle className={`h-6 w-6 ${cfg.iconColor}`} /> : <Globe className={`h-6 w-6 ${cfg.iconColor}`} />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-bold text-lg">{a.crop}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}: {a.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      {a.time}
                    </div>
                  </div>

                  <p className="text-foreground text-sm leading-relaxed mb-4">{a.message}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-4 border-t border-dashed">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg w-fit">
                      <MapPin className="h-4 w-4 text-primary" /> Location: {a.mandi}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs font-medium">Ignore</Button>
                      <Button
                        size="sm"
                        onClick={scope === "district" ? () => handleNotifyFarmers(a.id) : undefined}
                        disabled={isNotified && scope === "district"}
                        className={`h-8 text-xs font-black min-w-[120px] transition-all ${isNotified && scope === "district"
                          ? 'bg-green-500 hover:bg-green-500 opacity-100 text-white shadow-none'
                          : a.severity === 'high' ? 'bg-destructive text-white hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'}`}
                      >
                        {scope === "district"
                          ? (isNotified ? (<span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Notified</span>) : "Notify farmers")
                          : "View Intelligence"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-16 bg-card border rounded-xl border-dashed">
            <div className="bg-primary/5 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-primary opacity-50" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">No Alerts Found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your filters. No alerts match the current criteria.</p>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="max-w-[400px] w-[95%] bg-background border shadow-2xl rounded-3xl p-0 overflow-hidden animate-in fade-in zoom-in duration-300 ring-1 ring-black/5">
          <div className="p-8 flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mb-5 border-2 border-white shadow-lg ring-1 ring-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>

            <DialogHeader className="space-y-2 mb-6">
              <DialogTitle className="text-xl font-black text-foreground tracking-tight">Broadcast Successful</DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm font-bold leading-snug">
                All Tirupati district farmers have been alerted via priority channels.
              </DialogDescription>
            </DialogHeader>

            <div className="w-full grid grid-cols-1 gap-3 mb-8">
              <div className="flex items-center gap-4 bg-muted/20 p-3 rounded-2xl border border-border group transition-colors hover:bg-muted/30">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                  <img src="/whatsapp-icon.svg" alt="WhatsApp" className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-foreground">WhatsApp Broadcast</p>
                  <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">4.2k Farmers Notified</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-muted/20 p-3 rounded-2xl border border-border group transition-colors hover:bg-muted/30">
                <div className="h-10 w-10 rounded-xl bg-blue-600 shadow-sm flex items-center justify-center shrink-0">
                  <Send className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-foreground">SMS Confirmation</p>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Network Acknowledged</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-muted/20 p-3 rounded-2xl border border-border group transition-colors hover:bg-muted/30">
                <div className="h-10 w-10 rounded-xl bg-amber-500 shadow-sm flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-foreground">Email Outbound</p>
                  <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Department Hub Verified</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full h-12 rounded-xl font-black text-base uppercase tracking-[0.2em] shadow-lg bg-primary hover:bg-primary/90 transition-all active:scale-95"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DistrictAlerts;
