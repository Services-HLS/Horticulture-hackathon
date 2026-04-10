import { useState } from "react";
import { aiInsights as baseInsights, crops as baseCrops } from "@/data/dummyData";
import { marketScopes, MarketScope } from "@/data/districtDummyData";
import { Brain, CloudRain, Lightbulb, LineChart, ShieldAlert, Sparkles, Sprout, TrendingUp, Globe, ShoppingCart, CheckCircle2, Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const DistrictAIInsights = () => {
  const [scope, setScope] = useState<MarketScope>("district");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [notifiedInsights, setNotifiedInsights] = useState<Set<number>>(new Set());

  const handleNotifyFarmers = (insightId: number) => {
    setNotifiedInsights(prev => new Set(prev).add(insightId));
    setIsSuccessModalOpen(true);
  };

  const getScopedInsights = () => {
    if (scope === "district") {
      return baseInsights.map(i => ({ ...i, description: i.description.replace(/Mango/g, "Onion") }));
    } else if (scope === "state") {
      return [
        { id: 101, title: "Kurnool Onion Arbitrage", category: "Market", impact: "high", confidence: 92, description: "Current price gap between Tirupati and Kurnool markets is ₹450/quintal. Transporting surplus stock could optimize district returns." },
        { id: 102, title: "Rainfall Impact on Guntur Chilli", category: "Weather", impact: "medium", confidence: 85, description: "Unseasonal rains in Guntur likely to shift buyer focus to Tirupati Chilli clusters for better quality procurement." },
        { id: 103, title: "State-wide Tomato Demand", category: "Supply", impact: "low", confidence: 78, description: "Overall AP tomato production is stabilize, but Vijayawada hub shows 12% higher demand for high-grade varieties." }
      ];
    } else if (scope === "other_states") {
      return [
        { id: 201, title: "Bangalore Market Pull", category: "Trends", impact: "high", confidence: 95, description: "Tomato demand in Bangalore wholesale markets is peaking. Prices expected to remain 20% above regional averages for 3 weeks." },
        { id: 202, title: "Mumbai Onion Shortage", category: "Market", impact: "high", confidence: 88, description: "Supply chain disruptions in alternate sources make Mumbai a high-value destination for Tirupati's current Onion harvest." },
        { id: 203, title: "Emerging Chennai Clusters", category: "Supply", impact: "medium", confidence: 72, description: "New retail clusters in Chennai are seeking direct procurement partnerships for Bananas and Papayas." }
      ];
    } else {
      return [
        { id: 301, title: "Dubai Export Window", category: "Global", impact: "high", confidence: 94, description: "Dubai wholesale markets are showing extreme shortage of quality Grade A Onion. Potential for 2.5x margins on direct exports." },
        { id: 302, title: "Singapore Quality Standards", category: "Market", impact: "medium", confidence: 82, description: "Rising preference for organic chilli in SE Asia. Potential for premium positioning of district produce." },
        { id: 303, title: "Global Price Volatility", category: "Trends", impact: "medium", confidence: 68, description: "International freight price fluctuations may impact net export margins. Recommend bulk shipping for upcoming harvest." }
      ];
    }
  };

  const insights = getScopedInsights();
  const mainInsight = insights[0];
  const isMainNotified = notifiedInsights.has(mainInsight.id);

  return (
    <div className="space-y-8 animate-slide-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header flex items-center gap-2"><Brain className="h-7 w-7 text-primary" /> AI Intelligence Insights</h1>
          <p className="page-subtitle">Predictive models and actionable recommendations</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={scope} onValueChange={(v) => setScope(v as MarketScope)}>
            <SelectTrigger className="w-[200px] h-11 border-primary/20 bg-card/50 backdrop-blur-sm font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {marketScopes.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button className="font-semibold shadow-md h-11"><Sparkles className="h-4 w-4 mr-2" /> Refresh Insights</Button>
        </div>
      </div>

      {/* Top Banner Insight */}
      <div className="bg-gradient-to-r from-primary to-emerald-700 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-primary/20">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
          <Brain className="h-64 w-64" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center">
              <ShieldAlert className="h-3.5 w-3.5 mr-1" /> Critical {scope === "district" ? "District" : "Market"} Forecast
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight text-white">{mainInsight.title}</h2>
          <p className="text-primary-foreground/90 font-medium text-sm sm:text-base leading-relaxed mb-6">
            {mainInsight.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" className="font-bold border-none text-primary hover:bg-white transition-colors shadow-sm">Review Analytics</Button>
            <Button
              variant="outline"
              onClick={() => handleNotifyFarmers(mainInsight.id)}
              disabled={isMainNotified}
              className={`font-bold transition-all shadow-sm ${isMainNotified ? "bg-green-500 text-white border-green-500 opacity-100" : "border-white/40 text-white bg-transparent hover:bg-white/10"}`}
            >
              {isMainNotified ? <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Applied</span> : "Apply Intelligence"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {insights.slice(1).map(i => {
          let Icon = Lightbulb;
          if (i.category.includes("Trend")) Icon = TrendingUp;
          if (i.category.includes("Weather")) Icon = CloudRain;
          if (i.category.includes("Supply")) Icon = Sprout;
          if (i.category.includes("Market")) Icon = LineChart;
          if (i.category.includes("Global")) Icon = Globe;

          const isNotified = notifiedInsights.has(i.id);

          return (
            <div key={i.id} className="kpi-card flex flex-col h-full bg-card border hover:border-primary/40 transition-colors shadow-sm group">
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm ${i.impact === "high" ? "bg-destructive text-white" : i.impact === "medium" ? "bg-amber-500 text-white" : "bg-primary text-white"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground leading-snug truncate">{i.title}</h3>
                  <span className={`text-[10px] uppercase font-bold tracking-wider mt-1.5 inline-block px-2 py-0.5 rounded-sm ${i.impact === "high" ? "bg-destructive/10 text-destructive" : i.impact === "medium" ? "bg-amber-500/10 text-amber-600" : "bg-primary/10 text-primary"}`}>
                    Impact: {i.impact}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-6 flex-1 line-clamp-3">{i.description}</p>

              <div className="w-full space-y-4 pt-4 border-t border-dashed">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                  <span>AI Confidence Score</span>
                  <span className="text-foreground">{i.confidence}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${i.confidence > 85 ? 'bg-primary' : i.confidence > 70 ? 'bg-amber-500' : 'bg-muted-foreground'}`}
                    style={{ width: `${i.confidence}%` }}
                  />
                </div>
                <Button
                  onClick={() => handleNotifyFarmers(i.id)}
                  disabled={isNotified}
                  className={`w-full font-black text-xs uppercase tracking-widest transition-all ${isNotified ? "bg-green-500 hover:bg-green-500 text-white opacity-100 shadow-none" : "bg-primary/10 text-primary hover:bg-primary hover:text-white"}`}
                >
                  {isNotified ? <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 font-black" /> Applied</span> : "Apply Insight"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="max-w-[400px] w-[95%] bg-background border shadow-2xl rounded-3xl p-0 overflow-hidden animate-in fade-in zoom-in duration-300 ring-1 ring-black/5">
          <div className="p-8 flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mb-5 border-2 border-white shadow-lg ring-1 ring-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>

            <DialogHeader className="space-y-2 mb-6">
              <DialogTitle className="text-xl font-black text-foreground tracking-tight">Advisory Applied</DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm font-bold leading-snug">
                AI Intelligence advisory has been successfully applied and shared with farmers.
              </DialogDescription>
            </DialogHeader>

            <div className="w-full grid grid-cols-1 gap-3 mb-8">
              <div className="flex items-center gap-4 bg-muted/20 p-3 rounded-2xl border border-border group transition-colors hover:bg-muted/30">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                  <img src="/whatsapp-icon.svg" alt="WhatsApp" className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-foreground">WhatsApp Hub</p>
                  <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Priority Notification Sent</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-muted/20 p-3 rounded-2xl border border-border group transition-colors hover:bg-muted/30">
                <div className="h-10 w-10 rounded-xl bg-blue-600 shadow-sm flex items-center justify-center shrink-0">
                  <Send className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-foreground">Direct SMS Advisory</p>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Cellular Broadcast Received</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-muted/20 p-3 rounded-2xl border border-border group transition-colors hover:bg-muted/30">
                <div className="h-10 w-10 rounded-xl bg-amber-500 shadow-sm flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-foreground">E-Panta Registered Mail</p>
                  <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Departmental Confirmation</p>
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

export default DistrictAIInsights;
