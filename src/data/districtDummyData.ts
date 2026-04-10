import { crops as baseCrops, mandisTirupati, mandalsOfTirupati } from "./dummyData";

export type MarketScope = "district" | "state" | "other_states" | "international";

// Exclude Mango, add Onion default. Base crops already has Onion, but let's filter out mango.
export const districtCrops = baseCrops.filter(c => c.id !== "mango");

export const marketScopes = [
    { id: "district", name: "District Markets" },
    { id: "state", name: "State Markets" },
    { id: "other_states", name: "Other States Markets" },
    { id: "international", name: "International Markets" },
];

export const getBasePrice = (cropId: string, scope: MarketScope = "district") => {
    const basePrices: Record<string, number> = {
        tomato: 28,
        onion: 22,
        banana: 32,
        chilli: 120,
        papaya: 18,
    };

    const base = basePrices[cropId] || 30;

    if (scope === "state") return base * 1.1;
    if (scope === "other_states") return base * 1.25;
    if (scope === "international") return base * 3.5;
    return base;
};

export const cultivationData = [
    { crop: "Tomato", farmers: 4200, area: 8500, production: 12000 },
    { crop: "Onion", farmers: 3100, area: 6200, production: 9500 },
    { crop: "Banana", farmers: 2100, area: 4100, production: 15000 },
    { crop: "Chilli", farmers: 1800, area: 3600, production: 4200 },
    { crop: "Papaya", farmers: 1200, area: 2400, production: 5800 },
];

export const cultivationByMandal = mandalsOfTirupati.map(m => ({
    mandal: m.name,
    tomato: Math.round(m.farmers * 0.4),
    onion: Math.round(m.farmers * 0.3),
    banana: Math.round(m.farmers * 0.15),
    chilli: Math.round(m.farmers * 0.1),
    papaya: Math.round(m.farmers * 0.05),
}));

export const getMarketPrices = (scope: MarketScope, cropId: string) => {
    if (scope === "district") {
        return [
            { mandi: "Madanapalle Mandi", price: getBasePrice(cropId, scope), trend: "up", demand: "high", time: "10 mins ago" },
            { mandi: "Tirupati Mandi", price: getBasePrice(cropId, scope) - 2, trend: "up", demand: "high", time: "25 mins ago" },
            { mandi: "Pakala Mandi", price: getBasePrice(cropId, scope) - 4, trend: "stable", demand: "medium", time: "1 hour ago" },
            { mandi: "Chandragiri Mandi", price: getBasePrice(cropId, scope) - 1, trend: "down", demand: "medium", time: "45 mins ago" },
        ];
    } else if (scope === "state") {
        return [
            { mandi: "Guntur Market", price: getBasePrice(cropId, scope), trend: "up", demand: "high", time: "15 mins ago" },
            { mandi: "Kurnool Market", price: getBasePrice(cropId, scope) - 3, trend: "stable", demand: "medium", time: "30 mins ago" },
            { mandi: "Adoni Market", price: getBasePrice(cropId, scope) + 2, trend: "up", demand: "high", time: "50 mins ago" },
            { mandi: "Vijayawada Market", price: getBasePrice(cropId, scope) + 5, trend: "down", demand: "high", time: "1 hour ago" },
        ];
    } else if (scope === "other_states") {
        return [
            { mandi: "Kolar (KA)", price: getBasePrice(cropId, scope), trend: "up", demand: "high", time: "20 mins ago" },
            { mandi: "Chennai (TN)", price: getBasePrice(cropId, scope) + 4, trend: "up", demand: "high", time: "40 mins ago" },
            { mandi: "Hyderabad (TS)", price: getBasePrice(cropId, scope) + 2, trend: "stable", demand: "medium", time: "1 hour ago" },
            { mandi: "Bangalore (KA)", price: getBasePrice(cropId, scope) + 6, trend: "up", demand: "high", time: "1.5 hours ago" },
        ];
    } else {
        return [
            { mandi: "Dubai Wholesale", price: getBasePrice(cropId, scope), trend: "up", demand: "high", time: "2 hours ago" },
            { mandi: "Singapore Market", price: getBasePrice(cropId, scope) * 1.2, trend: "stable", demand: "high", time: "3 hours ago" },
            { mandi: "Malaysia Central", price: getBasePrice(cropId, scope) * 0.9, trend: "up", demand: "medium", time: "4 hours ago" },
            { mandi: "Europe Export", price: getBasePrice(cropId, scope) * 1.5, trend: "up", demand: "high", time: "6 hours ago" },
        ];
    }
};
