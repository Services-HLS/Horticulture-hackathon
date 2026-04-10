import { useState } from "react";
import { crops as baseCrops, cropPrices, pricePredictions, priceTrends, mandisTirupati } from "@/data/dummyData";
import { districtCrops, marketScopes, MarketScope, getMarketPrices } from "@/data/districtDummyData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Eye, Filter, Download, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const DistrictCropPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState("tomato");
  const [scope, setScope] = useState<MarketScope>("district");

  const displayPrices = getMarketPrices(scope, selectedCrop);

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="page-header">Market Price Analytics</h1>
          <p className="page-subtitle">Cross-regional price monitoring and tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex border-primary text-primary hover:bg-primary/10">
            <Download className="h-4 w-4 mr-2" /> Export Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-xl border flex flex-wrap gap-4 items-center shadow-sm">
        <div className="flex items-center gap-2 text-muted-foreground mr-2">
          <Filter className="h-5 w-5" />
          <span className="font-semibold text-sm">Filters:</span>
        </div>
        <div className="w-56">
          <Select value={scope} onValueChange={(v) => setScope(v as MarketScope)}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Market Scope" />
            </SelectTrigger>
            <SelectContent>
              {marketScopes.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="w-56">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select Crop" />
            </SelectTrigger>
            <SelectContent>
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

      {/* Price Table */}
      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold">Crop Name</th>
                <th className="px-6 py-4 font-semibold">Market Name</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Current Price / kg</th>
                <th className="px-6 py-4 font-semibold">Price Trend</th>
                <th className="px-6 py-4 font-semibold">Demand Level</th>
                <th className="px-6 py-4 font-semibold">Last Updated</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayPrices.map((p, idx) => {
                const cropObj = districtCrops.find(c => c.id === selectedCrop);
                const location = scope === "district" ? "Tirupati, AP" : scope === "state" ? "Andhra Pradesh" : scope === "other_states" ? "External State" : "International";

                return (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 font-medium">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full overflow-hidden shrink-0">
                          {cropObj?.image ? <img src={cropObj.image} alt={cropObj.name} className="w-full h-full object-cover" /> : <span className="text-lg">{cropObj?.icon}</span>}
                        </span>
                        {cropObj?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">{p.mandi}</td>
                    <td className="px-6 py-4 text-muted-foreground italic">{location}</td>
                    <td className="px-6 py-4">
                      <span className="text-base font-bold text-primary">₹{p.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {p.trend === "up" ? (
                          <span className="text-destructive flex items-center gap-1 font-bold text-xs"><TrendingUp className="h-4 w-4" /> Rising</span>
                        ) : p.trend === "down" ? (
                          <span className="text-green-600 flex items-center gap-1 font-bold text-xs"><TrendingDown className="h-4 w-4" /> Falling</span>
                        ) : (
                          <span className="text-amber-600 font-bold text-xs">Stable</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${p.demand === 'high' ? 'bg-destructive' : p.demand === 'medium' ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                      <span className="font-medium text-xs capitalize">{p.demand}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">{p.time}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-primary">
                        <span className="sr-only">View Details</span>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-chart">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            Regional Price Trends (Last 7 Days)
            <span className="text-xs font-normal bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-auto">{districtCrops.find(c => c.id === selectedCrop)?.name}</span>
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={(priceTrends[selectedCrop] || []).map(d => ({ ...d, price: Math.round(d.price * (scope === "international" ? 3.5 : scope === "other_states" ? 1.25 : scope === "state" ? 1.1 : 1)) }))}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-chart">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            Market Opportunity Analysis
            <span className="text-xs font-normal bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full ml-auto">Simulated</span>
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-5 w-5 text-primary" />
                <span className="font-bold text-sm">Best Export Potential</span>
              </div>
              <p className="text-xs text-muted-foreground">Currently <strong>Dubai Wholesale</strong> shows highest premium for <strong>{(districtCrops.find(c => c.id === selectedCrop)?.name)}</strong> with 42% higher margins than local mandis.</p>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg border border-amber-500/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-amber-600" />
                <span className="font-bold text-sm">Domestic Arbitrage</span>
              </div>
              <p className="text-xs text-muted-foreground">Chennai (TN) market prices are 18% higher than Tirupati Mandi. Logistics cost estimated at ₹3.5/kg makes this a profitable trade.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictCropPrices;
