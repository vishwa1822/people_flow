import { Users, Activity, CalendarOff, AlertTriangle } from 'lucide-react';
import { dashboardStats } from '../../data/mockData';

const metrics = [
  { label: 'Workforce', value: dashboardStats.totalEmployees, icon: Users },
  { label: 'Active', value: dashboardStats.activeToday, icon: Activity },
  { label: 'On Leave', value: dashboardStats.onLeave, icon: CalendarOff },
  { label: 'Attention', value: dashboardStats.attentionNeeded, icon: AlertTriangle },
];

export function DashboardHeader() {
  return (
    <section className="shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#2563EB] via-[#4338CA] to-[#4F46E5] shadow-lg shadow-primary/15">
      <div className="relative px-4 py-4 sm:px-6 sm:py-5">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at 85% 15%, rgba(255,255,255,0.18) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(16,185,129,0.12) 0%, transparent 40%)',
          }}
        />

        <div className="relative z-10">
          <h1 className="text-base sm:text-lg font-semibold text-white leading-tight">
            Good Morning, Admin
          </h1>
          <p className="text-xs sm:text-sm text-white/75 mt-1">
            Here&apos;s your workforce overview for today
          </p>

          <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
            {metrics.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-xl bg-white/12 border border-white/20 backdrop-blur-sm py-2.5 px-1 sm:py-3 sm:px-2"
              >
                <Icon className="h-3.5 w-3.5 text-white/70 mb-1 hidden sm:block" />
                <span className="text-lg sm:text-xl font-bold text-white leading-none tabular-nums">
                  {value}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wide text-white/65 mt-1 text-center leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
