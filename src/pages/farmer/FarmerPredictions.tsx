import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFarmerCrops } from "@/contexts/FarmerContext";
import { aiInsights } from "@/data/dummyData";
import { getPredictionsForScope, MarketScope } from "@/data/farmerDummyData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { TrendingUp, TrendingDown, Minus, BrainCircuit, CalendarClock, CloudRain, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FarmerPredictions = () => {
  const { t } = useLanguage();
  const { allCrops: crops, marketScope, setMarketScope } = useFarmerCrops();
  const [crop, setCrop] = useState("tomato");

  const data = getPredictionsForScope(crop, marketScope);
  const lastPredicted = data[data.length - 1].predicted;
  const firstActual = data[0].actual || data[0].predicted;
  const trendDir = lastPredicted > firstActual ? "rising" : lastPredicted < firstActual ? "falling" : "stable";

  // Dummy logic for a recommendation message based on trend
  const cropObj = crops.find(c => c.id === crop);
  const cropNameStr = t(cropObj?.name || "", cropObj?.nameTE || "");
  const scopeText = marketScope === 'district' ? 'nearby district markets' : marketScope === 'state' ? 'state markets' : marketScope === 'other_states' ? 'neighboring states' : 'international markets';

  const recMsg = useMemo(() => {
    if (trendDir === "rising") {
      return t(`${cropObj?.name} prices expected to increase in ${scopeText} in the next 5 days. Consider waiting before selling.`, `${cropObj?.nameTE} ధరలు రాబోయే 5 రోజుల్లో పెరిగే అవకాశం ఉంది. అమ్మే ముందు కొద్ది రోజులు ఆగండి.`);
    } else if (trendDir === "falling") {
      return t(`${cropObj?.name} prices in ${scopeText} are likely to drop. Highly recommended to sell immediately.`, `${cropObj?.nameTE} ధరలు పడిపోయే అవకాశం ఉంది. వెంటనే అమ్మడం మంచిది.`);
    }
    return t(`${cropObj?.name} prices in ${scopeText} are stable. Sell as per your harvest schedule.`, `${cropObj?.nameTE} ధరలు స్థిరంగా ఉన్నాయి. మీ పంట కోత ప్రకారం అమ్మండి.`);
  }, [trendDir, cropObj, t, scopeText]);

  const relatedInsight = aiInsights.find(i => i.title.toLowerCase().includes(crop)) || aiInsights[0];

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="page-header">{t("Price Predictions", "ధర అంచనాలు")}</h1>
        <p className="page-subtitle">{t("AI-driven crop price forecasting based on market data", "మార్కెట్ డేటా ఆధారంగా AI-ఆధారిత పంట ధర అంచనా")}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-xl border">
        <div className="w-full sm:w-1/3">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">{t("Select Crop to Forecast", "అంచనా కోసం పంటను ఎంచుకోండి")}</label>
          <Select value={crop} onValueChange={setCrop}>
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
        <div className="flex-1 flex gap-4 ml-auto h-full justify-end">
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground px-4 py-2 bg-muted/30 rounded-lg">
            <CloudRain className="h-4 w-4 text-info" /> {t("Weather factored", "వాతావరణం అంచనావేయబడింది")}
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground px-4 py-2 bg-muted/30 rounded-lg">
            <CalendarClock className="h-4 w-4 text-warning" /> {t("Historical arrivals included", "చారిత్రక రాకలు చేర్చబడ్డాయి")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Graph Area */}
        <div className="md:col-span-2 dashboard-chart pb-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              {t("15-Day AI Forecast", "15 రోజుల AI అంచనా")}
              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full ml-2 w-max">
                {activeIndicator(trendDir, t)}
              </span>
            </h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                <XAxis dataKey="day" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <ReferenceLine x="Day 7" stroke="#e2e8f0" strokeDasharray="3 3" label={{ position: 'top', value: t('Today', 'నేడు'), fill: '#64748b', fontSize: 10 }} />
                <Line type="monotone" dataKey="actual" stroke="hsl(152,55%,28%)" strokeWidth={3} name={t("Actual (₹)", "వాస్తవ (₹)")} dot={{ r: 4 }} activeDot={{ r: 6 }} connectNulls={false} />
                <Line type="monotone" dataKey="predicted" stroke="hsl(38,70%,50%)" strokeWidth={3} strokeDasharray="5 5" name={t("Predicted (₹)", "అంచనా (₹)")} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations Panel */}
        <div className="space-y-4">
          <div className={`p-5 rounded-xl border ${trendDir === 'rising' ? 'bg-success/5 border-success/30' : trendDir === 'falling' ? 'bg-destructive/5 border-destructive/30' : 'bg-primary/5 border-primary/30'}`}>
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <BrainCircuit className="h-5 w-5" />
              {t("AI Smart Action", "AI స్మార్ట్ చర్య")}
            </h3>
            <p className="text-sm font-medium leading-relaxed">{recMsg}</p>
          </div>

          <div className="kpi-card relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 bg-gradient-to-br from-primary to-transparent w-full h-full -z-10 group-hover:opacity-10 transition-opacity" />
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">{t("Market Insight", "మార్కెట్ అంతర్దృష్టి")}</h4>
            <p className="font-medium text-primary mb-2">{relatedInsight.title}</p>
            <p className="text-sm text-balance">{relatedInsight.description}</p>
            <div className="mt-4 flex gap-2">
              <span className="text-xs bg-muted px-2 py-1 rounded-md">{relatedInsight.category}</span>
              <span className="text-xs bg-muted px-2 py-1 rounded-md">{t("Confidence", "నమ్మకం")}: {relatedInsight.confidence}%</span>
            </div>
          </div>

          <div className="kpi-card bg-muted/30">
            <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase">{t("Simulation Data Sources", "సిమ్యులేషన్ పరోక్ష డేటా")}</h4>
            <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
              <li>E-Panta Crop sowing data</li>
              <li>e-NAM historical arrivals</li>
              <li>IMD Weather Forecasts</li>
              <li>Local Mandi trader reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function activeIndicator(trend: string, t: any) {
  if (trend === 'rising') return <span className="flex items-center gap-1 text-green-600"><TrendingUp className="h-3 w-3" /> {t("Rising Trend", "పెరుగుతున్న ట్రెండ్")}</span>;
  if (trend === 'falling') return <span className="flex items-center gap-1 text-destructive"><TrendingDown className="h-3 w-3" /> {t("Falling Trend", "తగ్గుతున్న ట్రెండ్")}</span>;
  return <span className="flex items-center gap-1 text-info"><Minus className="h-3 w-3" /> {t("Stable Trend", "స్థిరమైన ట్రెండ్")}</span>;
}

export default FarmerPredictions;
