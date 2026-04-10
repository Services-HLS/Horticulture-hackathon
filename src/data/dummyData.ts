// ==================== DISTRICTS ====================
export const districts = [
  { id: "tirupati", name: "Tirupati", mandals: 5, mandis: 4, farmers: 12400, activeAlerts: 3 },
  { id: "chittoor", name: "Chittoor", mandals: 6, mandis: 5, farmers: 15200, activeAlerts: 2 },
  { id: "anantapur", name: "Anantapur", mandals: 7, mandis: 4, farmers: 18300, activeAlerts: 4 },
  { id: "kurnool", name: "Kurnool", mandals: 5, mandis: 3, farmers: 11800, activeAlerts: 1 },
  { id: "nellore", name: "Nellore", mandals: 4, mandis: 3, farmers: 9600, activeAlerts: 2 },
];

// ==================== CROPS ====================
export const crops = [
  { id: "tomato", name: "Tomato", nameTE: "టమాటా", icon: "🍅", image: "/images/crops/tomato.png", season: "Rabi" },
  { id: "mango", name: "Mango", nameTE: "మామిడి", icon: "🥭", image: "/images/crops/mango.png", season: "Summer" },
  { id: "banana", name: "Banana", nameTE: "అరటి", icon: "🍌", image: "/images/crops/banana.png", season: "Year-round" },
  { id: "onion", name: "Onion", nameTE: "ఉల్లిపాయ", icon: "🧅", image: "/images/crops/onion.png", season: "Kharif" },
  { id: "chilli", name: "Chilli", nameTE: "మిరపకాయ", icon: "🌶️", image: "/images/crops/chilli.png", season: "Kharif" },
  { id: "papaya", name: "Papaya", nameTE: "బొప్పాయి", icon: "🍈", image: "/images/crops/papaya.png", season: "Year-round" },
];

// ==================== MANDIS (TIRUPATI DISTRICT) ====================
export const mandisTirupati = [
  { id: "madanapalle", name: "Madanapalle Mandi", mandal: "Chandragiri", lat: 13.55, lng: 78.50, distance: 12 },
  { id: "tirupati-mandi", name: "Tirupati Mandi", mandal: "Tirupati Rural", lat: 13.63, lng: 79.42, distance: 5 },
  { id: "pakala", name: "Pakala Mandi", mandal: "Pakala", lat: 13.47, lng: 79.16, distance: 18 },
  { id: "chandragiri", name: "Chandragiri Mandi", mandal: "Chandragiri", lat: 13.58, lng: 79.32, distance: 15 },
];

export const mandalsOfTirupati = [
  { id: "chandragiri", name: "Chandragiri", farmers: 2800, mandis: 2, cropArea: 4200, arrivals: 340 },
  { id: "renigunta", name: "Renigunta", farmers: 2100, mandis: 1, cropArea: 3100, arrivals: 220 },
  { id: "tirupati-rural", name: "Tirupati Rural", farmers: 3200, mandis: 1, cropArea: 5100, arrivals: 410 },
  { id: "pakala", name: "Pakala", farmers: 2400, mandis: 1, cropArea: 3600, arrivals: 280 },
  { id: "yerpedu", name: "Yerpedu", farmers: 1900, mandis: 0, cropArea: 2800, arrivals: 150 },
];

// ==================== PRICE DATA ====================
export const cropPrices: Record<string, { mandi: string; price: number; prevPrice: number; unit: string }[]> = {
  tomato: [
    { mandi: "Madanapalle Mandi", price: 28, prevPrice: 24, unit: "₹/kg" },
    { mandi: "Tirupati Mandi", price: 26, prevPrice: 25, unit: "₹/kg" },
    { mandi: "Pakala Mandi", price: 24, prevPrice: 22, unit: "₹/kg" },
    { mandi: "Chandragiri Mandi", price: 27, prevPrice: 26, unit: "₹/kg" },
  ],
  mango: [
    { mandi: "Madanapalle Mandi", price: 65, prevPrice: 60, unit: "₹/kg" },
    { mandi: "Tirupati Mandi", price: 70, prevPrice: 68, unit: "₹/kg" },
    { mandi: "Pakala Mandi", price: 58, prevPrice: 55, unit: "₹/kg" },
    { mandi: "Chandragiri Mandi", price: 62, prevPrice: 61, unit: "₹/kg" },
  ],
  banana: [
    { mandi: "Madanapalle Mandi", price: 32, prevPrice: 30, unit: "₹/dozen" },
    { mandi: "Tirupati Mandi", price: 35, prevPrice: 33, unit: "₹/dozen" },
    { mandi: "Pakala Mandi", price: 30, prevPrice: 28, unit: "₹/dozen" },
    { mandi: "Chandragiri Mandi", price: 31, prevPrice: 32, unit: "₹/dozen" },
  ],
  onion: [
    { mandi: "Madanapalle Mandi", price: 22, prevPrice: 20, unit: "₹/kg" },
    { mandi: "Tirupati Mandi", price: 24, prevPrice: 23, unit: "₹/kg" },
    { mandi: "Pakala Mandi", price: 20, prevPrice: 19, unit: "₹/kg" },
    { mandi: "Chandragiri Mandi", price: 21, prevPrice: 22, unit: "₹/kg" },
  ],
  chilli: [
    { mandi: "Madanapalle Mandi", price: 120, prevPrice: 115, unit: "₹/kg" },
    { mandi: "Tirupati Mandi", price: 125, prevPrice: 118, unit: "₹/kg" },
    { mandi: "Pakala Mandi", price: 110, prevPrice: 108, unit: "₹/kg" },
    { mandi: "Chandragiri Mandi", price: 118, prevPrice: 120, unit: "₹/kg" },
  ],
  papaya: [
    { mandi: "Madanapalle Mandi", price: 18, prevPrice: 16, unit: "₹/kg" },
    { mandi: "Tirupati Mandi", price: 20, prevPrice: 19, unit: "₹/kg" },
    { mandi: "Pakala Mandi", price: 16, prevPrice: 15, unit: "₹/kg" },
    { mandi: "Chandragiri Mandi", price: 17, prevPrice: 18, unit: "₹/kg" },
  ],
};

// ==================== PRICE TRENDS (7 days) ====================
const generateTrend = (base: number, variance: number, days = 7) =>
  Array.from({ length: days }, (_, i) => ({
    day: `Day ${i + 1}`,
    price: Math.round(base + (Math.random() - 0.4) * variance),
  }));

export const priceTrends: Record<string, { day: string; price: number }[]> = {
  tomato: generateTrend(26, 8),
  mango: generateTrend(65, 12),
  banana: generateTrend(32, 6),
  onion: generateTrend(22, 5),
  chilli: generateTrend(118, 15),
  papaya: generateTrend(18, 4),
};

// ==================== PRICE PREDICTIONS (15 days) ====================
export const pricePredictions: Record<string, { day: string; actual?: number; predicted: number }[]> = Object.fromEntries(
  crops.map(c => {
    const base = cropPrices[c.id][0].price;
    const data = Array.from({ length: 15 }, (_, i) => ({
      day: `Day ${i + 1}`,
      actual: i < 7 ? Math.round(base + (Math.random() - 0.4) * 6) : undefined,
      predicted: Math.round(base + (i - 3) * (Math.random() > 0.5 ? 0.8 : -0.3) + (Math.random() - 0.5) * 3),
    }));
    return [c.id, data];
  })
);

// ==================== MANDI ARRIVALS ====================
export const mandiArrivals = mandisTirupati.map(m => ({
  mandi: m.name,
  tomato: Math.round(100 + Math.random() * 200),
  mango: Math.round(50 + Math.random() * 150),
  banana: Math.round(80 + Math.random() * 120),
  onion: Math.round(60 + Math.random() * 180),
  chilli: Math.round(40 + Math.random() * 100),
  papaya: Math.round(30 + Math.random() * 80),
}));

// ==================== DISTRICT COMPARISON ====================
export const districtComparison = districts.map(d => ({
  district: d.name,
  arrivals: Math.round(800 + Math.random() * 1200),
  avgPrice: Math.round(30 + Math.random() * 20),
  farmers: d.farmers,
  demand: Math.round(60 + Math.random() * 40),
}));

// ==================== DEMAND ALERTS ====================
export const demandAlerts = [
  { id: 1, crop: "Tomato", type: "High Demand", severity: "high" as const, mandi: "Madanapalle Mandi", message: "High demand for tomatoes – price expected to increase by ₹4/kg", messageTE: "టమాటాలకు ఎక్కువ డిమాండ్ – ధర కిలోకు ₹4 పెరుగుతుందని అంచనా", time: "2 hours ago" },
  { id: 2, crop: "Mango", type: "Supply Shortage", severity: "high" as const, mandi: "Tirupati Mandi", message: "Mango supply 30% below normal – prices rising", messageTE: "మామిడి సరఫరా సాధారణం కంటే 30% తక్కువ – ధరలు పెరుగుతున్నాయి", time: "4 hours ago" },
  { id: 3, crop: "Onion", type: "Price Drop", severity: "medium" as const, mandi: "Pakala Mandi", message: "Onion arrivals surged – expect price correction of ₹2/kg", messageTE: "ఉల్లిపాయ రాకలు పెరిగాయి – కిలోకు ₹2 ధర తగ్గుదల అంచనా", time: "6 hours ago" },
  { id: 4, crop: "Chilli", type: "Demand Spike", severity: "medium" as const, mandi: "Chandragiri Mandi", message: "Festival season driving chilli demand up by 25%", messageTE: "పండుగ సీజన్ వల్ల మిరపకాయ డిమాండ్ 25% పెరిగింది", time: "1 day ago" },
  { id: 5, crop: "Banana", type: "Stable", severity: "low" as const, mandi: "Tirupati Mandi", message: "Banana market stable – no significant changes expected", messageTE: "అరటి మార్కెట్ స్థిరంగా ఉంది – పెద్ద మార్పులు లేవు", time: "1 day ago" },
  { id: 6, crop: "Papaya", type: "Low Demand", severity: "low" as const, mandi: "Madanapalle Mandi", message: "Papaya demand moderate – consider selling at Tirupati for better price", messageTE: "బొప్పాయి డిమాండ్ మోస్తరుగా ఉంది – మంచి ధర కోసం తిరుపతిలో అమ్మండి", time: "2 days ago" },
];

// ==================== AI INSIGHTS ====================
export const aiInsights = [
  { id: 1, title: "Tomato Price Surge Expected", description: "Based on reduced rainfall in Rayalaseema and lower crop arrivals at Madanapalle mandi, tomato prices expected to increase by 15-20% in next 10 days.", category: "Price Prediction", confidence: 87, impact: "high" as const },
  { id: 2, title: "Mango Season Peak Approaching", description: "Historical data indicates mango arrivals will peak in 3 weeks. Farmers should plan harvest and transport logistics now for maximum price realization.", category: "Seasonal Trend", confidence: 92, impact: "medium" as const },
  { id: 3, title: "Onion Supply Glut Warning", description: "Multiple districts reporting above-average onion production. Recommend staggered selling to avoid price crash at local mandis.", category: "Supply Alert", confidence: 78, impact: "high" as const },
  { id: 4, title: "Chilli Export Demand Rising", description: "Export orders from Middle East markets increasing. Farmers growing Guntur variety may benefit from 10-12% premium pricing.", category: "Market Intelligence", confidence: 85, impact: "medium" as const },
  { id: 5, title: "Weather Impact on Banana Yield", description: "IMD forecasts unseasonal rain in coastal districts. Banana growers advised to expedite harvesting to prevent crop damage.", category: "Weather Alert", confidence: 81, impact: "high" as const },
  { id: 6, title: "Papaya Cold Storage Utilization Low", description: "Cold storage facilities at Tirupati and Pakala operating at 40% capacity. Farmers can store produce for 2-3 weeks to wait for better prices.", category: "Infrastructure", confidence: 90, impact: "low" as const },
];

// ==================== RECOMMENDED MARKETS ====================
export const recommendedMarkets = [
  { mandi: "Madanapalle Mandi", crop: "Tomato", price: 28, demand: "High", distance: 12, recommendation: "Best price today", recommendationTE: "ఈ రోజు అత్యుత్తమ ధర" },
  { mandi: "Tirupati Mandi", crop: "Mango", price: 70, demand: "High", distance: 5, recommendation: "Nearest high-demand market", recommendationTE: "సమీపంలోని ఎక్కువ డిమాండ్ మార్కెట్" },
  { mandi: "Pakala Mandi", crop: "Banana", price: 30, demand: "Medium", distance: 18, recommendation: "Good for bulk selling", recommendationTE: "బల్క్ విక్రయాలకు మంచిది" },
  { mandi: "Chandragiri Mandi", crop: "Chilli", price: 118, demand: "High", distance: 15, recommendation: "Festival season premium", recommendationTE: "పండుగ సీజన్ ప్రీమియం" },
];

// ==================== VOICE ASSISTANT RESPONSES ====================
export const voiceResponses: Record<string, { en: string; te: string }> = {
  "tomato price": {
    en: "Today's tomato price is ₹28/kg at Madanapalle Mandi, ₹26/kg at Tirupati Mandi. Madanapalle offers the best price. Prices are expected to increase by ₹4/kg in the next 3 days.",
    te: "ఈ రోజు టమాటా ధర మదనపల్లి మండిలో కిలోకు ₹28, తిరుపతి మండిలో కిలోకు ₹26. మదనపల్లి అత్యుత్తమ ధరను అందిస్తుంది. రాబోయే 3 రోజుల్లో ధరలు కిలోకు ₹4 పెరుగుతాయని అంచనా.",
  },
  "mango sell": {
    en: "For mangoes, Tirupati Mandi currently offers ₹70/kg which is the highest. Demand is high due to summer season. I recommend selling at Tirupati Mandi this week.",
    te: "మామిడి కోసం, తిరుపతి మండి ప్రస్తుతం కిలోకు ₹70 అందిస్తుంది, ఇది అత్యధికం. వేసవి కాలం వల్ల డిమాండ్ ఎక్కువగా ఉంది. ఈ వారం తిరుపతిలో అమ్మాలని నేను సూచిస్తున్నాను.",
  },
  "best market": {
    en: "Based on your crops, the best markets today are: Madanapalle Mandi for Tomato (₹28/kg), Tirupati Mandi for Mango (₹70/kg). Both have high demand currently.",
    te: "మీ పంటల ఆధారంగా, ఈ రోజు ఉత్తమ మార్కెట్లు: టమాటాకు మదనపల్లి మండి (₹28/kg), మామిడికి తిరుపతి మండి (₹70/kg). రెండింటికి ప్రస్తుతం డిమాండ్ ఎక్కువ.",
  },
  "weather": {
    en: "The weather forecast shows partly cloudy skies with temperature around 32°C. No rainfall expected in the next 5 days. Good conditions for harvesting and transport.",
    te: "వాతావరణ సూచన ప్రకారం పాక్షిక మేఘావృతం, ఉష్ణోగ్రత 32°C. రాబోయే 5 రోజుల్లో వర్షం లేదు. పంట కోత మరియు రవాణాకు మంచి పరిస్థితులు.",
  },
  default: {
    en: "I can help you with crop prices, best markets to sell, weather updates, and demand alerts. Try asking about a specific crop price or where to sell your produce.",
    te: "పంట ధరలు, అమ్మడానికి ఉత్తమ మార్కెట్లు, వాతావరణ నవీకరణలు మరియు డిమాండ్ అలర్ట్‌ల గురించి నేను మీకు సహాయం చేయగలను.",
  },
};

// ==================== FARMER ENGAGEMENT ====================
export const farmerEngagement = {
  totalRegistered: 12400,
  activeToday: 3240,
  priceChecks: 8920,
  alertsReceived: 4560,
  voiceQueries: 1230,
  appDownloads: 6780,
  weeklyActive: [
    { day: "Mon", users: 2800 },
    { day: "Tue", users: 3100 },
    { day: "Wed", users: 3400 },
    { day: "Thu", users: 2900 },
    { day: "Fri", users: 3200 },
    { day: "Sat", users: 3600 },
    { day: "Sun", users: 2100 },
  ],
};

// ==================== STATE KPIs ====================
export const stateKPIs = {
  totalDistricts: 5,
  totalFarmers: 67300,
  activeMandis: 19,
  totalArrivals: "2,840 MT",
  avgPrice: "₹42/kg",
  activeAlerts: 12,
};

// ==================== DEMAND HEATMAP DATA ====================
export const demandHeatmap = districts.map(d =>
  crops.map(c => ({
    district: d.name,
    crop: c.name,
    demand: Math.round(40 + Math.random() * 60),
  }))
).flat();
