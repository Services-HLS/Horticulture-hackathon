import { crops as baseCrops } from "./dummyData";

export type StateMarketScope = "state" | "other_states" | "international";

export const stateCrops = baseCrops.filter(c => c.id !== "mango");

export const stateMarketScopes = [
    { id: "state", name: "Andhra Pradesh Markets" },
    { id: "other_states", name: "Other States Markets" },
    { id: "international", name: "International Markets" },
];

export const apDistricts = [
    { id: "tirupati", name: "Tirupati", farmers: 12500, mandis: 12, production: 45000 },
    { id: "chittoor", name: "Chittoor", farmers: 10800, mandis: 10, production: 38000 },
    { id: "anantapur", name: "Anantapur", farmers: 15200, mandis: 15, production: 52000 },
    { id: "kurnool", name: "Kurnool", farmers: 13400, mandis: 14, production: 41000 },
    { id: "nellore", name: "Nellore", farmers: 9200, mandis: 8, production: 29000 },
];

export const getStateBasePrice = (cropId: string, scope: StateMarketScope = "state") => {
    const basePrices: Record<string, number> = {
        tomato: 28,
        onion: 22,
        banana: 32,
        chilli: 120,
        papaya: 18,
    };

    const base = basePrices[cropId] || 30;

    if (scope === "state") return base;
    if (scope === "other_states") return base * 1.25;
    if (scope === "international") return base * 3.5;
    return base;
};

export const stateCultivationStats = [
    { crop: "Tomato", farmers: 45000, area: 120000, production: 250000 },
    { crop: "Onion", farmers: 38000, area: 95000, production: 180000 },
    { crop: "Banana", farmers: 28000, area: 72000, production: 310000 },
    { crop: "Chilli", farmers: 22000, area: 55000, production: 85000 },
    { crop: "Papaya", farmers: 15000, area: 38000, production: 110000 },
];

export const cultivationByDistrict = apDistricts.map(d => ({
    district: d.name,
    tomato: Math.round(d.farmers * 0.35),
    onion: Math.round(d.farmers * 0.25),
    banana: Math.round(d.farmers * 0.2),
    chilli: Math.round(d.farmers * 0.15),
    papaya: Math.round(d.farmers * 0.05),
}));

export const getMarketPrices = (scope: StateMarketScope, cropId: string) => {
    if (scope === "state") {
        return [
            { market: "Guntur Yard", location: "Guntur", price: getStateBasePrice(cropId, scope) + 2, trend: "up", demand: "high", time: "15 mins ago" },
            { market: "Kurnool Mandi", location: "Kurnool", price: getStateBasePrice(cropId, scope) - 1, trend: "stable", demand: "medium", time: "30 mins ago" },
            { market: "Tirupati Market", location: "Tirupati", price: getStateBasePrice(cropId, scope) + 1, trend: "up", demand: "high", time: "1 hour ago" },
            { market: "Nellore Yard", location: "Nellore", price: getStateBasePrice(cropId, scope) - 2, trend: "down", demand: "medium", time: "2 hours ago" },
            { market: "Adoni Mandi", location: "Kurnool", price: getStateBasePrice(cropId, scope) + 3, trend: "up", demand: "high", time: "45 mins ago" },
        ];
    } else if (scope === "other_states") {
        return [
            { market: "Kolar Market", location: "Karnataka", price: getStateBasePrice(cropId, scope) + 5, trend: "up", demand: "high", time: "20 mins ago" },
            { market: "Koyambedu", location: "Tamil Nadu", price: getStateBasePrice(cropId, scope) + 8, trend: "up", demand: "high", time: "40 mins ago" },
            { market: "Malakpet", location: "Telangana", price: getStateBasePrice(cropId, scope) + 4, trend: "stable", demand: "medium", time: "1 hour ago" },
            { market: "Bangalore City", location: "Karnataka", price: getStateBasePrice(cropId, scope) + 12, trend: "up", demand: "high", time: "1.5 hours ago" },
        ];
    } else {
        return [
            { market: "Dubai Wholesale", location: "UAE", price: getStateBasePrice(cropId, scope) + 45, trend: "up", demand: "high", time: "3 hours ago" },
            { market: "Singapore Market", location: "Singapore", price: getStateBasePrice(cropId, scope) + 65, trend: "stable", demand: "high", time: "5 hours ago" },
            { market: "Malaysia Central", location: "Malaysia", price: getStateBasePrice(cropId, scope) + 35, trend: "up", demand: "medium", time: "6 hours ago" },
            { market: "Munich Market", location: "Germany", price: getStateBasePrice(cropId, scope) + 120, trend: "up", demand: "high", time: "12 hours ago" },
        ];
    }
};

export const stateDemandAlerts = [
    { id: 1, scope: "state", crop: "Tomato", type: "Priority Demand", message: "Heavy demand surge in Guntur districts. Supply levels below 40%.", time: "1 hour ago", severity: "high", mandi: "Guntur Yard" },
    { id: 2, scope: "state", crop: "Onion", type: "Supply Alert", message: "Onion arrivals from Kurnool increasing by 15% daily. Prices may stabilize.", time: "2 hours ago", severity: "medium", mandi: "Kurnool Mandi" },
    { id: 3, scope: "other_states", crop: "Banana", type: "Market Opportunity", message: "High demand recorded in Karnataka markets. AP farmers can fetch 20% premium.", time: "4 hours ago", severity: "high", mandi: "Kolar Market" },
    { id: 4, scope: "international", crop: "Onion", type: "Export Demand", message: "Dubai markets showing extreme shortage of quality Grade A Onion. High export potential.", time: "6 hours ago", severity: "high", mandi: "Dubai Wholesale" },
    { id: 5, scope: "state", crop: "Chilli", type: "Weather Alert", message: "Unseasonal rain predicted in chilli clusters. Potential impact on harvest quality.", time: "8 hours ago", severity: "medium", mandi: "Tirupati Market" },
];
