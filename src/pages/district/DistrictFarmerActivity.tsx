import { useState } from "react";
import { farmerEngagement, mandalsOfTirupati } from "@/data/dummyData";
import { marketScopes, MarketScope } from "@/data/districtDummyData";
import KPICard from "@/components/KPICard";
import { Users, Eye, Bell, Mic, Smartphone, BarChart3, Clock, ArrowUpRight, Globe, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DistrictFarmerActivity = () => {
  const [scope, setScope] = useState<MarketScope>("district");

  return (
    <div className="space-y-6 animate-slide-in pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-header flex items-center gap-2"><Smartphone className="h-7 w-7 text-primary" /> Engagement & Activity</h1>
          <p className="page-subtitle">Detailed platform engagement metrics and usage trends by farmers and buyers</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={scope} onValueChange={(v) => setScope(v as MarketScope)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {marketScopes.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {scope === "district" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Price Checks (Today)" value={farmerEngagement.priceChecks.toLocaleString()} icon={<Eye className="h-5 w-5" />} change={8} />
            <KPICard title="Alerts Delivered" value={farmerEngagement.alertsReceived.toLocaleString()} icon={<Bell className="h-5 w-5" />} change={3} />
            <KPICard title="Voice AI Interactions" value={farmerEngagement.voiceQueries.toLocaleString()} icon={<Mic className="h-5 w-5" />} change={22} />
            <KPICard title="App Downloads" value={farmerEngagement.appDownloads.toLocaleString()} icon={<Smartphone className="h-5 w-5" />} change={12} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="dashboard-chart flex flex-col h-full">
              <h3 className="font-bold text-lg mb-2 flex items-center justify-between">
                Weekly Active Users
                <span className="text-xs bg-muted px-2 py-1 flex items-center gap-1 rounded font-semibold text-muted-foreground"><Clock className="h-3 w-3" /> Last 7 Days</span>
              </h3>
              <p className="text-xs text-muted-foreground mb-4">Tracking daily log-ins and interactions across the district.</p>
              <div className="flex-1 min-h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={farmerEngagement.weeklyActive}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" name="Active Farmers" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-chart flex flex-col h-full">
              <h3 className="font-bold text-lg mb-2 flex items-center justify-between">
                Activity Distribution Across Mandals
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold flex items-center gap-1"><Users className="h-3 w-3" /> Live Demographics</span>
              </h3>
              <p className="text-xs text-muted-foreground mb-4">Volume of active registered users grouped by their registered mandal area.</p>
              <div className="flex-1 min-h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mandalsOfTirupati} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" fontSize={12} tickLine={false} axisLine={false} width={100} />
                    <Tooltip cursor={{ fill: 'var(--muted)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="farmers" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Registered Farmers" barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-card to-muted/30 p-6 rounded-xl border flex flex-col sm:flex-row items-center gap-6 shadow-sm">
            <div className="bg-primary/10 p-4 rounded-full flex-shrink-0">
              <Mic className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1 tracking-tight">Voice Assistant Adoption is Soaring</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">Voice-based AI query usage grew by <span className="text-primary font-bold">22%</span> this week. A high proportion of queries are regarding "Tomato Prices in Madanapalle" and "Weather forecasts." Our efforts in providing Telugu audio intelligence are effectively reaching lower-literacy farming communities.</p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-3 py-1 bg-background border rounded-lg shadow-sm flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5 text-muted-foreground" /> 1,230 Queries Today</span>
                <span className="px-3 py-1 bg-background border rounded-lg shadow-sm flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5 text-muted-foreground" /> 85% Mobile Usage</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Market Inquiries" value="4,250" icon={<Eye className="h-5 w-5" />} change={15} />
            <KPICard title="Trader Registrations" value="128" icon={<Users className="h-5 w-5" />} change={5} />
            <KPICard title="Price Alerts Sent" value="12,400" icon={<Bell className="h-5 w-5" />} change={10} />
            <KPICard title="Export Inquiries" value="84" icon={<Globe className="h-5 w-5" />} change={30} />
          </div>

          <div className="dashboard-chart">
            <h3 className="font-bold text-lg mb-4">Market Sentiment Index - Global Trends</h3>
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-xl border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm">Dubai Market Opportunity</span>
                  <span className="text-xs font-bold text-destructive flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Very High Demand</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-destructive h-full" style={{ width: '85%' }}></div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground italic">Sentiment scores indicate high willingness to pay premium for Organic Onion varieties from Andhra Pradesh.</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-xl border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm">Domestic Wholesale (Chennai/Bangalore)</span>
                  <span className="text-xs font-bold text-primary flex items-center gap-1"><Clock className="h-3 w-3" /> Steady Flow</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '65%' }}></div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground italic">Market depth analysis shows stable absorption of Tomato volumes with minimal price volatility predicted.</p>
              </div>
            </div>
          </div>

          <div className="bg-card border p-6 rounded-xl flex items-center gap-4">
            <div className="bg-amber-500/10 p-3 rounded-full">
              <Globe className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold">Cross-Regional Intelligence</h4>
              <p className="text-sm text-muted-foreground">Market data in this scope is consolidated from regional trading hubs and wholesale networks. Farmer-level demographic statistics are restricted to the Tirupati district scope.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DistrictFarmerActivity;
