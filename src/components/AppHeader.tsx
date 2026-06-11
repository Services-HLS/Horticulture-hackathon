import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bell, Bot, Globe, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { AI_ASSISTANT_ROUTE, getAiAssistantNavLabel } from "@/lib/aiAssistant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AppHeader = () => {
  const { user, logout } = useAuth();
  const { lang, setLang } = useLanguage();
  const assistantLabel = user ? getAiAssistantNavLabel(user.role, lang) : "AI Assistant";

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-2">
        <img src="/Crop-logo.svg" alt="Horti-Smart Logo" className="h-8 w-8" />
        <span className="font-bold text-sm text-foreground hidden sm:inline">AP Horticulture – Smart Market Intelligence</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild title={assistantLabel} aria-label={assistantLabel}>
          <Link to={AI_ASSISTANT_ROUTE}>
            <Bot className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="relative" title="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {user?.role === "farmer" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === "en" ? "te" : "en")}
            className="text-xs font-medium"
          >
            <Globe className="h-4 w-4 mr-1" />
            {lang === "en" ? "తెలుగు" : "English"}
          </Button>
        )}

        <Badge variant="outline" className="hidden sm:inline-flex text-xs">
          {user?.name}
        </Badge>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            toast.info("Logging out...");
            logout();
          }}
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
