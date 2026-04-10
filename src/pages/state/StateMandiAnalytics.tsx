import { useState, useMemo } from "react";
import { apDistricts, stateCrops, stateMarketScopes, StateMarketScope } from "@/data/stateDummyData";
import { priceTrends } from "@/data/dummyData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, Cell } from "recharts";
import { Store, TrendingUp, ChevronRight, Activity, Users, MapPin, Layers, Filter, Globe, Ship } from "lucide-react";

const StateMandiAnalytics = () => {
  const [scope, setScope] = useState<StateMarketScope>("state");
  const [selectedCrop, setSelectedCrop] = useState("tomato");

  // Simulated Mandi data for AP
  const mandiPerformance = useMemo(() => {
    return apDistricts.slice(0, 8).map(d => ({
      name: d.name + " Mandi",
      volume: Math.floor(400 + Math.random() * 500),
      revenue: Math.floor(5 + Math.random() * 8),
      growth: Math.floor(2 + Math.random() * 15),
    }));
  }, []);

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header flex items-center gap-2"><Store className="h-7 w-7 text-primary" /> Mandi Intelligence Analytics</h1>
          <p className="page-subtitle">Granular performance and trade volume analysis across supply nodes</p>
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

        <div className="flex gap-2 bg-muted/30 p-1 rounded-lg">
          {stateCrops.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCrop(c.id)}
              className={`p-2 rounded-lg transition-all ${selectedCrop === c.id ? 'bg-white shadow-sm drop-shadow-sm scale-110' : 'opacity-40 hover:opacity-100'}`}
              title={c.name}
            >
              <span className="flex items-center justify-center w-7 h-7 overflow-hidden rounded-full">
                {c.image ? <img src={c.image} alt={c.name} className="w-full h-full object-cover" /> : <span className="text-xl">{c.icon}</span>}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPI Cards */}
        <div className="kpi-card bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl"><Store className="h-6 w-6 text-primary" /></div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Hubs</p>
              <h3 className="text-2xl font-black">58 <span className="text-xs text-muted-foreground">in AP</span></h3>
            </div>
          </div>
        </div>
        <div className="kpi-card bg-emerald-500/5 border-emerald-500/20">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/10 p-3 rounded-xl"><Layers className="h-6 w-6 text-emerald-600" /></div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Daily Volume</p>
              <h3 className="text-2xl font-black">12.5k <span className="text-xs text-muted-foreground">MT</span></h3>
            </div>
          </div>
        </div>
        <div className="kpi-card bg-blue-500/5 border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-xl"><Users className="h-6 w-6 text-blue-600" /></div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Mandi Registrations</p>
              <h3 className="text-2xl font-black">4,250 <span className="text-xs text-muted-foreground">Traders</span></h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-chart">
          <h3 className="font-bold text-lg mb-6 flex items-center justify-between">
            <span>Mandi Arrival Volumes (MT)</span>
            <span className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">Real-time Data</span>
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mandiPerformance} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" fontSize={11} tickLine={false} axisLine={false} width={100} />
              <Tooltip cursor={{ fill: 'var(--muted)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-chart">
          <h3 className="font-bold text-lg mb-6 flex items-center justify-between">
            <span>Market Price Volatility</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Model Confidence: 94%</span>
            </div>
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={priceTrends[selectedCrop] || priceTrends["tomato"]}>
              <defs>
                <linearGradient id="colorMandiPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorMandiPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-muted/30">
          <h3 className="font-bold text-lg">Top Performing Supply Nodes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-black text-muted-foreground uppercase tracking-widest">Mandi Name</th>
                <th className="text-center py-4 px-6 text-xs font-black text-muted-foreground uppercase tracking-widest">Trader Sentiment</th>
                <th className="text-center py-4 px-6 text-xs font-black text-muted-foreground uppercase tracking-widest">Weekly Growth</th>
                <th className="text-center py-4 px-6 text-xs font-black text-muted-foreground uppercase tracking-widest">Current Volume</th>
                <th className="text-right py-4 px-6 text-xs font-black text-muted-foreground uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mandiPerformance.map((m) => (
                <tr key={m.name} className="hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg"><Store className="h-4 w-4 text-primary" /></div>
                      <p className="font-bold">{m.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase mx-auto w-fit">
                      <Activity className="h-3 w-3" /> Very Active
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <p className="font-bold text-emerald-600 flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4" /> +{m.growth}%
                    </p>
                  </td>
                  <td className="py-4 px-6 text-center font-black">{m.volume} MT</td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StateMandiAnalytics;
