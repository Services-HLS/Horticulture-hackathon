import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFarmerCrops } from "@/contexts/FarmerContext";
import { getPricesForScope, getTrendsForScope, MarketScope } from "@/data/farmerDummyData";
import { TrendingUp, TrendingDown, MapPin, Store, Clock, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type SortOption = "highest_price" | "nearest" | "highest_demand";

const FarmerCropPrices = () => {
  const { t } = useLanguage();
  const { allCrops: crops, marketScope, setMarketScope } = useFarmerCrops();
  const [selectedCrop, setSelectedCrop] = useState("tomato");
  const [sortBy, setSortBy] = useState<SortOption>("highest_price");
  const [selectedMandi, setSelectedMandi] = useState<string | null>(null);

  const rawPrices = getPricesForScope(selectedCrop, marketScope);

  // Combine price data with mandi distance and demand mock
  let tableData = rawPrices.map(p => {
    const demandScore = p.price > p.prevPrice ? 3 : p.price === p.prevPrice ? 2 : 1;
    const demandLabel = demandScore === 3 ? "High" : demandScore === 2 ? "Normal" : "Low";

    return {
      mandi: p.mandi,
      location: p.location,
      distance: p.distance,
      price: p.price,
      prevPrice: p.prevPrice,
      unit: p.unit,
      demandScore,
      demandLabel,
      lastUpdated: "10 mins ago"
    };
  });

  // Sort
  if (sortBy === "highest_price") tableData.sort((a, b) => b.price - a.price);
  if (sortBy === "nearest") tableData.sort((a, b) => a.distance - b.distance);
  if (sortBy === "highest_demand") tableData.sort((a, b) => b.demandScore - a.demandScore);

  const activeCropName = t(crops.find(c => c.id === selectedCrop)?.name || "", crops.find(c => c.id === selectedCrop)?.nameTE || "");

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="page-header">{t("Check Crop Prices", "పంట ధరలు చూడండి")}</h1>
        <p className="page-subtitle">{t("Select a crop and compare mandi prices", "పంటను ఎంచుకోండి మార్కెట్ ధరలను వొలకండి")}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-xl border">
        <div className="w-full sm:w-1/3">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">{t("Select Crop", "పంటను ఎంచుకోండి")}</label>
          <Select value={selectedCrop} onValueChange={v => { setSelectedCrop(v); setSelectedMandi(null); }}>
            <SelectTrigger>
              <SelectValue placeholder="Crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map(c => (
                <SelectItem key={c.id} value={c.id}>
                  <div className="flex items-center gap-2">
                    {c.image ? <img src={c.image} className="w-5 h-5 rounded-full object-cover" /> : c.icon}
                    {t(c.name, c.nameTE)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-1/3">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">{t("Market Scope", "మార్కెట్ పరిధి")}</label>
          <Select value={marketScope} onValueChange={(v) => { setMarketScope(v as MarketScope); setSelectedMandi(null); }}>
            <SelectTrigger>
              <SelectValue placeholder="Scope" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="district">District Markets</SelectItem>
              <SelectItem value="state">State Markets</SelectItem>
              <SelectItem value="other_states">Other States</SelectItem>
              <SelectItem value="international">International Markets</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-1/3">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">{t("Sort By", "క్రమబద్ధీకరించు")}</label>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highest_price">{t("Highest Price", "అత్యధిక ధర")}</SelectItem>
              <SelectItem value="nearest">{t("Nearest Mandi", "సమీప మండి")}</SelectItem>
              <SelectItem value="highest_demand">{t("Highest Demand", "అత్యధిక డిమాండ్")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Area */}
        <div className="lg:col-span-2 overflow-x-auto bg-card rounded-xl border p-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">{t("Market Name", "మార్కెట్ పేరు")}</th>
                <th className="px-4 py-3 font-medium">{t("Location", "స్థానం")}</th>
                <th className="px-4 py-3 font-medium">{t("Distance", "దూరం")}</th>
                <th className="px-4 py-3 font-medium">{t("Price/kg", "ధర/కిలో")}</th>
                <th className="px-4 py-3 font-medium">{t("Demand", "డిమాండ్")}</th>
                <th className="px-4 py-3 font-medium">{t("Last Updated", "నవీకరించబడింది")}</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr
                  key={row.mandi}
                  className={`border-t transition-colors hover:bg-muted/30 cursor-pointer ${selectedMandi === row.mandi ? "bg-primary/5" : ""}`}
                  onClick={() => setSelectedMandi(row.mandi)}
                >
                  <td className="px-4 py-3 font-medium flex items-center gap-2">
                    <Store className="h-4 w-4 text-primary" />
                    {row.mandi}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.location}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.distance} km</td>
                  <td className="px-4 py-3 font-bold text-primary">₹{row.price}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.demandLabel === "High" ? "bg-destructive/10 text-destructive" : row.demandLabel === "Normal" ? "bg-primary/10 text-primary" : "bg-warning/10 text-orange-700"}`}>
                      {t(row.demandLabel, row.demandLabel === "High" ? "హై" : row.demandLabel === "Normal" ? "సాధారణ" : "తక్కువ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs"><Clock className="h-3 w-3 inline mr-1" />{row.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selectedMandi ? (
            <div className="dashboard-chart h-full animate-in slide-in-from-right-4 fade-in">
              <h3 className="font-bold text-lg border-b pb-2 mb-4 flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                {selectedMandi}
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{activeCropName} {t("Price", "ధర")}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-primary">
                      ₹{tableData.find(d => d.mandi === selectedMandi)?.price}
                    </span>
                    <span className="text-sm text-muted-foreground pb-1">/kg</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">{t("7-Day Trend", "7 రోజుల ట్రెండ్")}</h4>
                  <div className="h-[150px] -ml-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getTrendsForScope(selectedCrop, marketScope)}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis fontSize={10} tickLine={false} axisLine={false} width={40} />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="hsl(152,55%,28%)" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-primary flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {t("Demand Insight", "డిమాండ్ అభిప్రాయం")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("Arrivals are lower than expected today. Good time to transport and sell to maximize profit.", "ఈ రోజు రాకలు ఊహించిన దాని కంటే తక్కువగా ఉన్నాయి. లాభం పెంచడానికి రవాణా చేయడానికి మరియు విక్రయించడానికి మంచి సమయం.")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="dashboard-chart h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground border-dashed">
              <Store className="h-12 w-12 text-muted/50 mb-3" />
              <p>{t("Select a mandi from the list to view detailed trends and insights.", "వివరణాత్మక ట్రెండ్‌లు మరియు సమాచారం చూడటానికి జాబితా నుండి మండిని ఎంచుకోండి.")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerCropPrices;
