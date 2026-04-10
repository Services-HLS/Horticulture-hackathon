import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFarmerCrops } from "@/contexts/FarmerContext";
import { voiceResponsesByScope, MarketScope } from "@/data/farmerDummyData";
import { Mic, MicOff, Volume2, PlayCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  type: "user" | "assistant";
  text: string;
}

const FarmerVoiceAssistant = () => {
  const { lang, t } = useLanguage();
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const qnaPairs = [
    {
      q: { te: "మదనపల్లె మార్కెట్లో ఈరోజు టమోటా ధర ఎంత ఉంది?", en: "What is the price of tomato in Madanapalle market today?" },
      a: { te: "ఈరోజు మదనపల్లె మార్కెట్లో టమోటా క్వింటాల్కు ₹2,000 నుండి ₹2,500 వరకు ఉంది. మా అంచనా ప్రకారం, వచ్చే మూడు రోజుల్లో ధర ₹200 పెరిగే అవకాశం ఉంది. మీరు కొంచెం ఆగి అమ్మడం మంచిది.", en: "Today in Madanapalle market, tomato is between ₹2,000 to ₹2,500 per quintal. According to our forecast, the price is likely to increase by ₹200 in the next three days. It is better for you to wait a bit before selling." }
    },
    {
      q: { te: "నేను నా పంటను ఇప్పుడే కోయవచ్చా?", en: "Can I harvest my crop now?" },
      a: { te: "మా సిస్టమ్ ప్రకారం వచ్చే వారం మార్కెట్కు సరుకు రాక తగ్గే అవకాశం ఉంది. మీరు మరో 4 రోజులు ఆగి కోత కోస్తే, మీకు 10% ఎక్కువ లాభం వచ్చే అవకాశం ఉంది.", en: "According to our system, arrivals to the market are expected to decrease next week. If you wait another 4 days to harvest, you are likely to get 10% more profit." }
    },
    {
      q: { te: "నా పంటకు ఎక్కడ ఎక్కువ ధర వస్తుంది?", en: "Where can I get the best price for my crop?" },
      a: { te: "ప్రస్తుతం మీకు దగ్గరలో ఉన్న అనంతపూర్ మార్కెట్లో మదనపల్లె కంటే ధర క్వింటాల్కు ₹150 ఎక్కువగా ఉంది. రవాణా ఖర్చులు పోను మీకు అక్కడే ఎక్కువ లాభం ఉంటుంది.", en: "Currently, the price in Anantapur market near you is ₹150 higher per quintal than in Madanapalle. After transport costs, you will have more profit there." }
    },
    {
      q: { te: "వచ్చే నెలలో ఏ పంట వేస్తే లాభదాయకంగా ఉంటుంది?", en: "Which crop will be profitable to plant next month?" },
      a: { te: "రాబోయే కాలంలో మిరపకాయలకు మార్కెట్లో డిమాండ్ ఎక్కువగా ఉంటుందని మా AI అంచనా వేస్తోంది. ఇ-పంట డేటా ప్రకారం మీ ప్రాంతంలో ఈసారి మిరప సాగు తక్కువగా ఉంది, కాబట్టి మీకు మంచి ధర లభిస్తుంది.", en: "Our AI predicts that the demand for chillies in the market will be high in the coming period. According to e-Crop data, chilli cultivation is low in your area this time, so you will get a good price." }
    },
    {
      q: { te: "దళారుల ప్రమేయం లేకుండా నా పంటను ఎలా అమ్మాలి?", en: "How to sell my crop without middlemen involvement?" },
      a: { te: "మిమ్మల్ని నేరుగా స్థానిక FPOలు మరియు రిటైల్ కొనుగోలుదారులతో మేము అనుసంధానం చేస్తాము. దీనివల్ల మీకు మధ్యవర్తుల ఇబ్బంది లేకుండా 97% మెరుగైన ధర లభిస్తుంది.", en: "We connect you directly with local FPOs and retail buyers. This gives you a 97% better price without the hassle of middlemen." }
    }
  ];

  const getResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    for (const pair of qnaPairs) {
      if (lowerQuery.includes(pair.q.en.toLowerCase()) || lowerQuery.includes(pair.q.te)) {
        return pair.a[lang];
      }
    }
    return lang === "te" ? "క్షమించండి, మీ ప్రశ్నకు సమాధానం నా దగ్గర లేదు. దయచేసి మార్కెట్ ధరలు లేదా పంట సలహాల గురించి అడగండి." : "I'm sorry, I don't have information on that. Please ask about market prices or crop advisory.";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { type: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = getResponse(text);
      const assistantMsg: Message = { type: "assistant", text: response };
      setMessages(prev => [...prev, assistantMsg]);
    }, 1500);
  };

  const startListening = () => {
    setListening(true);
  };

  const stopListening = () => {
    setListening(false);
    const currentPair = qnaPairs[questionIndex];
    handleSend(currentPair.q[lang]);
    setQuestionIndex((prev) => (prev + 1) % qnaPairs.length);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="page-header">{t("Voice Assistant", "వాయిస్ వ్యవసాయ సలహాదారు")}</h1>
        <p className="page-subtitle">{t("Speak or click a question to get audio market insights", "మార్కెట్ సమాచారాన్ని ఆడియో ద్వారా పొందడానికి మాట్లడండి లేదా ప్రశ్నను క్లిక్ చేయండి")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col items-center">
          <div className="w-full bg-card border rounded-t-xl p-8 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className={`rounded-full h-24 w-24 shadow-xl transition-all duration-300 relative ${listening ? "bg-destructive hover:bg-destructive/90 scale-110" : "bg-primary hover:scale-105"}`}
                onClick={listening ? stopListening : startListening}
              >
                {listening && <span className="absolute inset-0 rounded-full animate-ping bg-destructive/40" />}
                {listening ? <MicOff className="h-10 w-10 text-destructive-foreground relative z-10" /> : <Mic className="h-10 w-10 text-primary-foreground relative z-10" />}
              </Button>

              {listening && (
                <Button
                  variant="destructive"
                  className="rounded-full px-8 py-2 font-bold animate-bounce"
                  onClick={stopListening}
                >
                  {t("Done Speaking", "మాట్లాడటం పూర్తయింది")}
                </Button>
              )}
            </div>

            <div className="font-semibold text-lg text-primary text-center min-h-[28px]">
              {listening ? (
                <span className="animate-pulse">{t("Listening...", "మీ వాయిస్ వింటోంది...")}</span>
              ) : (
                t("Tap to Speak", "మాట్లాడటానికి నొక్కండి")
              )}
            </div>
          </div>

          <div className="w-full bg-card border border-t-0 rounded-b-xl p-4 min-h-[400px] max-h-[500px] overflow-y-auto space-y-4 flex flex-col relative flex-1">
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6 text-center h-full opacity-50">
                <Volume2 className="h-16 w-16 mb-4 text-muted" />
                <p className="text-lg font-bold">{t("Tap the microphone to start", "ప్రారంభించడానికి మైక్రోఫోన్‌ను నొక్కండి")}</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl p-4 text-sm relative shadow-sm ${m.type === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm border font-medium"}`}>
                  {m.type === "assistant" && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
                      <PlayCircle className="h-5 w-5 text-primary cursor-pointer" />
                      <span className="text-[10px] font-black uppercase tracking-tight text-primary">{t("Audio Playing", "ఆడియో ప్లే అవుతోంది")}</span>
                    </div>
                  )}
                  <p className="leading-relaxed text-base">{m.text}</p>
                </div>
              </div>
            ))}
            {messages.length % 2 !== 0 && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl p-4 bg-muted text-foreground rounded-bl-sm border shadow-sm flex items-center gap-2">
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  <span className="text-sm font-bold">{t("Analyzing...", "విశ్లేషిస్తోంది...")}</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="w-full mt-4 flex gap-2">
            <input
              className="flex-1 h-12 rounded-xl border bg-card px-4 text-sm shadow-sm focus:ring-2 ring-primary/20 outline-none"
              placeholder={t("Type manually...", "మాన్యువల్‌గా టైప్ చేయండి...")}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend(input)}
            />
            <Button size="lg" className="h-12 rounded-xl px-6 font-bold" onClick={() => handleSend(input)}>
              {t("Ask", "అడగండి")}
            </Button>
          </div>
        </div>

        <div className="md:col-span-1 space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <h3 className="font-black text-xs uppercase tracking-widest mb-6 text-primary flex items-center gap-2">
              <Mic className="h-4 w-4" />
              {t("Frequently Asked", "తరచుగా అడిగేవి")}
            </h3>
            <div className="space-y-3">
              {qnaPairs.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(pair.q[lang])}
                  className="w-full text-left bg-card hover:bg-muted border p-4 rounded-lg transition-all hover:border-primary/40 shadow-sm group"
                >
                  <span className="font-bold text-xs leading-tight block group-hover:text-primary transition-colors">
                    "{pair.q[lang]}"
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerVoiceAssistant;
