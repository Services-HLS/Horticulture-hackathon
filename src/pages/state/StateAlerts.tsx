import { useState } from "react";
import { stateCrops, stateMarketScopes, StateMarketScope, apDistricts } from "@/data/stateDummyData";
import { AlertTriangle, Clock, Filter, MapPin, Globe, CheckCircle2, Zap, ArrowRight, Share2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const severityConfig: Record<string, { color: string, iconColor: string, label: string, bg: string, border: string }> = {
  high: { color: "text-red-700", iconColor: "text-red-600", label: "Critical", bg: "bg-red-50", border: "border-red-100" },
  medium: { color: "text-amber-700", iconColor: "text-amber-600", label: "Warning", bg: "bg-amber-50", border: "border-amber-100" },
  low: { color: "text-blue-700", iconColor: "text-blue-600", label: "Info", bg: "bg-blue-50", border: "border-blue-100" },
};

const StateAlerts = () => {
  const [scope, setScope] = useState<StateMarketScope>("state");
  const [activeTab, setActiveTab] = useState<"active" | "resolved">("active");

  const alerts = [
    { id: 1, title: "Supply Shortage Detected", crop: "Onion", location: "Kurnool", severity: "high", time: "2h ago", description: "Market arrivals in Kurnool Mandi have dropped by 45% below seasonal average." },
    { id: 2, title: "Price Spike Warning", crop: "Tomato", location: "Chittoor", severity: "high", time: "5h ago", description: "Sudden 30% price increase observed across major mandis in Chittoor." },
    { id: 3, title: "Export Opportunity", crop: "Banana", location: "Anantapur", severity: "medium", time: "1d ago", description: "International demand rising in Middle East markets for premium Banana variety." },
    { id: 4, title: "Storage Alert", crop: "Potato", location: "Vizianagaram", severity: "low", time: "2d ago", description: "Cold storage capacity reaching 90% in northern districts." },
  ];

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header flex items-center gap-2"><AlertTriangle className="h-7 w-7 text-primary" /> Demand–Supply Alerts</h1>
          <p className="page-subtitle">Critical market intelligence alerts and operational notifications</p>
        </div>
        <div className="flex bg-muted/50 p-1 rounded-xl border">
          <button onClick={() => setActiveTab("active")} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "active" ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground'}`}>Active (24)</button>
          <button onClick={() => setActiveTab("resolved")} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "resolved" ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground'}`}>Resolved</button>
        </div>
      </div>

      <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
          {stateMarketScopes.map(s => (
            <button
              key={s.id}
              onClick={() => setScope(s.id as StateMarketScope)}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${scope === s.id ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
            >
              {s.id === "state" ? <MapPin className="h-3.5 w-3.5" /> : <Globe className="h-3.5 w-3.5" />}
              {s.name}
            </button>
          ))}
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="w-40 h-10 border-primary/20"><SelectValue placeholder="All Crops" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crops</SelectItem>
            {stateCrops.map(c => (
              <SelectItem key={c.id} value={c.id}>
                <div className="flex items-center gap-2">
                  {c.image ? <img src={c.image} alt={c.name} className="w-5 h-5 rounded-full object-cover" /> : c.icon}
                  {c.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-40 h-10 border-primary/20"><SelectValue placeholder="Location" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {apDistricts.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity];
          const cropObj = stateCrops.find(c => c.name === alert.crop);

          return (
            <div key={alert.id} className={`p-6 rounded-2xl border ${config.border} ${config.bg} transition-all hover:scale-[1.01] hover:shadow-lg group relative overflow-hidden`}>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertTriangle className={`h-24 w-24 ${config.iconColor}`} />
              </div>

              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                <div className="h-16 w-16 rounded-2xl flex items-center justify-center text-4xl shadow-sm bg-white/50 border overflow-hidden shrink-0">
                  {cropObj?.image ? <img src={cropObj.image} alt={cropObj.name} className="w-full h-full object-cover" /> : (cropObj?.icon || "🚨")}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${config.color} bg-white/80 border ${config.border} shadow-sm`}>
                      {config.label} Alert
                    </span>
                    <h3 className="text-xl font-black text-foreground">{alert.title}</h3>
                  </div>

                  <p className="text-muted-foreground leading-relaxed max-w-3xl font-medium">{alert.description}</p>

                  <div className="flex flex-wrap items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" /> {alert.location}, AP
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" /> {alert.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Zap className="h-4 w-4 text-primary" /> Impact: High
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 justify-center">
                  <Button className="font-black text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-md">
                    Take Action <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="font-black text-xs uppercase tracking-widest border-primary/20 group-hover:bg-white">
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-6">
        <Button variant="outline" className="px-10 h-12 rounded-full border-primary/20 text-primary font-bold hover:bg-primary/5">
          Load Previous Alerts
        </Button>
      </div>
    </div>
  );
};

export default StateAlerts;
