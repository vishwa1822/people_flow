import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: { value: string; positive?: boolean };
}

export function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  iconColor = 'text-primary',
  iconBg = 'bg-primary/10',
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-3.5 shadow-sm shadow-black/[0.02]">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">{label}</p>
          <p className="mt-1 text-xl font-semibold text-text tabular-nums">{value}</p>
          {subtext && <p className="mt-0.5 text-[11px] text-text-muted">{subtext}</p>}
          {trend && (
            <p className={`mt-1 text-[11px] font-medium ${trend.positive ? 'text-emerald-600' : 'text-amber-600'}`}>
              {trend.value}
            </p>
          )}
        </div>
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
