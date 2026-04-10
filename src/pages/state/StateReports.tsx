import { useState, useMemo } from "react";
import { FileText, Download, BarChart2, PieChart as PieChartIcon, Calendar, MapPin, Globe, Filter, ChevronRight, CheckCircle2, TrendingUp, Layers, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apDistricts, stateCrops } from "@/data/stateDummyData";

const reportTypes = [
  { id: "production", name: "State Production Audit", icon: <Layers className="h-4 w-4" />, desc: "Harvest cultivation spread & yield analytics" },
  { id: "mandi", name: "State Mandi Performance", icon: <BarChart2 className="h-4 w-4" />, desc: "Trade volumes & revenue across all AP districts" },
  { id: "intel", name: "Global Price Intelligence", icon: <Globe className="h-4 w-4" />, desc: "Cross-market scope price comparison trends" },
  { id: "farmer", name: "Farmer Engagement Audit", icon: <Users className="h-4 w-4" />, desc: "Onboarding and support resolution metrics" },
];

const StateReports = () => {
  const [selectedReport, setSelectedReport] = useState("production");
  const [district, setDistrict] = useState("all");

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header flex items-center gap-2"><FileText className="h-7 w-7 text-primary" /> Multi-Domain Reports</h1>
          <p className="page-subtitle">Generate and export comprehensive intelligence reports for state-level monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report Selection */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Report Types</h3>
            </div>
            <div className="flex flex-col">
              {reportTypes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReport(r.id)}
                  className={`w-full text-left p-4 border-b last:border-0 transition-all hover:bg-muted/50 flex flex-col gap-1 ${selectedReport === r.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={selectedReport === r.id ? 'text-primary' : 'text-muted-foreground'}>{r.icon}</span>
                    <span className={`font-bold text-sm ${selectedReport === r.id ? 'text-primary' : 'text-foreground'}`}>{r.name}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Quick Export
            </h4>
            <p className="text-xs text-primary/70 mb-4">Download the latest consolidated state summary for current Q4.</p>
            <Button className="w-full bg-primary hover:bg-primary/90 text-xs font-black uppercase tracking-widest h-10">
              <Download className="h-3.5 w-3.5 mr-2" /> PDF Summary
            </Button>
          </div>
        </div>

        {/* Report Preview / Configuration */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card border rounded-2xl shadow-sm p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-dashed">
              <div>
                <h3 className="text-2xl font-black text-foreground">
                  {reportTypes.find(r => r.id === selectedReport)?.name} Preview
                </h3>
                <p className="text-sm text-muted-foreground">Andhra Pradesh Department of Horticulture – Official Internal Report</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-10 font-bold text-xs border-primary/20"><Download className="h-4 w-4 mr-2" /> CSV</Button>
                <Button variant="outline" className="h-10 font-bold text-xs border-primary/20"><Download className="h-4 w-4 mr-2" /> EXCEL</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Market / Regional Filter</label>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setDistrict("all")} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${district === "all" ? 'bg-primary text-white border-primary' : 'bg-muted/50 border-border hover:bg-muted'}`}>All Districts (AP)</button>
                  {apDistricts.slice(0, 3).map(d => (
                    <button key={d.id} onClick={() => setDistrict(d.name)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${district === d.name ? 'bg-primary text-white border-primary' : 'bg-muted/50 border-border hover:bg-muted'}`}>{d.name}</button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Crop Selection</label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 rounded-xl text-xs font-bold border bg-primary text-white border-primary">All State Crops</button>
                  {stateCrops.map(c => (
                    <button key={c.id} className="px-4 py-2 rounded-xl text-xs font-bold border bg-muted/50 border-border hover:bg-muted flex items-center gap-2">
                      {c.image ? <img src={c.image} alt={c.name} className="w-4 h-4 rounded-full object-cover" /> : c.icon} 
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Filter className="h-4 w-4" /> Component Preview
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-video bg-muted/30 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-6">
                  <BarChart2 className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-bold text-muted-foreground">Distribution Visualization Preview</p>
                  <p className="text-[10px] font-medium text-muted-foreground/60 mt-1">Dynamic charts will be injected into {selectedReport}.pdf</p>
                </div>
                <div className="aspect-video bg-muted/30 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-6">
                  <PieChartIcon className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-bold text-muted-foreground">Volume Concentration Map Preview</p>
                  <p className="text-[10px] font-medium text-muted-foreground/60 mt-1">Statistical clusters based on {district} data</p>
                </div>
              </div>

              <div className="p-1.5 rounded-2xl bg-primary/5 border border-primary/10">
                <table className="w-full text-xs">
                  <thead className="bg-primary/10">
                    <tr>
                      <th className="py-2 px-4 text-left font-black uppercase tracking-wider text-primary">Data Column</th>
                      <th className="py-2 px-4 text-center font-black uppercase tracking-wider text-primary">Sample Value</th>
                      <th className="py-2 px-4 text-right font-black uppercase tracking-wider text-primary">Metric Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-primary/5">
                      <td className="py-2.5 px-4 font-bold">Consolidated Yield</td>
                      <td className="py-2.5 px-4 text-center font-bold">14.2 MT/Acre</td>
                      <td className="py-2.5 px-4 text-right"><span className="text-[10px] font-black bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-md uppercase">Stable</span></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold">Mandi Throughput</td>
                      <td className="py-2.5 px-4 text-center font-bold">8,450 MT</td>
                      <td className="py-2.5 px-4 text-right"><span className="text-[10px] font-black bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-md uppercase">Rising</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button className="h-14 px-10 rounded-2xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 font-black uppercase tracking-widest">
                Generate Full Executive Report <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateReports;
