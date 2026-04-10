import { useState } from "react";
import { stateCrops, apDistricts, stateCultivationStats, cultivationByDistrict } from "@/data/stateDummyData";
import { BarChart3, Users, Sprout, MapPin, Search, Filter, ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const StateCultivationAnalytics = () => {
    const [selectedCrop, setSelectedCrop] = useState("all");

    const filteredStats = selectedCrop === "all"
        ? stateCultivationStats
        : stateCultivationStats.filter(s => s.crop.toLowerCase() === selectedCrop);

    return (
        <div className="space-y-8 animate-slide-in pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="page-header flex items-center gap-2"><BarChart3 className="h-7 w-7 text-primary" /> Crop Cultivation Analytics</h1>
                    <p className="page-subtitle">Territorial distribution of crop cultivation across Andhra Pradesh</p>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                        <SelectTrigger className="w-[180px] h-11 border-primary/20 bg-card/50 backdrop-blur-sm font-semibold">
                            <SelectValue placeholder="All Crops" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Crops</SelectItem>
                            {stateCrops.map(c => (
                                <SelectItem key={c.id} value={c.id}>
                                    <div className="flex items-center gap-2">
                                        {c.image ? <img src={c.image} alt={c.name} className="w-5 h-5 rounded-full object-cover" /> : c.icon}
                                        {c.name}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="h-11 shadow-sm"><Filter className="h-4 w-4 mr-2" /> More Filters</Button>
                </div>
            </div>

            {/* Top KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="kpi-card bg-primary/5 border-primary/20">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">Total AP Farmers</p>
                            <h3 className="text-3xl font-black text-primary">1.2M</h3>
                        </div>
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Users className="h-5 w-5" />
                        </div>
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">Horticulture Area</p>
                            <h3 className="text-3xl font-black text-foreground">8.4M <span className="text-xs font-bold text-muted-foreground">Acres</span></h3>
                        </div>
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600">
                            <Sprout className="h-5 w-5" />
                        </div>
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">Avg Yield/Acre</p>
                            <h3 className="text-3xl font-black text-foreground">14.2 <span className="text-xs font-bold text-muted-foreground">MT</span></h3>
                        </div>
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">Statewide Production</p>
                            <h3 className="text-3xl font-black text-foreground">22.5M <span className="text-xs font-bold text-muted-foreground">MT</span></h3>
                        </div>
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                            <BarChart3 className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Crop Distribution Table */}
                <div className="lg:col-span-1 bg-card border rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b bg-muted/30">
                        <h2 className="font-black text-lg flex items-center gap-2 text-foreground">
                            <Sprout className="h-5 w-5 text-primary" /> Crop Distribution
                        </h2>
                    </div>
                    <div className="p-6 space-y-6 flex-1">
                        {filteredStats.map((s, idx) => (
                            <div key={s.crop} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-sm text-foreground">{s.crop}</span>
                                    <span className="text-xs font-black text-primary">{s.farmers.toLocaleString()} <span className="text-muted-foreground">Farmers</span></span>
                                </div>
                                <Progress value={s.farmers / 50000 * 100} className="h-2" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* District Wise Analytics */}
                <div className="lg:col-span-2 bg-card border rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b bg-muted/30 flex items-center justify-between">
                        <h2 className="font-black text-lg flex items-center gap-2 text-foreground">
                            <MapPin className="h-5 w-5 text-primary" /> District Wise Cultivation
                        </h2>
                        <div className="relative w-48">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                            <input type="text" placeholder="Search district..." className="w-full pl-9 pr-3 py-1.5 bg-muted/50 border rounded-lg text-xs focus:ring-1 focus:ring-primary outline-none" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-muted/50 border-b">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-black text-muted-foreground uppercase tracking-widest">District Name</th>
                                    <th className="text-center py-4 px-6 text-xs font-black text-muted-foreground uppercase tracking-widest">Total Registered</th>
                                    <th className="text-center py-4 px-6 text-xs font-black text-muted-foreground uppercase tracking-widest">Primary Crop</th>
                                    <th className="text-right py-4 px-6 text-xs font-black text-muted-foreground uppercase tracking-widest">Growth Trend</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {apDistricts.map(d => (
                                    <tr key={d.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="py-4 px-6 font-bold text-foreground">{d.name}</td>
                                        <td className="py-4 px-6 text-center font-black text-primary">{d.farmers.toLocaleString()}</td>
                                        <td className="py-4 px-6 text-center">
                                            <span className="bg-muted font-bold text-[10px] px-2.5 py-1 rounded-full text-foreground border border-border">
                                                {d.name === 'Tirupati' ? 'Tomato' : d.name === 'Anantapur' ? 'Onion' : 'Banana'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right font-black text-emerald-600 flex items-center justify-end gap-1">
                                            +12% <ArrowUpRight className="h-3 w-3" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-muted/10 border-t flex justify-center shadow-inner">
                        <Button variant="ghost" size="sm" className="text-xs font-bold text-primary hover:bg-primary/5">View Full District Report</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StateCultivationAnalytics;
