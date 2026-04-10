import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFarmerCrops } from "@/contexts/FarmerContext";
import { getAlertsForScope, MarketScope } from "@/data/farmerDummyData";
import { AlertTriangle, MapPin, Tag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FarmerAlerts = () => {
  const { t } = useLanguage();
  const { selectedCrops, allCrops: crops, marketScope, setMarketScope } = useFarmerCrops();

  // Quick filter state: "my_crops" or specific crop id, or "all"
  const [filter, setFilter] = useState("my_crops");

  const rawAlerts = getAlertsForScope(marketScope, selectedCrops);
  const filteredAlerts = rawAlerts.filter(a => {
    if (filter === "all") return true;
    if (filter === "my_crops") return selectedCrops.includes(a.crop.toLowerCase());
    return a.crop.toLowerCase() === filter;
  });

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="page-header">{t("Demand Alerts", "డిమాండ్ అలర్ట్‌లు")}</h1>
        <p className="page-subtitle">{t("Real-time notifications on market demand changes", "మార్కెట్ డిమాండ్ మార్పులపై నిజ-సమయ సూచనలు")}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-xl border">
        <div className="w-full sm:w-1/3">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">{t("Filter Alerts", "అలర్ట్‌లు ఫిల్టర్ చేయండి")}</label>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="my_crops">{t("My Selected Crops", "నా ఎంచుకున్న పంటలు")}</SelectItem>
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
        <div className="hidden sm:block ml-auto text-xs text-muted-foreground">
          {filteredAlerts.length} {t("alerts found", "అలర్ట్‌లు కనుగొనబడ్డాయి")}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlerts.length > 0 ? filteredAlerts.map(a => (
          <div key={a.id} className="kpi-card relative overflow-hidden group hover:border-primary/50 transition-colors">
            {/* Color Strip */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${a.severity === 'high' ? 'bg-destructive' : a.severity === 'medium' ? 'bg-warning' : 'bg-success'}`} />

            <div className="flex justify-between items-start pl-2 mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-5 w-5 ${a.severity === 'high' ? 'text-destructive' : a.severity === 'medium' ? 'text-warning' : 'text-success'}`} />
                <h3 className="font-bold text-lg">{a.crop}</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${a.severity === 'high' ? 'bg-destructive/10 text-destructive' : a.severity === 'medium' ? 'bg-warning/10 text-orange-700' : 'bg-success/10 text-green-700'}`}>
                {a.type}
              </span>
            </div>

            <p className="text-sm font-medium pl-2 mb-4 leading-relaxed text-foreground/90">
              {t(a.message, a.messageTE)}
            </p>

            <div className="flex flex-wrap items-center gap-3 pl-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {a.mandi}</span>
              <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {a.time}</span>
            </div>

            {/* Action text simulation */}
            {a.severity === "high" && (
              <div className="mt-4 pl-2 pt-3 border-t border-dashed border-destructive/20 text-xs font-semibold text-destructive">
                {t("Suggested Action:", "సూచించిన చర్య:")} {t("Evaluate selling options immediately", "వెంటనే విక్రయ ఎంపికలను పరిశీలించండి")}
              </div>
            )}
            {a.severity === "medium" && (
              <div className="mt-4 pl-2 pt-3 border-t border-dashed border-warning/20 text-xs font-semibold text-orange-700">
                {t("Suggested Action:", "సూచించిన చర్య:")} {t("Monitor prices closely", "ధరలను తరచుగా గమనించండి")}
              </div>
            )}
          </div>
        )) : (
          <div className="col-span-1 md:col-span-2 text-center py-12 text-muted-foreground bg-card rounded-xl border border-dashed">
            <AlertTriangle className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p>{t("No alerts found for the selected filter.", "ఎంచుకున్న ఫిల్టర్ కోసం ఎటువంటి అలర్ట్‌లు లేవు.")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerAlerts;
