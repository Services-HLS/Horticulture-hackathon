import { useState } from "react";
import { apDistricts, stateCrops } from "@/data/stateDummyData";
import { Users, Search, Filter, MessageSquare, Phone, Mail, ChevronRight, CheckCircle2, MapPin, Activity, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StateFarmerEngagement = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("all");

  const farmers = [
    { id: 1, name: "Ramesh Kumar", district: "Kurnool", crop: "Onion", status: "Active", regDate: "2024-01-15", engagement: "High" },
    { id: 2, name: "Suresh Reddy", district: "Anantapur", crop: "Banana", status: "Active", regDate: "2024-01-20", engagement: "Medium" },
    { id: 3, name: "Gopal Rao", district: "Chittoor", crop: "Tomato", status: "Needs Support", regDate: "2024-02-01", engagement: "Low" },
    { id: 4, name: "Kiran Dev", district: "Vizianagaram", crop: "Potato", status: "Active", regDate: "2024-02-10", engagement: "High" },
    { id: 5, name: "Venkatesh P.", district: "Kurnool", crop: "Onion", status: "Active", regDate: "2024-02-15", engagement: "Medium" },
  ];

  const filteredFarmers = selectedDistrict === "all"
    ? farmers
    : farmers.filter(f => f.district === selectedDistrict);

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header flex items-center gap-2"><Users className="h-7 w-7 text-primary" /> Farmer Activity & Support</h1>
          <p className="page-subtitle">Monitoring farmer engagement, support tickets, and advisory distribution</p>
        </div>
        <Button className="font-black text-xs uppercase tracking-widest px-6 h-11 shadow-lg bg-primary hover:bg-primary/90">
          <MessageSquare className="h-4 w-4 mr-2" /> Broadcast Advisory
        </Button>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="kpi-card">
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Onboarded</p>
          <h3 className="text-2xl font-black">1.2M</h3>
          <div className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> +12k this month
          </div>
        </div>
        <div className="kpi-card">
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-1">Active Queries</p>
          <h3 className="text-2xl font-black">1.4k</h3>
          <div className="mt-2 text-xs font-bold text-amber-600 flex items-center gap-1">
            <Activity className="h-3 w-3" /> 85 Urgent
          </div>
        </div>
        <div className="kpi-card">
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-1">Support Resolution</p>
          <h3 className="text-2xl font-black">94%</h3>
          <div className="mt-2 text-xs font-bold text-primary flex items-center gap-1">
            <Activity className="h-3 w-3" /> Avg 4.2h response
          </div>
        </div>
        <div className="kpi-card">
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-1">Engagement Rate</p>
          <h3 className="text-2xl font-black">68%</h3>
          <div className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
            <Activity className="h-3 w-3" /> Up 5% from Q3
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search by name, ID, or phone..." className="w-full pl-10 pr-4 py-2 bg-muted/30 border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
        </div>

        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="w-full md:w-56 h-10 border-primary/20 bg-muted/10 font-bold text-xs"><SelectValue placeholder="All Districts" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All AP Districts</SelectItem>
            {apDistricts.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
          </SelectContent>
        </Select>

        <Button variant="outline" className="w-full md:w-auto font-black text-xs uppercase tracking-widest px-6 h-10 border-primary/20">
          <Filter className="h-4 w-4 mr-2" /> More Filters
        </Button>
      </div>

      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-muted/30 flex justify-between items-center">
          <h3 className="font-bold">Recent Farmer Activities</h3>
          <span className="text-xs font-bold text-muted-foreground">Showing {filteredFarmers.length} of 1,240,000</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Farmer Information</th>
                <th className="text-center py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Location / District</th>
                <th className="text-center py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Primary Crop</th>
                <th className="text-center py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Support Status</th>
                <th className="text-right py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredFarmers.map((f) => {
                const cropObj = stateCrops.find(c => c.name === f.crop);
                const isNeedsSupport = f.status === "Needs Support";

                return (
                  <tr key={f.id} className="hover:bg-muted/20 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                          {f.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold">{f.name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">ID: #FRMR-2024-{f.id}00</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                        <MapPin className="h-3 w-3 text-primary" /> {f.district}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-muted text-[10px] font-black px-2 py-1 rounded-full border border-border">
                        {cropObj?.icon} {f.crop}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className={`mx-auto w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isNeedsSupport ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                        {f.status}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-blue-500/10 rounded-lg text-blue-600 transition-colors" title="Call">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-emerald-500/10 rounded-lg text-emerald-600 transition-colors" title="Email">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-muted/10 border-t flex justify-center">
          <Button variant="ghost" className="font-black text-[10px] uppercase tracking-widest text-primary hover:bg-primary/5">
            View Central Farmer Registry (AP)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StateFarmerEngagement;
