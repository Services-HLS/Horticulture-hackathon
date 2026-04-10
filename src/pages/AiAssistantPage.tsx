import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { AI_ASSISTANT_URL, getAiAssistantNavLabel } from "@/lib/aiAssistant";

const AiAssistantPage = () => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const title = user ? getAiAssistantNavLabel(user.role, lang) : "AI Assistant";

  return (
    <div className="flex flex-col h-[85vh] min-h-[850px] gap-4 animate-slide-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between shrink-0 gap-4">
        <h1 className="page-header">{title}</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open("https://harticulture-ai-agent.vercel.app/", "_blank")}
            className="text-xs font-bold"
          >
            Open in New Window
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden rounded-2xl border bg-card shadow-sm">
        {/* Loading Fallback */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-0">
          <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-sm font-bold text-muted-foreground tracking-tight">Initializing Assistant Intelligence...</p>
        </div>

        <iframe
          key={user?.name}
          src="https://harticulture-ai-agent.vercel.app/"
          title={title}
          className="relative z-10 h-full w-full border-0 bg-transparent"
          allow="microphone; camera; clipboard-write; geolocation"
        />
      </div>
    </div>
  );
};

export default AiAssistantPage;
