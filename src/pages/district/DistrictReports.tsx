import { useState } from "react";
import { FileText, Download, BarChart2, PieChart as PieChartIcon, Calendar, Filter, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mandalsOfTirupati, mandiArrivals, crops as baseCrops, pricePredictions, farmerEngagement } from "@/data/dummyData";
import { marketScopes, MarketScope } from "@/data/districtDummyData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DistrictReports = () => {
    const [scope, setScope] = useState<MarketScope>("district");
    const [activeReport, setActiveReport] = useState("production");

    const reportTypes = scope === "district" ? [
        { id: "production", name: "Mandal Production Report", icon: <PieChartIcon className="h-4 w-4" />, desc: "Cultivation area & farmers" },
        { id: "mandi", name: "Mandi Performance Report", icon: <BarChart2 className="h-4 w-4" />, desc: "Daily arrival volumes" },
        { id: "engagement", name: "Farmer Engagement Report", icon: <FileText className="h-4 w-4" />, desc: "Platform usage metrics" },
        { id: "forecast", name: "Regional Price Forecast", icon: <TrendingUp className="h-4 w-4" />, desc: "AI local predictions" },
    ] : [
        { id: "arbitrage", name: "Price Arbitrage Report", icon: <TrendingUp className="h-4 w-4" />, desc: "Cross-market price gaps" },
        { id: "opportunity", name: "Market Opportunity Summary", icon: <Globe className="h-4 w-4" />, desc: "High-value trade destinations" },
        { id: "global_hub", name: "Global Hub Analytics", icon: <BarChart2 className="h-4 w-4" />, desc: "Bulk arrival & demand logs" },
    ];

    // Reset active report if current one not in list
    const currentReportList = reportTypes.map(r => r.id);
    if (!currentReportList.includes(activeReport)) {
        setActiveReport(currentReportList[0]);
    }

    return (
        <div className="space-y-6 animate-slide-in pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                <div>
                    <h1 className="page-header flex items-center gap-2"><FileText className="h-7 w-7 text-primary" /> Analytical Reports</h1>
                    <p className="page-subtitle">Consolidated market intelligence and production summaries</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Report Scope:</span>
                    <Select value={scope} onValueChange={(v) => setScope(v as MarketScope)}>
                        <SelectTrigger className="w-[180px] h-10">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {marketScopes.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Button className="font-semibold shadow-md px-4 h-10"><Download className="h-4 w-4 mr-2" /> Export</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar report topics */}
                <div className="lg:col-span-1 space-y-3">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Report Categories</h3>
                    {reportTypes.map((rt) => (
                        <button
                            key={rt.id}
                            onClick={() => setActiveReport(rt.id)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1.5 shadow-sm group ${activeReport === rt.id
                                ? 'bg-primary/5 border-primary ring-1 ring-primary/30'
                                : 'bg-card hover:border-primary/40'
                                }`}
                        >
                            <div className="flex items-center gap-2 font-bold text-foreground group-hover:text-primary transition-colors">
                                <div className={`p-1.5 rounded-md ${activeReport === rt.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'}`}>
                                    {rt.icon}
                                </div>
                                {rt.name}
                            </div>
                            <p className="text-xs text-muted-foreground pl-9 font-medium">{rt.desc}</p>
                        </button>
                    ))}
                </div>

                {/* Report Preview Pane */}
                <div className="lg:col-span-3 bg-card border rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                    <div className="bg-muted/30 border-b p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                {reportTypes.find(r => r.id === activeReport)?.name}
                                <span className="text-[10px] bg-primary/10 text-primary uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-sm">Preview</span>
                            </h2>
                            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1 font-medium"><Calendar className="h-3.5 w-3.5" /> Generated Today • Tirupati Department of Horticulture</p>
                        </div>
                    </div>

                    <div className="p-0 flex-1 overflow-x-auto bg-card">
                        {activeReport === "production" && (
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-muted-foreground uppercase bg-muted/20 border-b">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Mandal Name</th>
                                        <th className="px-6 py-4 font-semibold text-right">Registered Farmers</th>
                                        <th className="px-6 py-4 font-semibold text-right">Crop Area (ha)</th>
                                        <th className="px-6 py-4 font-semibold text-right">Active Mandis</th>
                                        <th className="px-6 py-4 font-semibold text-right">Avg Weekly Arrivals (Q)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {mandalsOfTirupati.map((m, i) => (
                                        <tr key={i} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground">{m.name}</td>
                                            <td className="px-6 py-4 text-right font-medium">{m.farmers.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right font-semibold text-primary">{m.cropArea.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right">{m.mandis}</td>
                                            <td className="px-6 py-4 text-right font-medium">{m.arrivals.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {activeReport === "mandi" && (
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-muted-foreground uppercase bg-muted/20 border-b">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Mandi Location</th>
                                        <th className="px-6 py-4 font-semibold">Tomato (Q)</th>
                                        <th className="px-6 py-4 font-semibold">Onion (Q)</th>
                                        <th className="px-6 py-4 font-semibold">Banana (Q)</th>
                                        <th className="px-6 py-4 font-semibold text-right text-primary">Total Daily (Q)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {mandiArrivals.map((m, i) => (
                                        <tr key={i} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground">{m.mandi}</td>
                                            <td className="px-6 py-4 font-medium">{m.tomato.toLocaleString()} Q</td>
                                            <td className="px-6 py-4 font-medium">{m.onion.toLocaleString()} Q</td>
                                            <td className="px-6 py-4 font-medium">{m.banana.toLocaleString()} Q</td>
                                            <td className="px-6 py-4 text-right font-bold text-primary bg-primary/5">
                                                {(m.tomato + m.onion + m.banana + 500).toLocaleString()} Q
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {activeReport === "arbitrage" && (
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-muted-foreground uppercase bg-muted/20 border-b">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Market Route</th>
                                        <th className="px-6 py-4 font-semibold">Current Local Price</th>
                                        <th className="px-6 py-4 font-semibold">Target Hub Price</th>
                                        <th className="px-6 py-4 font-semibold">Price Gap (₹/Q)</th>
                                        <th className="px-6 py-4 font-semibold text-right text-green-600">Net Margin Potential</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-bold">Tirupati → Bangalore</td>
                                        <td className="px-6 py-4">₹2,450</td>
                                        <td className="px-6 py-4 font-semibold">₹3,120</td>
                                        <td className="px-6 py-4 text-destructive font-bold">+₹670</td>
                                        <td className="px-6 py-4 text-right font-bold text-green-600">High (22%)</td>
                                    </tr>
                                    <tr className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-bold">Madanapalle → Chennai</td>
                                        <td className="px-6 py-4">₹1,820</td>
                                        <td className="px-6 py-4 font-semibold">₹2,150</td>
                                        <td className="px-6 py-4 text-destructive font-bold">+₹330</td>
                                        <td className="px-6 py-4 text-right font-bold text-green-600">Moderate (15%)</td>
                                    </tr>
                                    <tr className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-bold">Pakala → Dubai (Export)</td>
                                        <td className="px-6 py-4">₹3,200</td>
                                        <td className="px-6 py-4 font-semibold">₹8,450</td>
                                        <td className="px-6 py-4 text-destructive font-bold">+₹5,250</td>
                                        <td className="px-6 py-4 text-right font-bold text-green-600">Premium (45%+)</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}

                        {activeReport === "engagement" && (
                            <div className="p-6 text-center">
                                <p className="text-muted-foreground font-medium italic">Generating platform usage summary for Tirupati district registered farmers...</p>
                                <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-muted/30 p-4 rounded-xl border">
                                        <span className="text-xs font-bold uppercase text-muted-foreground">Price Checks</span>
                                        <p className="text-2xl font-bold text-primary">12,450</p>
                                    </div>
                                    <div className="bg-muted/30 p-4 rounded-xl border">
                                        <span className="text-xs font-bold uppercase text-muted-foreground">Voice Queries</span>
                                        <p className="text-2xl font-bold">4,120</p>
                                    </div>
                                    <div className="bg-muted/30 p-4 rounded-xl border">
                                        <span className="text-xs font-bold uppercase text-muted-foreground">Push Success</span>
                                        <p className="text-2xl font-bold text-green-600">92%</p>
                                    </div>
                                    <div className="bg-muted/30 p-4 rounded-xl border">
                                        <span className="text-xs font-bold uppercase text-muted-foreground">Avg Session</span>
                                        <p className="text-2xl font-bold">4.2m</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(activeReport === "opportunity" || activeReport === "global_hub" || activeReport === "forecast") && (
                            <div className="p-16 text-center">
                                <Globe className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground font-medium italic">Simulating advanced market intelligence report for <strong>{marketScopes.find(s => s.id === scope)?.name}</strong>...</p>
                                <p className="text-xs text-muted-foreground/60 mt-2 italic px-20">This report aggregates real-time buyer sentiment, shipping logistics impact, and wholesale market depth analysis from regional data points across the {scope.replace('_', ' ')} network.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DistrictReports;
