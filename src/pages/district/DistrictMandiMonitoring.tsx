import { useState } from "react";
import { mandisTirupati, mandiArrivals, crops as baseCrops } from "@/data/dummyData";
import { districtCrops, marketScopes, MarketScope, getMarketPrices } from "@/data/districtDummyData";
import { Store, TrendingUp, Users, Activity, BarChart3, Clock, ChevronDown, Globe, Landmark } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const COLORS = ['hsl(var(--primary))', '#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

const DistrictMandiMonitoring = () => {
  const [scope, setScope] = useState<MarketScope>("district");
  const [openMandiId, setOpenMandiId] = useState<string | null>(mandisTirupati[0].id);

  const currentPrices = getMarketPrices(scope, "tomato");

  // Get selected mandi info for the right panel
  const selectedMandi = scope === "district"
    ? (mandisTirupati.find(m => m.id === openMandiId) || mandisTirupati[0])
    : null;

  const selectedArrivalData = selectedMandi
    ? mandiArrivals.find(a => a.mandi === selectedMandi.name)
    : null;

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="page-header flex items-center gap-2"><Store className="h-7 w-7 text-primary" /> Mandi Monitoring</h1>
          <p className="page-subtitle">Arrival volume and analytics for regional and global markets</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Market Scope:</span>
          <Select value={scope} onValueChange={(v) => setScope(v as MarketScope)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {marketScopes.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Mandis List */}
        <div className="xl:col-span-1 space-y-4">
          <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
            {scope === "district" ? "District Mandis" : "Market Clusters"}
          </h2>
          {(scope === "district" ? mandisTirupati : currentPrices).map((m: any, idx) => {
            const isOpen = openMandiId === (m.id || m.mandi);
            const title = scope === "district" ? m.name : m.mandi;
            const subtitle = scope === "district" ? m.mandal : (scope === "international" ? "Global Hub" : "Regional Hub");

            // Get arrival data for this mandi
            const arrivalData = mandiArrivals.find(a => a.mandi === title);
            const totalArrivals = arrivalData
              ? (arrivalData.tomato + arrivalData.onion + arrivalData.banana + arrivalData.chilli + arrivalData.papaya)
              : 1250;

            return (
              <Collapsible
                key={m.id || m.mandi}
                open={isOpen}
                onOpenChange={(open) => { if (open) setOpenMandiId(m.id || m.mandi) }}
                className={`kpi-card bg-card border shadow-sm transition-all overflow-hidden ${isOpen ? 'ring-1 border-primary ring-primary/30' : 'hover:border-primary/40'}`}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-full ${isOpen ? 'bg-primary text-primary-foreground scale-110 shadow-sm' : 'bg-primary/10 text-primary group-hover:bg-primary/20'} transition-all`}>
                        {scope === "district" ? <Store className="h-5 w-5" /> : <Landmark className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-base leading-tight">{title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4 pt-4 border-t border-dashed space-y-4 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 p-2.5 rounded-lg border flex flex-col items-center text-center">
                      <Activity className="h-4 w-4 text-primary mb-1" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        {scope === "district" ? "Total Arrivals" : "Price/kg"}
                      </span>
                      <span className="text-lg font-bold">{scope === "district" ? `${totalArrivals.toLocaleString()} Q` : `₹${m.price}`}</span>
                    </div>
                    <div className="bg-muted/50 p-2.5 rounded-lg border flex flex-col items-center text-center">
                      <Users className="h-4 w-4 text-amber-500 mb-1" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        {scope === "district" ? "Active Buyers" : "Demand"}
                      </span>
                      <span className="text-lg font-bold capitalize">{scope === "district" ? "42" : m.demand}</span>
                    </div>
                  </div>

                  {scope === "district" && (
                    <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-3 rounded-xl flex items-center gap-3">
                      <span className="text-3xl bg-card rounded-full p-1 shadow-sm border">📈</span>
                      <div>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Market Efficiency</span>
                        <p className="font-bold text-foreground">Optimized Flow</p>
                        <p className="text-xs font-medium text-primary mt-1 px-2 py-0.5 bg-primary/10 rounded-full w-max">High Activity Hub</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 w-full pt-1">
                    <Button size="sm" variant="outline" className="flex-1 text-xs border-primary text-primary hover:bg-primary/10 h-8">View Hub Info</Button>
                    <Button size="sm" className="flex-1 text-xs h-8">Market Intel</Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>


        {/* Analytics section */}
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dashboard-chart h-full">
              <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
                {scope === "district" ? "Daily Arrivals Comparison" : "Price Intelligence Index"}
                <span className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground font-semibold flex items-center"><Clock className="h-3 w-3 mr-1" /> Reat-time Analytics</span>
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                {scope === "district" ? (
                  <BarChart data={mandiArrivals}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mandi" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'var(--muted)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} iconType="circle" />
                    <Bar dataKey="tomato" fill="hsl(var(--primary))" name="Tomato" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="onion" fill="#f59e0b" name="Onion" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="banana" fill="#3b82f6" name="Banana" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="chilli" fill="#ef4444" name="Chilli" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="papaya" fill="#10b981" name="Papaya" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                ) : (
                  <BarChart data={currentPrices}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mandi" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'var(--muted)' }} />
                    <Bar dataKey="price" fill="hsl(var(--primary))" name="Price (₹/kg)" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            <div className="dashboard-chart h-full flex flex-col">
              <h3 className="font-bold text-lg mb-2">Market Volume Distribution</h3>
              <p className="text-xs text-muted-foreground mb-4">Breakdown by {scope === "district" ? "mandi" : "region"} volume.</p>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={[{ name: 'Market A', value: 35 }, { name: 'Market B', value: 25 }, { name: 'Market C', value: 20 }, { name: 'Market D', value: 20 }]}
                      cx="50%" cy="50%" innerRadius={60} outerRadius={90} fill="#8884d8" paddingAngle={4} dataKey="value" stroke="none"
                    >
                      {COLORS.map((color, index) => <Cell key={`cell-${index}`} fill={color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend verticalAlign="bottom" height={20} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {scope === "district" && selectedArrivalData && (
            <div className="kpi-card bg-card border shadow-sm p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Crop Wise Arrivals: <span className="text-primary">{selectedMandi?.name}</span>
                </h3>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Live Arrivals</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: 'Tomato', val: selectedArrivalData.tomato, color: 'text-primary', bg: 'bg-primary/10', icon: '🍅', image: '/images/crops/tomato.png' },
                  { name: 'Onion', val: selectedArrivalData.onion, color: 'text-amber-600', bg: 'bg-amber-100/50', icon: '🧅', image: '/images/crops/onion.png' },
                  { name: 'Banana', val: selectedArrivalData.banana, color: 'text-blue-600', bg: 'bg-blue-100/50', icon: '🍌', image: '/images/crops/banana.png' },
                  { name: 'Chilli', val: selectedArrivalData.chilli, color: 'text-red-600', bg: 'bg-red-100/50', icon: '🌶️', image: '/images/crops/chilli.png' },
                  { name: 'Papaya', val: selectedArrivalData.papaya, color: 'text-emerald-600', bg: 'bg-emerald-100/50', icon: '🥭', image: '/images/crops/papaya.png' }
                ].map(c => (
                  <div key={c.name} className={`${c.bg} p-4 rounded-2xl border flex flex-col items-center gap-1 transition-transform hover:scale-105`}>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden mb-1">
                      {c.image ? <img src={c.image} alt={c.name} className="w-full h-full object-cover" /> : <span className="text-2xl">{c.icon}</span>}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">{c.name}</span>
                    <span className={`text-lg font-black ${c.color}`}>{c.val.toLocaleString()} <span className="text-[10px]">Q</span></span>
                  </div>
                ))}
              </div>

              <div className="bg-muted/30 p-4 rounded-xl border border-dashed flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Total Arrival Volume</p>
                    <p className="text-lg font-black">{(selectedArrivalData.tomato + selectedArrivalData.onion + selectedArrivalData.banana + selectedArrivalData.chilli + selectedArrivalData.papaya).toLocaleString()} Quintals</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</p>
                  <p className="text-xs font-black text-green-600">Stable Supply</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {scope === "district" && (
          <div className="dashboard-chart overflow-hidden p-0">
            <div className="p-6 border-b">
              <h3 className="font-bold text-lg">District Arrivals Summary (All Mandis)</h3>
              <p className="text-xs text-muted-foreground mt-1">Consolidated daily arrival volume by crop across Tirupati district mandis.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase tracking-widest font-black bg-muted/30 text-muted-foreground border-b">
                  <tr>
                    <th className="px-6 py-4">Mandi Name</th>
                    <th className="px-6 py-4 text-right">Tomato (Q)</th>
                    <th className="px-6 py-4 text-right text-amber-600">Onion (Q)</th>
                    <th className="px-6 py-4 text-right text-blue-600">Banana (Q)</th>
                    <th className="px-6 py-4 text-right text-red-600">Chilli (Q)</th>
                    <th className="px-6 py-4 text-right text-emerald-600">Papaya (Q)</th>
                    <th className="px-6 py-4 text-right font-bold text-primary">Total (Q)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mandiArrivals.map((m, i) => {
                    const total = m.tomato + m.onion + m.banana + m.chilli + m.papaya;
                    return (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-foreground">{m.mandi}</td>
                        <td className="px-6 py-4 text-right font-medium">{m.tomato.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-medium">{m.onion.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-medium">{m.banana.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-medium">{m.chilli.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-medium">{m.papaya.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-black text-primary bg-primary/5">{total.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictMandiMonitoring;
