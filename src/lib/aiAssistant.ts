import type { UserRole } from "@/contexts/AuthContext";

export const AI_ASSISTANT_URL = "https://horticulture-assistant-1050219781430.asia-south1.run.app/";

/** In-app route; embedded agent loads here inside `AppLayout`. */
export const AI_ASSISTANT_ROUTE = "/assistant";

export function getAiAssistantNavLabel(role: UserRole, lang: "en" | "te"): string {
  if (lang === "te" && role === "farmer") {
    return "రైతు AI సహాయకుడు";
  }
  switch (role) {
    case "farmer":
      return "Farmer AI Assistant";
    case "district":
      return "District AI Assistant";
    case "state":
      return "State AI Assistant";
    default:
      return "AI Assistant";
  }
}
