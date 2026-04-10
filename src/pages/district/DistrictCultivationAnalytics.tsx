import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { districtCrops, cultivationData, cultivationByMandal } from "@/data/districtDummyData";
import { Sprout, Users, Map, BarChart3 } from "lucide-react";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function DistrictCultivationAnalytics() {
    const [selectedCrop, setSelectedCrop] = useState("all");

    const totalFarmers = cultivationData.reduce((acc, curr) => acc + curr.farmers, 0);
    const totalArea = cultivationData.reduce((acc, curr) => acc + curr.area, 0);

    const filteredCultivationByMandal = cultivationByMandal.map(m => ({
        mandal: m.mandal,
        farmers: selectedCrop === "all"
            ? m.tomato + m.onion + m.banana + m.chilli + m.papaya
            : (m as any)[selectedCrop]
    }));

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Crop Cultivation Analytics</h1>
                    <p className="text-muted-foreground">Detailed statistics of crop cultivation across Tirupati District.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Crop Filter:</span>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Crop" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Crops</SelectItem>
                            {districtCrops.map(crop => (
                                <SelectItem key={crop.id} value={crop.id}>
                                    <div className="flex items-center gap-2">
                                        {crop.image ? <img src={crop.image} alt={crop.name} className="w-5 h-5 rounded-full object-cover" /> : crop.icon}
                                        {crop.name}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-green-800">Total Cultivating Farmers</CardTitle>
                        <Users className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-900">{totalFarmers.toLocaleString()}</div>
                        <p className="text-xs text-green-600 mt-1">Across 5 mandals</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-blue-800">Total Area Under Cultivation</CardTitle>
                        <Map className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">{totalArea.toLocaleString()} Acres</div>
                        <p className="text-xs text-blue-600 mt-1">+4.5% from last season</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-orange-800">Active Crop Varieties</CardTitle>
                        <Sprout className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-900">12 Varieties</div>
                        <p className="text-xs text-orange-600 mt-1">Focusing on high-yield</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-purple-800">Est. Production Value</CardTitle>
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-900">₹42.5 Cr</div>
                        <p className="text-xs text-purple-600 mt-1">Projected for current cycle</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-slate-200 shadow-md">
                    <CardHeader>
                        <CardTitle>Crop Distribution (Farmers)</CardTitle>
                        <CardDescription>Percentage of farmers cultivating each crop in the district.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={cultivationData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="farmers"
                                    nameKey="crop"
                                >
                                    {cultivationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-md">
                    <CardHeader>
                        <CardTitle>Cultivation by Mandal</CardTitle>
                        <CardDescription>Number of farmers {selectedCrop === "all" ? "across all crops" : `cultivating ${selectedCrop}`} per mandal.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={filteredCultivationByMandal}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="mandal" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="farmers" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-slate-200 shadow-md overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                    <CardTitle>District Cultivation Summary Table</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-600 text-sm uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4 border-b border-slate-200">Crop Name</th>
                                    <th className="px-6 py-4 border-b border-slate-200">Farmers Engaged</th>
                                    <th className="px-6 py-4 border-b border-slate-200">Cultivation Area (Acres)</th>
                                    <th className="px-6 py-4 border-b border-slate-200">Projected Production (MT)</th>
                                    <th className="px-6 py-4 border-b border-slate-200">District Market Presence</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 italic">
                                {cultivationData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 not-italic">{row.crop}</td>
                                        <td className="px-6 py-4 text-slate-700">{row.farmers.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-slate-700">{row.area.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-slate-700">{row.production.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Strong
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
