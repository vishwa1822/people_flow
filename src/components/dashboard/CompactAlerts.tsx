import { AlertCircle, UserPlus, FileWarning, Calendar, Shield } from 'lucide-react';
import { alerts } from '../../data/mockData';
import { getAlertIconColor } from '../../utils/healthIndicator';

const alertIcons = {
  probation: AlertCircle,
  onboarding: UserPlus,
  profile: FileWarning,
  leave: Calendar,
  compliance: Shield,
};

const priorityDot = {
  high: 'bg-danger',
  medium: 'bg-warning',
  low: 'bg-primary',
};

export function CompactAlerts() {
  const visible = alerts.slice(0, 4);

  return (
    <div className="flex flex-col h-full min-h-0 rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
      <div className="shrink-0 flex items-center justify-between px-3 py-2 border-b border-border/50">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Smart Alerts</h2>
        <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          {alerts.length}
        </span>
      </div>
      <div className="flex-1 min-h-0 divide-y divide-border/40 overflow-hidden">
        {visible.map((alert) => {
          const Icon = alertIcons[alert.type];
          return (
            <div
              key={alert.id}
              className="flex items-start gap-2 px-3 py-2 hover:bg-gray-50/60 transition-colors"
            >
              <div className={`rounded-md p-1 shrink-0 ${getAlertIconColor(alert.priority)}`}>
                <Icon className="h-3 w-3" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${priorityDot[alert.priority]}`} />
                  <p className="text-[11px] font-medium text-text truncate">{alert.title}</p>
                </div>
                <p className="text-[10px] text-text-muted mt-0.5 line-clamp-1">{alert.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
