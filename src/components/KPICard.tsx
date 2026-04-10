import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  subtitle?: string;
}

const KPICard = ({ title, value, change, icon, subtitle }: KPICardProps) => (
  <div className="kpi-card flex items-start gap-4">
    <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {change !== undefined && (
        <div className={`flex items-center gap-1 text-xs mt-1 ${change > 0 ? "stat-up" : change < 0 ? "stat-down" : "text-muted-foreground"}`}>
          {change > 0 ? <TrendingUp className="h-3 w-3" /> : change < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
          {Math.abs(change)}% {change > 0 ? "increase" : change < 0 ? "decrease" : "stable"}
        </div>
      )}
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  </div>
);

export default KPICard;
