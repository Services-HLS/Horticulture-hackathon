import { useState, useEffect } from "react";
import { stateCrops, stateMarketScopes, StateMarketScope } from "@/data/stateDummyData";
import {
  Brain, CloudRain, Lightbulb, LineChart, ShieldAlert, Sparkles, Sprout,
  TrendingUp, Cpu, MapPin, Globe, CheckCircle2, MessageSquare, Send,
  Mail, Phone, Zap, ArrowRight, X, Activity, BarChart3, Fingerprint,
  ShieldCheck, AlertCircle, RefreshCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const categoryStyles: Record<string, { icon: React.ReactNode, color: string, bg: string, border: string, glow: string }> = {
  "Weather": {
    icon: <CloudRain className="h-4 w-4" />,
    color: "text-blue-600",
    bg: "bg-blue-50/50",
    border: "border-blue-100",
    glow: "shadow-blue-500/10"
  },
  "Price": {
    icon: <TrendingUp className="h-4 w-4" />,
    color: "text-emerald-600",
    bg: "bg-emerald-50/50",
    border: "border-emerald-100",
    glow: "shadow-emerald-500/10"
  },
  "Disease": {
    icon: <ShieldAlert className="h-4 w-4" />,
    color: "text-red-600",
    bg: "bg-red-50/50",
    border: "border-red-100",
    glow: "shadow-red-500/10"
  },
  "Supply": {
    icon: <Sprout className="h-4 w-4" />,
    color: "text-amber-600",
    bg: "bg-amber-50/50",
    border: "border-amber-100",
    glow: "shadow-amber-500/10"
  },
  "Production": {
    icon: <LineChart className="h-4 w-4" />,
    color: "text-indigo-600",
    bg: "bg-indigo-50/50",
    border: "border-indigo-100",
    glow: "shadow-indigo-500/10"
  },
  "Market": {
    icon: <Lightbulb className="h-4 w-4" />,
    color: "text-violet-600",
    bg: "bg-violet-50/50",
    border: "border-violet-100",
    glow: "shadow-violet-500/10"
  },
  "Infrastructure": {
    icon: <Cpu className="h-4 w-4" />,
    color: "text-slate-600",
    bg: "bg-slate-50/50",
    border: "border-slate-100",
    glow: "shadow-slate-500/10"
  },
};

const StateAIInsights = () => {
  const [scope, setScope] = useState<StateMarketScope>("state");
  const [showModal, setShowModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [appliedInsights, setAppliedInsights] = useState<number[]>([]);

  useEffect(() => {
    setIsAnalyzing(true);
    const timer = setTimeout(() => setIsAnalyzing(false), 1000);
    return () => clearTimeout(timer);
  }, [scope]);

  const getInsights = () => {
    if (scope === "state") {
      return [
        { id: 1, category: "Price", title: "Price Anomaly Alert (Chittoor)", impact: "High", confidence: 94, description: "Unusually high price spike (₹85/kg) in Tomato observed in Madanapalle Mandi. Anantapur arrivals are stable. Suggests local speculative trading.", action: "Investigate Speculation", time: "12m remaining" },
        { id: 2, category: "Weather", title: "Heatwave Impact Prediction", impact: "Medium", confidence: 88, description: "Upcoming heatwave predicted in Kurnool district next week likely to reduce Onion shelf life. Advise cold storage movement.", action: "Verify Storage Capacity", time: "5d threshold" },
        { id: 3, category: "Production", title: "Area Expansion Alert", impact: "Low", confidence: 82, description: "Historical data shows 15% increase in Banana acreage in Vizianagaram. Predicted harvest glut in August. Market intervention advised.", action: "Adjust Export Quotas", time: "Q3 Forecast" },
        { id: 4, category: "Infrastructure", title: "Grid Logistical Optimization", impact: "High", confidence: 91, description: "Transport bottlenecks identified on NH16 affecting Onion logistics from Kurnool. Alternative routes via rail recommended.", action: "Route Diversion", time: "Immediate" },
      ];
    } else if (scope === "other_states") {
      return [
        { id: 5, category: "Market", title: "Market Entry Opportunity", impact: "High", confidence: 92, description: "Severe crop failure in Maharashtra (Onion) creating significant supply gap. AP surplus can be diverted for 25% higher margins.", action: "Inter-state Logistics", time: "Next 48h" },
        { id: 6, category: "Price", title: "Inter-State Price Convergence", impact: "Medium", confidence: 85, description: "Karnataka Tomato prices converging with AP prices. Competitive advantage for direct retail chains in Bangalore hubs.", action: "Monitor Retail Chains", time: "Season Trend" },
      ];
    } else {
      return [
        { id: 7, category: "Supply", title: "Global Demand surge (Gulf)", impact: "High", confidence: 96, description: "Middle Eastern markets showing 30% increase in demand for seedless varieties. AP production surplus matches requirements.", action: "Initiate Export Tenders", time: "Q4 Trade Window" },
        { id: 8, category: "Market", title: "EU Quality Standards Audit", impact: "Medium", confidence: 90, description: "EU implementing stricter pesticide residue limits for table grapes. Review AP certification hubs in Guntur.", action: "Regulatory Audit", time: "60d compliance" },
      ];
    }
  };

  const insights = getInsights();

  const handleApply = (id: number) => {
    setShowModal(true);
    setAppliedInsights(prev => [...prev, id]);
  };

  return (
    <div className="space-y-6 animate-slide-in pb-10 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <div className="relative uppercase tracking-widest text-[9px] font-black text-primary px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              Neural Core Online
            </div>
          </div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            Predictive Market <span className="text-primary">Intelligence</span>
          </h1>
          <p className="text-muted-foreground font-medium text-sm">
            AP Horticulture AI Engine utilizing real-time Mandi feeds and historical trends.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <div className="bg-card/50 backdrop-blur-xl p-1 rounded-xl border border-primary/10 shadow-lg flex w-full">
            {stateMarketScopes.map(s => (
              <button
                key={s.id}
                onClick={() => setScope(s.id as StateMarketScope)}
                className={`flex-1 px-3 py-2 rounded-lg text-[11px] font-black transition-all flex items-center justify-center gap-2 ${scope === s.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-muted-foreground hover:bg-muted opacity-70'}`}
              >
                {s.id === "state" ? <MapPin className="h-3.5 w-3.5" /> : <Globe className="h-3.5 w-3.5" />}
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card/40 backdrop-blur-sm border border-primary/10 rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary"><BarChart3 className="h-4 w-4" /></div>
            <h3 className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Analysis Depth</h3>
          </div>
          <p className="text-2xl font-black text-foreground">94.2%</p>
          <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <RefreshCcw className="h-2.5 w-2.5" /> scanning 58 mandis
          </p>
          <div className="mt-4 space-y-1.5">
            <Progress value={85} className="h-1" />
          </div>
        </div>

        <div className="bg-card/40 backdrop-blur-sm border border-emerald-500/10 rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600"><Fingerprint className="h-4 w-4" /></div>
            <h3 className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Confidence</h3>
          </div>
          <p className="text-2xl font-black text-foreground">Excellent</p>
          <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="h-2.5 w-2.5" /> Data points verified
          </p>
          <div className="mt-4 space-y-1.5">
            <Progress value={92} className="h-1 bg-emerald-500/10" />
          </div>
        </div>

        <div className="bg-card/40 backdrop-blur-sm border border-amber-500/10 rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600"><Zap className="h-4 w-4" /></div>
            <h3 className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Active Threats</h3>
          </div>
          <p className="text-2xl font-black text-foreground">{insights.filter(i => i.impact === 'High').length} Priority</p>
          <p className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
            <RefreshCcw className="h-2.5 w-2.5" /> System Elevated
          </p>
          <div className="mt-4 flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i <= 4 ? 'bg-amber-500' : 'bg-amber-500/20'}`} />
            ))}
          </div>
        </div>
      </div>

      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="h-16 w-16 rounded-full border-t-2 border-primary animate-spin" />
          <div className="text-center">
            <h3 className="text-sm font-black text-foreground uppercase tracking-widest">Applying Neural Filters</h3>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight) => {
            const style = categoryStyles[insight.category] || categoryStyles["Market"];
            const isApplied = appliedInsights.includes(insight.id);

            return (
              <div
                key={insight.id}
                className={`bg-card/70 backdrop-blur-md border border-border/50 rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
              >
                <div className={`absolute top-0 left-0 w-1.5 h-full ${style.color.replace('text', 'bg')}`} />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${style.bg} ${style.color} border ${style.border}`}>
                      {style.icon}
                    </div>
                    <div>
                      <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${style.color}`}>
                        {insight.category} • {insight.time}
                      </div>
                      <h2 className="text-lg font-black text-foreground leading-tight tracking-tight">
                        {insight.title}
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-[0.15em] ${insight.impact === 'High' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>
                      {insight.impact}
                    </span>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-xl p-4 border border-border/30 mb-6">
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed italic line-clamp-3">
                    "{insight.description}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-dashed border-border/60">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-lg font-black text-foreground">{insight.confidence}%</div>
                      <div className="text-[8px] uppercase font-black tracking-widest text-muted-foreground">Confidence</div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-[8px] uppercase font-black tracking-widest text-muted-foreground mb-1">AI Protocol</div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase">
                        <Zap className="h-3 w-3" /> {insight.action}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="h-10 px-4 rounded-xl text-[9px] font-black uppercase tracking-wider"
                      onClick={() => handleApply(insight.id)}
                    >
                      Notify
                    </Button>
                    <Button
                      className={`h-10 px-5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all duration-300 ${isApplied ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20'}`}
                      onClick={() => handleApply(insight.id)}
                    >
                      {isApplied ? 'Applied' : 'Activate'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] sm:w-[450px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl z-[100]">
          <div className="bg-primary p-8 text-white relative">
            <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 p-2 hover:bg-white/10 rounded-full transition-colors"><X className="h-5 w-5" /></button>
            <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/30"><Send className="h-6 w-6 text-white" /></div>
            <DialogHeader>
              <h2 className="text-2xl font-black mb-2 tracking-tight">Intelligence Dispatched</h2>
              <p className="text-white/80 text-sm font-medium">Protocol broadcasted to all stakeholders.</p>
            </DialogHeader>
          </div>
          <div className="p-6 bg-card space-y-4">
            {[
              { icon: <MessageSquare className="h-4 w-4" />, label: "WhatsApp Hub", detail: "12,450 Farmers", color: "emerald" },
              { icon: <Mail className="h-4 w-4" />, label: "Officer Direct", detail: "854 Officers", color: "blue" },
              { icon: <Fingerprint className="h-4 w-4" />, label: "SMS Gateway", detail: "42,100 Devices", color: "amber" }
            ].map((item, idx) => (
              <div key={idx} className={`flex items-center gap-4 p-4 rounded-2xl bg-${item.color}-500/5 border border-${item.color}-500/10`}>
                <div className={`h-10 w-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-600`}>{item.icon}</div>
                <div>
                  <p className="font-black text-xs text-foreground uppercase tracking-widest">{item.label}</p>
                  <p className={`text-[10px] font-bold text-${item.color}-600`}>{item.detail}</p>
                </div>
                <CheckCircle2 className={`h-5 w-5 text-${item.color}-500 ml-auto`} />
              </div>
            ))}
            <Button className="w-full h-12 rounded-2xl font-black uppercase tracking-widest text-xs bg-primary" onClick={() => setShowModal(false)}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StateAIInsights;
