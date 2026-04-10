import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFarmerCrops } from "@/contexts/FarmerContext";
import { getRecommendationsForScope, MarketScope } from "@/data/farmerDummyData";
import { ShoppingBag, MapPin, TrendingUp, CheckCircle, Store, Truck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FarmerMarkets = () => {
  const { t } = useLanguage();
  const { selectedCrops, allCrops: crops, marketScope, setMarketScope } = useFarmerCrops();

  // Default to the first selected crop or "tomato"
  const defaultCrop = selectedCrops.length > 0 ? selectedCrops[0] : "tomato";
  const [filter, setFilter] = useState(defaultCrop);

  const rawRecommendations = getRecommendationsForScope(marketScope, selectedCrops);
  // Filter recommendations based on selected crop
  const filteredMarkets = rawRecommendations.filter(m => filter === "all" || m.crop.toLowerCase() === filter);

  // Define a synthetic "Best Market" based on distance and demand
  const bestMarket = filteredMarkets.length > 0 ? filteredMarkets.reduce((prev, curr) => (prev.price - prev.distance * 0.5) > (curr.price - curr.distance * 0.5) ? prev : curr) : null;

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="page-header">{t("Recommended Markets", "సిఫారసు మార్కెట్లు")}</h1>
        <p className="page-subtitle">{t("Discover the most profitable mandis to sell your produce", "మీ ఉత్పత్తులను విక్రయించడానికి అత్యంత లాభదాయకమైన మార్కెట్‌లను కనుగొనండి")}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-xl border">
        <div className="w-full sm:w-1/3">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">{t("Filter by Crop", "పంట ద్వారా ఫిల్టర్ చేయండి")}</label>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Crops", "అన్ని పంటలు")}</SelectItem>
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
          <Select value={marketScope} onValueChange={(v) => setMarketScope(v as MarketScope)}>
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
      </div>

      {bestMarket && (
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10">
            <Store className="h-40 w-40 text-primary" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-primary">{t("Top Recommendation Today", "నేటి టాప్ సిఫార్సు")}</h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
            <div>
              <h3 className="text-3xl font-extrabold mb-1">{bestMarket.mandi}</h3>
              <p className="text-muted-foreground font-medium text-lg">{bestMarket.crop}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <span className="flex items-center gap-1 font-semibold text-lg bg-background/50 px-3 py-1 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" /> ₹{bestMarket.price}/kg
                </span>
                <span className="flex items-center gap-1 font-semibold bg-background/50 px-3 py-1 rounded-lg text-destructive">
                  {bestMarket.demand} {t("Demand", "డిమాండ్")}
                </span>
                <span className="flex items-center gap-1 font-semibold bg-background/50 px-3 py-1 rounded-lg">
                  <MapPin className="h-5 w-5 text-muted-foreground" /> {bestMarket.distance} km
                </span>
              </div>
            </div>
            <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm whitespace-nowrap">
              <Truck className="h-4 w-4" />
              {t("Best price after transport cost", "రవాణా ఖర్చు తర్వాత ఉత్తమ ధర")}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMarkets.map((m, i) => (
          <div key={i} className={`kpi-card relative ${m === bestMarket ? 'ring-2 ring-primary/50' : ''}`}>
            {m === bestMarket && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl-lg font-bold">
                {t("BEST", "ఉత్తమ")}
              </div>
            )}
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{m.mandi}</h3>
                <p className="text-sm text-primary font-medium">{m.crop}</p>
              </div>
            </div>

            <div className="space-y-3 mt-4 text-sm bg-muted/30 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1"><TrendingUp className="h-4 w-4" /> {t("Expected Price", "ఆశించబడే ధర")}</span>
                <span className="font-bold">₹{m.price}/kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1"><Store className="h-4 w-4" /> {t("Demand Level", "డిమాండ్ స్థాయి")}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${m.demand === "High" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-orange-700"}`}>
                  {t(m.demand, m.demand === "High" ? "హై" : "సాధారణ")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1"><MapPin className="h-4 w-4" /> {t("Distance", "దూరం")}</span>
                <span className="font-semibold">{m.distance} km</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-dashed">
              <p className="text-xs text-primary font-medium flex gap-1 items-start">
                <span className="text-base leading-none">💡</span> {t(m.recommendation, m.recommendationTE)}
              </p>
            </div>
          </div>
        ))}
        {filteredMarkets.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground border-dashed border-2 rounded-xl">
            <ShoppingBag className="h-10 w-10 mx-auto mb-3 opacity-20" />
            <p>{t("No recommended markets found for the selected crop based on current algorithms.", "ప్రస్తుత అల్గారిథమ్‌ల ఆధారంగా ఎంచుకున్న పంట కోసం సిఫార్సు చేయబడిన మార్కెట్‌లు కనుగొనబడలేదు.")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerMarkets;
