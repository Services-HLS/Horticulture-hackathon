import { useState } from "react";
import KPICard from "@/components/KPICard";
import { mandalsOfTirupati, mandisTirupati, crops as baseCrops, priceTrends as baseTrends, mandiArrivals, demandAlerts } from "@/data/dummyData";
import { districtCrops, marketScopes, MarketScope, getMarketPrices, getBasePrice } from "@/data/districtDummyData";
import { MapPin, Store, Users, AlertTriangle, TrendingUp, TrendingDown, Layers, Globe, Landmark } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const DistrictDashboard = () => {
  const [selectedCrop, setSelectedCrop] = useState("tomato");
  const [scope, setScope] = useState<MarketScope>("district");

  // KPIs
  const totalMandals = mandalsOfTirupati.length;
  const activeMandis = mandisTirupati.length;
  const totalFarmers = mandalsOfTirupati.reduce((acc, m) => acc + m.farmers, 0);
  const activeAlertsCount = demandAlerts.length;

  const currentPrices = getMarketPrices(scope, selectedCrop);
  const avgPrice = Math.round(currentPrices.reduce((acc, p) => acc + p.price, 0) / currentPrices.length);

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="page-header">Tirupati District Dashboard</h1>
          <p className="page-subtitle">Central monitoring and market intelligence for Tirupati District</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scope === "district" ? (
          <>
            <KPICard title="Total Mandals" value={totalMandals} icon={<MapPin className="h-5 w-5" />} />
            <KPICard title="Active Mandis" value={activeMandis} icon={<Store className="h-5 w-5" />} change={0} />
            <KPICard title="Registered Farmers" value={totalFarmers.toLocaleString()} icon={<Users className="h-5 w-5" />} change={5} />
            <KPICard title="Current Demand Alerts" value={activeAlertsCount} icon={<AlertTriangle className="h-5 w-5" />} change={-12} />
          </>
        ) : (
          <>
            <KPICard title="Price Intelligence" value={scope.replace('_', ' ').toUpperCase()} icon={<Globe className="h-5 w-5" />} />
            <KPICard title={`Avg ${selectedCrop} Price`} value={`₹${avgPrice}/kg`} icon={<TrendingUp className="h-5 w-5" />} change={8} />
            <KPICard title="Market Demand" value="High" icon={<Landmark className="h-5 w-5" />} />
            <KPICard title="Active Data Points" value={currentPrices.length} icon={<Layers className="h-5 w-5" />} />
          </>
        )}
      </div>

      {/* Quick Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="kpi-card bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Top Demand Crop Today</h4>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧅</span>
            <div>
              <p className="text-lg font-bold">Onion</p>
              <p className="text-xs text-primary font-medium flex items-center"><TrendingUp className="h-3 w-3 mr-1" /> High Demand</p>
            </div>
          </div>
        </div>
        <div className="kpi-card bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Highest Price Crop</h4>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌶️</span>
            <div>
              <p className="text-lg font-bold">Chilli</p>
              <p className="text-xs text-blue-600 font-medium flex items-center">₹125 / kg in Tirupati Mandi</p>
            </div>
          </div>
        </div>
        <div className="kpi-card bg-gradient-to-br from-destructive/10 to-transparent border-destructive/20">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Supply Shortage</h4>
          <div className="flex items-center gap-3">
            <div className="bg-destructive/10 p-2 rounded-full"><MapPin className="h-5 w-5 text-destructive" /></div>
            <div>
              <p className="text-lg font-bold">Pakala Mandal</p>
              <p className="text-xs text-destructive font-medium flex items-center">Onion arrivals down 15%</p>
            </div>
          </div>
        </div>
        <div className="kpi-card bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Most Active Mandi</h4>
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 p-2 rounded-full"><Store className="h-5 w-5 text-amber-600" /></div>
            <div>
              <p className="text-lg font-bold">{scope === "district" ? "Madanapalle" : currentPrices[0].mandi}</p>
              <p className="text-xs text-amber-600 font-medium flex items-center">Highest Arrival Volume</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-chart">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">{scope === "district" ? "Mandal-wise Crop Arrivals" : "Market Price Intelligence"}</h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md flex items-center"><Layers className="h-3 w-3 mr-1" /> {scope === "district" ? "District Data" : "Market Data"}</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {scope === "district" ? (
              <BarChart data={mandalsOfTirupati}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'var(--muted)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="arrivals" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Arrivals (Quintals)" maxBarSize={50} />
              </BarChart>
            ) : (
              <BarChart data={currentPrices}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mandi" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'var(--muted)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="price" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Price (₹/kg)" maxBarSize={50} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="dashboard-chart">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Price Trends: {selectedCrop}</h3>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {districtCrops.map(c => (
                  <SelectItem key={c.id} value={c.id} className="text-xs">
                    <div className="flex items-center gap-2">
                      {c.image ? <img src={c.image} alt={c.name} className="w-4 h-4 rounded-full object-cover" /> : c.icon}
                      {c.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={(baseTrends[selectedCrop] || baseTrends["tomato"]).map(d => ({ ...d, price: Math.round(d.price * (scope === "international" ? 3.5 : scope === "other_states" ? 1.25 : scope === "state" ? 1.1 : 1)) }))}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" name="Avg Price (₹)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {scope === "district" && (
        <div className="dashboard-chart">
          <h3 className="font-bold text-lg mb-4">Mandi Comparison: Crop Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mandiArrivals}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="mandi" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'var(--muted)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="tomato" stackId="a" fill="hsl(0, 70%, 50%)" name="Tomato" />
              <Bar dataKey="onion" stackId="a" fill="hsl(30, 80%, 45%)" name="Onion" />
              <Bar dataKey="banana" stackId="a" fill="hsl(55, 90%, 50%)" name="Banana" />
              <Bar dataKey="chilli" stackId="a" fill="hsl(10, 80%, 40%)" name="Chilli" />
              <Bar dataKey="papaya" stackId="a" fill="hsl(120, 60%, 40%)" name="Papaya" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default DistrictDashboard;
