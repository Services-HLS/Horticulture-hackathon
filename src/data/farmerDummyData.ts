import { crops as baseCrops, cropPrices as basePrices, aiInsights as baseInsights } from "./dummyData";

export type MarketScope = "district" | "state" | "other_states" | "international";

// Filter out Mango for farmers
export const farmerCrops = baseCrops.filter(c => c.id !== "mango");

export const mandisByScope: Record<MarketScope, any[]> = {
    district: [
        { id: "madanapalle", name: "Madanapalle Mandi", location: "Chandragiri", distance: 12 },
        { id: "tirupati-mandi", name: "Tirupati Mandi", location: "Tirupati Rural", distance: 5 },
        { id: "pakala", name: "Pakala Mandi", location: "Pakala", distance: 18 },
        { id: "chandragiri", name: "Chandragiri Mandi", location: "Chandragiri", distance: 15 },
    ],
    state: [
        { id: "guntur", name: "Guntur Market", location: "Guntur", distance: 350 },
        { id: "vijayawada", name: "Vijayawada Market", location: "NTR District", distance: 410 },
        { id: "kurnool", name: "Kurnool Market", location: "Kurnool", distance: 340 },
        { id: "anantapur", name: "Anantapur Market", location: "Anantapur", distance: 280 },
    ],
    other_states: [
        { id: "bengaluru", name: "Bengaluru Wholesale", location: "Karnataka", distance: 250 },
        { id: "chennai", name: "Koyambedu Market", location: "Tamil Nadu", distance: 150 },
        { id: "hyderabad", name: "Bowenpally Market", location: "Telangana", distance: 550 },
        { id: "pune", name: "Pune APMC", location: "Maharashtra", distance: 850 },
    ],
    international: [
        { id: "dubai", name: "Dubai Al Aweer", location: "UAE", distance: 3000 },
        { id: "singapore", name: "Pasir Panjang", location: "Singapore", distance: 2900 },
        { id: "malaysia", name: "Kuala Lumpur Market", location: "Malaysia", distance: 2700 },
        { id: "london", name: "New Spitalfields", location: "UK", distance: 8000 },
    ]
};

const getBaseCurrentPrice = (cropId: string) => {
    return basePrices[cropId] ? basePrices[cropId][0].price : 30;
}

export const getPricesForScope = (cropId: string, scope: MarketScope) => {
    const mandis = mandisByScope[scope];
    const basePrice = getBaseCurrentPrice(cropId);
    const multiplier = scope === "international" ? 3.5 : scope === "other_states" ? 1.4 : scope === "state" ? 1.1 : 1.0;

    return mandis.map((m, i) => {
        const rawPrice = basePrice * multiplier;
        const priceVar = Math.round(rawPrice + (Math.random() * 10 - 5));
        const prevVar = Math.round(rawPrice + (Math.random() * 10 - 5));
        return {
            mandi: m.name,
            location: m.location,
            distance: m.distance,
            price: priceVar,
            prevPrice: prevVar,
            unit: scope === "international" ? "₹/kg (Eq)" : "₹/kg",
            demandLevel: priceVar > prevVar ? "High" : priceVar === prevVar ? "Normal" : "Low"
        };
    });
};

export const getAlertsForScope = (scope: MarketScope, selectedCrops: string[]) => {
    let locationText = scope === "district" ? "Madanapalle mandi" : scope === "state" ? "Guntur markets" : scope === "other_states" ? "Tamil Nadu wholesale markets" : "Dubai markets";

    return [
        { id: 1, crop: "Tomato", type: "High Demand", severity: "high" as const, mandi: mandisByScope[scope][0].name, message: `High demand for tomatoes in ${locationText} today.`, messageTE: `${locationText} లో టమాటాలకు ఎక్కువ డిమాండ్.`, time: "2 hours ago" },
        { id: 2, crop: "Onion", type: "Rising Demand", severity: "high" as const, mandi: mandisByScope[scope][1 % mandisByScope[scope].length].name, message: `Onion demand increasing in ${scope === 'international' ? 'export' : scope === 'other_states' ? 'nearby states' : scope} markets.`, messageTE: `ఉల్లిపాయ డిమాండ్ పెరుగుతోంది.`, time: "4 hours ago" },
        { id: 3, crop: "Banana", type: "Stable", severity: "low" as const, mandi: mandisByScope[scope][2 % mandisByScope[scope].length].name, message: `Banana market stable across ${scope.replace('_', ' ')}.`, messageTE: `అరటి మార్కెట్ స్థిరంగా ఉంది.`, time: "1 day ago" },
        { id: 4, crop: "Chilli", type: "Price Drop", severity: "medium" as const, mandi: mandisByScope[scope][3 % mandisByScope[scope].length].name, message: `Chilli arrivals surged - expect price correction.`, messageTE: `మిరపకాయ రాకలు పెరిగాయి.`, time: "6 hours ago" },
    ];
};

export const getTrendsForScope = (cropId: string, scope: MarketScope, days: number = 7) => {
    const basePrice = getBaseCurrentPrice(cropId);
    const multiplier = scope === "international" ? 3.5 : scope === "other_states" ? 1.4 : scope === "state" ? 1.1 : 1.0;

    return Array.from({ length: days }, (_, i) => ({
        day: `Day ${i + 1}`,
        price: Math.round(basePrice * multiplier + (Math.random() - 0.4) * 8),
    }));
};

export const getPredictionsForScope = (cropId: string, scope: MarketScope) => {
    const basePrice = getBaseCurrentPrice(cropId);
    const multiplier = scope === "international" ? 3.5 : scope === "other_states" ? 1.4 : scope === "state" ? 1.1 : 1.0;

    return Array.from({ length: 15 }, (_, i) => ({
        day: `Day ${i + 1}`,
        actual: i < 7 ? Math.round(basePrice * multiplier + (Math.random() - 0.4) * 6) : undefined,
        predicted: Math.round(basePrice * multiplier + (i - 3) * (Math.random() > 0.5 ? 0.8 : -0.3) + (Math.random() - 0.5) * 3),
    }));
};

export const getRecommendationsForScope = (scope: MarketScope, crops: string[]) => {
    const mandis = mandisByScope[scope];
    return mandis.map((m, i) => {
        const crop = ["Tomato", "Onion", "Banana", "Chilli", "Papaya"][i % 5];
        const basePrice = getBaseCurrentPrice(crop.toLowerCase());
        const multiplier = scope === "international" ? 3.5 : scope === "other_states" ? 1.4 : scope === "state" ? 1.1 : 1.0;

        return {
            mandi: m.name,
            location: m.location,
            crop: crop,
            price: Math.round(basePrice * multiplier + Math.random() * 10),
            demand: "High",
            distance: m.distance,
            recommendation: scope === "district" ? "Best price nearby" : scope === "state" ? "High demand within state" : scope === "other_states" ? "Higher price than local" : "Export market opportunity",
            recommendationTE: "ఉత్తమ ధర"
        };
    });
};

export const voiceResponsesByScope: Record<string, Record<MarketScope, { en: string; te: string }>> = {
    "tomato price": {
        district: { en: "Today's tomato price is ₹28/kg at Madanapalle Mandi.", te: "ఈ రోజు టమాటా ధర మదనపల్లి మండిలో కిలోకు ₹28." },
        state: { en: "Tomato price is ₹32/kg in Guntur Market.", te: "గుంటూరు మార్కెట్‌లో టమాటా ధర కిలోకు ₹32." },
        other_states: { en: "Tomato price is ₹38/kg in Bengaluru Wholesale.", te: "బెంగళూరులో టమాటా ధర కిలోకు ₹38." },
        international: { en: "Tomato export price is ₹90/kg in Dubai.", te: "దుబాయ్‌లో టమాటా ఎగుమతి ధర కిలోకు ₹90." }
    },
    "onion price": {
        district: { en: "Onion is ₹22/kg in Tirupati Mandi.", te: "తిరుపతి మండిలో ఉల్లిపాయ కిలోకు ₹22." },
        state: { en: "Onion is ₹26/kg in Kurnool Market.", te: "కర్నూలులో ఉల్లిపాయ కిలోకు ₹26." },
        other_states: { en: "Onion price in Karnataka is ₹32/kg.", te: "కర్ణాటకలో ఉల్లిపాయ ధర కిలోకు ₹32." },
        international: { en: "Onion export demand in Malaysia is high, price ₹75/kg.", te: "మలేషియాలో ఉల్లిపాయ ఎగుమతి ధర కిలోకు ₹75." }
    },
    "best market": {
        district: { en: "Best nearby is Madanapalle for Tomatoes.", te: "టమాటాలకు మదనపల్లి మండి ఉత్తమం." },
        state: { en: "Guntur is best in AP for Tomatoes.", te: "ఏపీలో టమాటాలకు గుంటూరు ఉత్తమం." },
        other_states: { en: "Bengaluru offers the highest price currently.", te: "ప్రస్తుతం బెంగళూరులో అత్యధిక ధర ఉంది." },
        international: { en: "Dubai is the best export market right now.", te: "దుబాయ్ ప్రస్తుతం ఉత్తమ ఎగుమతి మార్కెట్." }
    }
};
