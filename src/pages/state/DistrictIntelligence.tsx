import { useState } from "react";
import { apDistricts, stateCrops, stateMarketScopes, StateMarketScope } from "@/data/stateDummyData";
import { MapPin, Users, Store, AlertTriangle, TrendingUp, ChevronRight, Activity, TrendingDown, Layers, Globe } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DistrictIntelligence = () => {
  const [scope, setScope] = useState<StateMarketScope>("state");
  const [selectedLocation, setSelectedLocation] = useState(apDistricts[0].name);

  // Filter locations based on scope
  const locations = scope === "state"
    ? apDistricts.map(d => d.name)
    : scope === "other_states"
      ? ["Karnataka", "Tamil Nadu", "Maharashtra", "Telangana", "Kerala"]
      : ["Dubai", "Singapore", "Malaysia", "UK", "Netherlands"];

  const activeLocation = scope === "state"
    ? apDistricts.find(d => d.name === selectedLocation) || apDistricts[0]
    : { name: selectedLocation, farmers: 0, production: 0, mandis: 0 };

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header flex items-center gap-2"><MapPin className="h-7 w-7 text-primary" /> District & Market Intelligence</h1>
          <p className="page-subtitle">Granular performance metrics and market intelligence across selected scope</p>
        </div>
      </div>

      {/* Scope Selector */}
      <div className="bg-card p-2 rounded-xl border flex gap-1 w-fit shadow-sm">
        {stateMarketScopes.map(s => (
          <button
            key={s.id}
            onClick={() => {
              setScope(s.id as StateMarketScope);
              // Reset selection when scope changes
              if (s.id === "state") setSelectedLocation(apDistricts[0].name);
              else if (s.id === "other_states") setSelectedLocation("Karnataka");
              else setSelectedLocation("Dubai");
            }}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${scope === s.id ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}
          >
            {s.id === "state" ? <MapPin className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Location List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{scope === "state" ? "AP Districts" : "Target Markets"}</h3>
              <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full">{locations.length} Total</span>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full text-left p-4 border-b last:border-0 transition-all hover:bg-muted/50 flex items-center justify-between group ${selectedLocation === loc ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                >
                  <div>
                    <p className={`font-bold ${selectedLocation === loc ? 'text-primary' : 'text-foreground'}`}>{loc}</p>
                    {scope === "state" && <p className="text-xs text-muted-foreground">{(apDistricts.find(d => d.name === loc)?.farmers || 0).toLocaleString()} Farmers</p>}
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${selectedLocation === loc ? 'text-primary translate-x-1' : 'text-muted-foreground'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Intelligence Detail */}
        <div className="lg:col-span-8 space-y-6">
          {/* Detailed Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="kpi-card">
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">{scope === "state" ? "Production" : "Market Depth"}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-black">{scope === "state" ? `${(activeLocation.production / 1000).toFixed(1)}k MT` : "High"}</h3>
                <span className="text-xs text-emerald-600 font-bold mb-1 flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" /> 8%</span>
              </div>
            </div>
            <div className="kpi-card">
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">{scope === "state" ? "Registrations" : "Open Trades"}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-black">{scope === "state" ? (activeLocation.farmers || 0).toLocaleString() : "425"}</h3>
                <span className="text-xs text-emerald-600 font-bold mb-1 flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" /> 12%</span>
              </div>
            </div>
            <div className="kpi-card">
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">Market Sentiment</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-black text-primary">Bullish</h3>
                <Activity className="h-5 w-5 text-primary mb-1" />
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-black text-xl">{selectedLocation} Intelligence Insights</h3>
                <p className="text-sm text-muted-foreground">Supply & Price Analysis for {selectedLocation}</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 text-xs font-bold border border-emerald-500/20">
                  <TrendingUp className="h-3.5 w-3.5" /> Supply Surplus
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-4">Crop Specific Volumes (MT)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stateCrops.map(c => {
                    const volume = Math.floor(200 + Math.random() * 800);
                    return (
                      <div key={c.id} className="p-4 bg-muted/30 rounded-xl border border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full shrink-0">
                            {c.image ? <img src={c.image} alt={c.name} className="w-full h-full object-cover" /> : <span className="text-2xl">{c.icon}</span>}
                          </span>
                          <div>
                            <p className="font-bold text-sm">{c.name}</p>
                            <p className="text-xs text-muted-foreground">{c.season} Crop</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-lg text-primary">{volume}</p>
                          <p className={`text-[10px] font-bold flex items-center justify-end ${volume > 500 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {volume > 500 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                            {volume > 500 ? '+12%' : '-4%'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-4">Real-time Volume Trend</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={[
                    { time: '08:00', volume: 120 },
                    { time: '10:00', volume: 340 },
                    { time: '12:00', volume: 280 },
                    { time: '14:00', volume: 450 },
                    { time: '16:00', volume: 520 },
                    { time: '18:00', volume: 380 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="volume" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictIntelligence;
