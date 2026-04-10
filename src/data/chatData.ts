import { getMarketPrices } from "./districtDummyData";

export interface Message {
    id: string;
    sender: string;
    senderRole: "farmer" | "officer";
    content: string;
    timestamp: string;
    isMe: boolean;
}

export interface ChatSession {
    id: string;
    userName: string;
    userRole: "farmer" | "officer";
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    avatar?: string;
    description?: string;
    messages: Message[];
}

export const officerInfo = {
    name: "Sri. Venkata Rao",
    role: "District Horticulture Officer",
    location: "Tirupati District Office",
    hours: "10:00 AM - 5:00 PM (Mon-Fri)",
    advisory: "Ask me about crop prices, market demand, cultivation guidance, or mandi recommendations. I'm here to help you get the best value for your produce."
};

export const farmerQuickQueries = [
    "Tomato price today",
    "Best mandi to sell onion",
    "Demand for banana",
    "Crop advisory"
];

export const getAutoResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("tomato")) {
        const prices = getMarketPrices("district", "tomato");
        const bestMandi = prices.reduce((prev, current) => (prev.price > current.price) ? prev : current);
        return `Today's tomato prices are high. ${bestMandi.mandi} is offering ₹${bestMandi.price}/kg. I recommend selling there for best returns.`;
    }

    if (q.includes("onion")) {
        const prices = getMarketPrices("district", "onion");
        const bestMandi = prices.reduce((prev, current) => (prev.price > current.price) ? prev : current);
        return `Current onion demand is high in ${bestMandi.mandi}. The expected price today is ₹${bestMandi.price}/kg. Supply is slightly low, so prices might stay stable.`;
    }

    if (q.includes("banana")) {
        return "Banana demand is steady across Pakala and Tirupati mandis. Prices are around ₹30-32/kg. Ensure good grading for a premium price.";
    }

    if (q.includes("advisory") || q.includes("help") || q.includes("guidance")) {
        return "For the current season, we recommend focusing on soil moisture management for tomatoes and monitoring for pest attacks in chillies. Contact your local extension officer for a field visit if needed.";
    }

    return "Thank you for your message. I am reviewing the market data and will provide you with the best recommendation shortly. Generally, prices in Madanapalle are trending upwards today.";
};

export const dummyFarmerChats: ChatSession[] = [
    {
        id: "f1",
        userName: "Ramesh",
        userRole: "farmer",
        lastMessage: "Thank you for the advice on Tomato.",
        timestamp: "10:30 AM",
        unreadCount: 0,
        description: "Tomato Farmer - Chandragiri Mandal",
        messages: [
            { id: "m1", sender: "Ramesh", senderRole: "farmer", content: "Sir, what is the best price for Tomato today?", timestamp: "10:15 AM", isMe: false },
            { id: "m2", sender: "Sri. Venkata Rao", senderRole: "officer", content: "Madanapalle mandi is offering ₹28/kg today, which is the best in the region.", timestamp: "10:20 AM", isMe: true },
            { id: "m3", sender: "Ramesh", senderRole: "farmer", content: "Thank you for the advice on Tomato.", timestamp: "10:30 AM", isMe: false },
        ]
    },
    {
        id: "f2",
        userName: "Lakshmi",
        userRole: "farmer",
        lastMessage: "When should I sell my Banana crop?",
        timestamp: "Yesterday",
        unreadCount: 2,
        description: "Banana Farmer - Pakala Mandal",
        messages: [
            { id: "m4", sender: "Lakshmi", senderRole: "farmer", content: "When should I sell my Banana crop?", timestamp: "Yesterday", isMe: false },
        ]
    },
    {
        id: "f3",
        userName: "Narayana",
        userRole: "farmer",
        lastMessage: "Chilli prices in Guntur?",
        timestamp: "Monday",
        unreadCount: 0,
        description: "Chilli Farmer - Tirupati Rural Mandal",
        messages: [
            { id: "m5", sender: "Narayana", senderRole: "farmer", content: "Sir, are Chilli prices in Guntur better than local?", timestamp: "Monday", isMe: false },
            { id: "m6", sender: "Sri. Venkata Rao", senderRole: "officer", content: "Yes Guntur is at ₹140/kg, but transport costs will be high. Local Pakala is at ₹120/kg.", timestamp: "Monday", isMe: true },
        ]
    }
];

export const dummyOfficerChats: ChatSession[] = [
    {
        id: "o1",
        userName: "Dr. Rajesh Kumar",
        userRole: "officer",
        lastMessage: "Please update the district production report.",
        timestamp: "09:45 AM",
        unreadCount: 1,
        description: "State Horticulture Officer - AP",
        messages: [
            { id: "om1", sender: "Dr. Rajesh Kumar", senderRole: "officer", content: "Please update the district production report for this month.", timestamp: "09:45 AM", isMe: false },
        ]
    },
    {
        id: "o2",
        userName: "Officer Anjali",
        userRole: "officer",
        lastMessage: "Kolar market prices are rising.",
        timestamp: "Yesterday",
        unreadCount: 0,
        description: "Dist. Officer - Chittoor",
        messages: [
            { id: "om2", sender: "Officer Anjali", senderRole: "officer", content: "Kolar market prices for Tomato are rising. Expect some diversion of supply from our mandis.", timestamp: "Yesterday", isMe: false },
        ]
    }
];
