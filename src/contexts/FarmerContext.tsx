import React, { createContext, useContext, useState, useEffect } from "react";
import { MarketScope, farmerCrops as defaultCrops } from "@/data/farmerDummyData";

export interface Crop {
    id: string;
    name: string;
    nameTE: string;
    icon: string;
    image: string;
    season: string;
    isCustom?: boolean;
}

interface FarmerContextType {
    selectedCrops: string[];
    toggleCrop: (id: string) => void;
    customCrops: Crop[];
    addCustomCrop: (crop: Crop) => void;
    deleteCustomCrop: (id: string) => void;
    allCrops: Crop[];
    marketScope: MarketScope;
    setMarketScope: (scope: MarketScope) => void;
}

const FarmerContext = createContext<FarmerContextType>({
    selectedCrops: [],
    toggleCrop: () => { },
    customCrops: [],
    addCustomCrop: () => { },
    deleteCustomCrop: () => { },
    allCrops: defaultCrops,
    marketScope: "district",
    setMarketScope: () => { }
});

export const FarmerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCrops, setSelectedCrops] = useState<string[]>(() => {
        const saved = localStorage.getItem("farmerCrops");
        return saved ? JSON.parse(saved) : ["tomato", "onion"];
    });

    const [customCrops, setCustomCrops] = useState<Crop[]>(() => {
        const saved = localStorage.getItem("farmerCustomCrops");
        return saved ? JSON.parse(saved) : [];
    });

    const [marketScope, setMarketScope] = useState<MarketScope>("district");

    useEffect(() => {
        localStorage.setItem("farmerCrops", JSON.stringify(selectedCrops));
    }, [selectedCrops]);

    useEffect(() => {
        localStorage.setItem("farmerCustomCrops", JSON.stringify(customCrops));
    }, [customCrops]);

    const toggleCrop = (id: string) => {
        setSelectedCrops(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const addCustomCrop = (crop: Crop) => {
        setCustomCrops(prev => [...prev, crop]);
        setSelectedCrops(prev => [...prev, crop.id]); // auto select
    };

    const deleteCustomCrop = (id: string) => {
        setCustomCrops(prev => prev.filter(c => c.id !== id));
        setSelectedCrops(prev => prev.filter(c => c !== id));
    };

    const allCrops = [...defaultCrops, ...customCrops];

    return <FarmerContext.Provider value={{ selectedCrops, toggleCrop, customCrops, addCustomCrop, deleteCustomCrop, allCrops, marketScope, setMarketScope }}>{children}</FarmerContext.Provider>;
};

export const useFarmerCrops = () => useContext(FarmerContext);
