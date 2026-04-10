import { useState } from "react";
import { mandalsOfTirupati, districts, crops as baseCrops } from "@/data/dummyData";
import { districtCrops, marketScopes, MarketScope, getMarketPrices } from "@/data/districtDummyData";
import { MapPin, Users, Store, BarChart3, ChevronRight, Leaf, Waves, Globe, BarChart } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLORS = ['hsl(var(--primary))', '#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

const MandalIntelligence = () => {
  const [scope, setScope] = useState<MarketScope>("district");
  const [selectedMandal, setSelectedMandal] = useState(mandalsOfTirupati[0]);
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);

  const displayList = scope === "district" ? mandalsOfTirupati : (scope === "state" ? districts : []);
  const activeItem = scope === "district" ? selectedMandal : selectedDistrict;

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="page-header">Market & Region Intelligence</h1>
          <p className="page-subtitle">Region-level agricultural statistics and market analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Region/Market Scope:</span>
          <Select value={scope} onValueChange={(v) => setScope(v as MarketScope)}>
            <SelectTrigger className="w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {marketScopes.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {(scope === "district" || scope === "state") ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <div className="font-bold text-lg mb-4 flex items-center justify-between">
              {scope === "district" ? "Select Mandal" : "Select District"}
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{displayList.length} total</span>
            </div>
            {displayList.map(m => (
              <div
                key={m.id}
                onClick={() => scope === "district" ? setSelectedMandal(m as any) : setSelectedDistrict(m as any)}
                className={`kpi-card space-y-3 cursor-pointer transition-all ${activeItem.id === m.id ? 'border-primary ring-1 ring-primary/30 bg-primary/5 shadow-md' : 'hover:border-primary/40'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className={`h-5 w-5 ${activeItem.id === m.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className={`font-bold text-lg ${activeItem.id === m.id ? 'text-primary' : ''}`}>{m.name}</h3>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${activeItem.id === m.id ? 'text-primary' : 'text-transparent'}`} />
                </div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{m.farmers.toLocaleString()} Farmers</div>
                  <div className="flex items-center gap-1.5"><Store className="h-3.5 w-3.5" />{m.mandis} Mandis</div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="kpi-card bg-gradient-to-br from-card to-muted/30 border shadow-sm">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                <MapPin className="h-6 w-6 text-primary" /> {activeItem.name} {scope === "district" ? "Mandal" : "District"} Details
              </h2>
              <p className="text-muted-foreground mb-6">Production statistics for crops across {activeItem.name}.</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-background rounded-lg p-3 border shadow-sm text-center">
                  <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase">Farmers</p>
                  <p className="text-xl font-bold">{activeItem.farmers.toLocaleString()}</p>
                </div>
                <div className="bg-background rounded-lg p-3 border shadow-sm text-center">
                  <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase">Total Area</p>
                  <p className="text-xl font-bold text-primary">{(activeItem as any).cropArea ? (activeItem as any).cropArea.toLocaleString() + " ha" : "Calculating..."}</p>
                </div>
                <div className="bg-background rounded-lg p-3 border shadow-sm text-center">
                  <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase">Arrivals</p>
                  <p className="text-xl font-bold">{(activeItem as any).arrivals ? (activeItem as any).arrivals.toLocaleString() + " Q" : "Data Pending"}</p>
                </div>
                <div className="bg-background rounded-lg p-3 border shadow-sm text-center">
                  <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase">Demand</p>
                  <p className="text-xl font-bold text-amber-600">High</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background border rounded-xl p-4 shadow-sm">
                  <h3 className="font-bold text-sm mb-4">Top Cultivated Crops (Area)</h3>
                  <div className="space-y-3 pl-2">
                    {districtCrops.slice(0, 4).map((c, i) => (
                      <div key={c.id} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-1.5 font-medium">
                            {c.image ? <img src={c.image} alt={c.name} className="w-5 h-5 rounded-full object-cover" /> : c.icon} 
                            {c.name}
                          </span>
                          <span className="text-muted-foreground font-semibold">{Math.floor(((activeItem as any).cropArea || 5000) * ((4 - i) * 0.15))} ha</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${((4 - i) * 20) + 10}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-background border rounded-xl p-4 shadow-sm h-full flex flex-col">
                  <h3 className="font-bold text-sm mb-2">Production Distribution</h3>
                  <div className="flex-1 min-h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Tomato', value: 40 },
                            { name: 'Onion', value: 30 },
                            { name: 'Banana', value: 15 },
                            { name: 'Chilli', value: 15 },
                          ]}
                          cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={2} dataKey="value" stroke="none"
                        >
                          {COLORS.map((color, index) => <Cell key={`cell-${index}`} fill={color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => `${value}%`} />
                        <Legend verticalAlign="bottom" height={20} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="kpi-card bg-gradient-to-br from-blue-50 to-transparent border-blue-200">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2 text-blue-800">
              <Globe className="h-6 w-6" /> Market Demand Intelligence: {scope.replace('_', ' ').toUpperCase()}
            </h2>
            <p className="text-blue-600/80 mb-6">Price and demand trends for global and external markets. Farmer data is not tracked for this scope.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="dashboard-chart h-[350px]">
                <h3 className="font-bold mb-4">Market Price Comparison (₹/kg)</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={getMarketPrices(scope, "tomato")}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mandi" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                    <Bar dataKey="price" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Tomato Price" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="dashboard-chart h-[350px]">
                <h3 className="font-bold mb-4">Market Demand Levels</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={getMarketPrices(scope, "onion")}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mandi" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} hide />
                    <Tooltip cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }} />
                    <Bar dataKey="price" fill="#10b981" radius={[4, 4, 0, 0]} name="Onion Price" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MandalIntelligence;
