import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFarmerCrops } from "@/contexts/FarmerContext";
import { getPricesForScope, getAlertsForScope, getRecommendationsForScope, getTrendsForScope, MarketScope } from "@/data/farmerDummyData";
import { TrendingUp, TrendingDown, AlertTriangle, ShoppingBag, MapPin, BarChart3, Globe } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FarmerDashboard = () => {
  const { t } = useLanguage();
  const { selectedCrops, allCrops: crops, marketScope, setMarketScope } = useFarmerCrops();

  // Quick state for charts
  const [activeChartCrop, setActiveChartCrop] = useState(selectedCrops.length > 0 ? selectedCrops[0] : "tomato");

  // Generate data based on scope
  const generatedAlerts = getAlertsForScope(marketScope, selectedCrops);
  const generatedRecommendations = getRecommendationsForScope(marketScope, selectedCrops);

  // Filter data
  const myCropsData = crops.filter(c => selectedCrops.includes(c.id));
  const myAlerts = generatedAlerts.filter(a => selectedCrops.includes(a.crop.toLowerCase()));
  const myRecommendations = generatedRecommendations.filter(m => selectedCrops.includes(m.crop.toLowerCase()));

  // Summary Widgets logic
  const topDemandAlert = myAlerts.find(a => a.severity === "high") || generatedAlerts[0];
  const bestMarket = myRecommendations[0] || generatedRecommendations[0];
  const priceIncreaseCrop = crops[0] || { name: 'Tomato', nameTE: 'టమాటా' };

  const mandiComparisonData = getPricesForScope(activeChartCrop, marketScope);
  const trendData = getTrendsForScope(activeChartCrop, marketScope);

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="page-header">{t("Farmer Dashboard", "రైతు డాష్‌బోర్డ్")}</h1>
          <p className="page-subtitle">{t("Personalized market intelligence for your crops", "మీ పంటలకు వ్యక్తిగతీకరించిన మార్కెట్ సమాచారం")}</p>
        </div>
        <div className="bg-card p-2 rounded-xl flex items-center gap-2 border shadow-sm w-full md:w-auto">
          <Globe className="h-5 w-5 text-primary ml-2" />
          <Select value={marketScope} onValueChange={(v) => setMarketScope(v as MarketScope)}>
            <SelectTrigger className="w-full md:w-[200px] border-none shadow-none focus:ring-0">
              <SelectValue placeholder="Market Scope" />
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

      {/* Summary Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="kpi-card bg-primary/5 border-primary/20">
          <div className="flex items-center gap-2 text-primary mb-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">{t("Top Demand Crop", "అత్యధిక డిమాండ్ పంట")}</span>
          </div>
          <p className="font-bold text-lg">{topDemandAlert.crop}</p>
          <p className="text-sm text-muted-foreground">{topDemandAlert.mandi}</p>
        </div>
        <div className="kpi-card bg-primary/5 border-primary/20">
          <div className="flex items-center gap-2 text-primary mb-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">{t("Best Market Today", "నేటి ఉత్తమ మార్కెట్")}</span>
          </div>
          <p className="font-bold text-lg">{bestMarket.mandi}</p>
          <p className="text-sm text-muted-foreground">₹{bestMarket.price}/kg {t("for", "కోసం")} {bestMarket.crop}</p>
        </div>
        <div className="kpi-card bg-primary/5 border-primary/20">
          <div className="flex items-center gap-2 text-primary mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">{t("Expected Price Rise", "ఆశించబడే ధర పెంపు")}</span>
          </div>
          <p className="font-bold text-lg">{t(priceIncreaseCrop.name, priceIncreaseCrop.nameTE)}</p>
          <p className="text-sm text-muted-foreground">{t("Wait before selling", "అమ్మే ముందు కొంచెం ఆగండి")}</p>
        </div>
        <div className="kpi-card bg-primary/5 border-primary/20">
          <div className="flex items-center gap-2 text-primary mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">{t("Nearby High Demand", "సమీప అత్యధిక డిమాండ్")}</span>
          </div>
          <p className="font-bold text-lg">Madanapalle</p>
          <p className="text-sm text-muted-foreground">{t("12 km away", "12 కి.మీ దూరం")}</p>
        </div>
      </div>

      {/* Today's Prices for Selected Crops */}
      <div>
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          {t("Prices for My Crops", "నా పంటల ధరలు")}
          <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{myCropsData.length}</span>
        </h2>
        {myCropsData.length === 0 ? (
          <p className="text-sm text-muted-foreground kpi-card">{t("Please select crops in 'My Crops' to see personalized prices.", "దయచేసి 'నా పంటలు' లో మీ పంటలను ఎంచుకోండి.")}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {myCropsData.map(c => {
              const prices = getPricesForScope(c.id, marketScope);
              const bestPrice = Math.max(...prices.map(p => p.price));
              const bestMandi = prices.reduce((a, b) => a.price > b.price ? a : b).mandi;
              const trend = prices[0].price - prices[0].prevPrice;

              return (
                <div key={c.id} className="kpi-card text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setActiveChartCrop(c.id)}>
                  <div className="mx-auto w-16 h-16 rounded-full overflow-hidden bg-muted mb-2 relative group flex items-center justify-center">
                    {c.image ? <img src={c.image} alt={c.name} className="w-full h-full object-cover" /> : <span className="text-3xl">{c.icon}</span>}
                  </div>
                  <p className="font-semibold mt-1">{t(c.name, c.nameTE)}</p>
                  <p className="text-xl font-bold text-primary">₹{bestPrice}</p>
                  <div className={`flex items-center justify-center gap-1 text-xs ${trend >= 0 ? "stat-up" : "stat-down"}`}>
                    {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {trend >= 0 ? "+" : ""}{trend}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{bestMandi}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Functional Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Trend Graph */}
        <div className="dashboard-chart">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            {t("Price Trend (7 Days)", "ధరల సరళి (7 రోజులు)")}
            <span className="text-sm font-normal text-muted-foreground ml-auto capitalize">{activeChartCrop}</span>
          </h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Line type="monotone" dataKey="price" stroke="hsl(152,55%,28%)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name={t("Price (₹)", "ధర (₹)")} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mandi Comparison */}
        <div className="dashboard-chart">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {t("Mandi Comparison", "మండీల పోలిక")}
            <span className="text-sm font-normal text-muted-foreground ml-auto capitalize">{activeChartCrop}</span>
          </h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mandiComparisonData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="mandi" type="category" fontSize={11} width={100} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Bar dataKey="price" fill="hsl(38,70%,50%)" radius={[0, 4, 4, 0]} name={t("Price (₹)", "ధర (₹)")} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold text-lg mb-3">
            {t("My Alerts", "నా అలర్ట్‌లు")}
          </h2>
          <div className="space-y-2">
            {myAlerts.length > 0 ? myAlerts.slice(0, 3).map(a => (
              <div key={a.id} className="kpi-card flex items-start gap-3">
                <AlertTriangle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${a.severity === "high" ? "text-destructive" : "text-warning"}`} />
                <p className="text-sm">{t(a.message, a.messageTE)}</p>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground kpi-card">{t("No new alerts for your selected crops.", "మీరు ఎంచుకున్న పంటలకు కొత్త అలర్ట్‌లు లేవు.")}</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-3">
            {t("Recommended For You", "మీ కోసం సిఫార్సు చేయబడినవి")}
          </h2>
          <div className="space-y-2">
            {myRecommendations.length > 0 ? myRecommendations.slice(0, 3).map((m, i) => (
              <div key={i} className="kpi-card flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold">{m.mandi}</p>
                  <p className="text-sm text-muted-foreground">{m.crop} – ₹{m.price} • {m.distance} km</p>
                  <p className="text-xs text-primary font-medium">{t(m.recommendation, m.recommendationTE)}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground kpi-card">{t("No recommendations available for your crops.", "మీ పంటలకు సిఫార్సులు లేవు.")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
