import React, { createContext, useContext, useState } from "react";

type Lang = "en" | "te";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, te: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({ lang: "en", setLang: () => {}, t: (en) => en });

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("en");
  const t = (en: string, te: string) => (lang === "te" ? te : en);
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
