import { useState } from "react";
import { stateCrops, stateMarketScopes, StateMarketScope, getMarketPrices, getStateBasePrice } from "@/data/stateDummyData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Activity, Globe, MapPin, Filter, Search, ArrowUpRight, ArrowDownRight, Minus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

const StateCropPrices = () => {
  const [scope, setScope] = useState<StateMarketScope>("state");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCrops = stateCrops.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header flex items-center gap-2"><TrendingUp className="h-7 w-7 text-primary" /> Crop Price Intelligence</h1>
          <p className="page-subtitle">Real-time and historical price monitoring across multiple market scopes</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border w-full md:w-auto">
          {stateMarketScopes.map(s => (
            <button
              key={s.id}
              onClick={() => setScope(s.id as StateMarketScope)}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 ${scope === s.id ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
            >
              {s.id === "state" ? <MapPin className="h-3.5 w-3.5" /> : <Globe className="h-3.5 w-3.5" />}
              {s.name}
            </button>
          ))}
        </div>

        <div className="h-8 w-px bg-border hidden md:block mx-2" />

        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search crops..."
            className="w-full pl-10 pr-4 py-2 bg-muted/30 border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button variant="outline" className="h-10 px-4 border-primary/20 hover:bg-primary/5 font-bold text-xs uppercase tracking-widest">
          <Filter className="h-3.5 w-3.5 mr-2" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCrops.map((crop) => {
          const marketData = getMarketPrices(scope, crop.id);
          const basePrice = getStateBasePrice(crop.id, scope);

          return (
            <div key={crop.id} className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:border-primary/40 transition-all">
              <div className="p-6 bg-muted/30 border-b flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-2xl shadow-sm border w-16 h-16 flex items-center justify-center overflow-hidden">
                    {crop.image ? <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" /> : <span className="text-4xl">{crop.icon}</span>}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground">{crop.name}</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{scope === "state" ? "Intra-State Markets" : "External Markets"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 tracking-widest">Avg Price (₹/KG)</p>
                  <p className="text-3xl font-black text-primary">₹{basePrice.toFixed(0)}</p>
                </div>
              </div>

              <div className="p-0 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left py-3 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Mandi / Market</th>
                      <th className="text-center py-3 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Current Price</th>
                      <th className="text-center py-3 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                      <th className="text-right py-3 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {marketData.map((m, idx) => (
                      <tr key={idx} className="hover:bg-muted/10 transition-colors">
                        <td className="py-3 px-6">
                          <div>
                            <p className="font-bold text-sm flex items-center gap-1.5"><Store className="h-3.5 w-3.5 text-primary/50" /> {m.market}</p>
                            <p className="text-[10px] text-muted-foreground font-medium">{m.location}</p>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <p className="font-black text-foreground">₹{m.price}</p>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className={`mx-auto w-fit flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${m.trend === 'up' ? 'bg-emerald-500/10 text-emerald-600' : m.trend === 'down' ? 'bg-red-500/10 text-red-600' : 'bg-blue-500/10 text-blue-600'}`}>
                            {m.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : m.trend === 'down' ? <ArrowDownRight className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                            {m.trend}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-right">
                          <span className="text-[10px] font-black text-muted-foreground">{m.time}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-muted/10 border-t flex justify-center">
                <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5">
                  View 30-Day History for {crop.name}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StateCropPrices;
