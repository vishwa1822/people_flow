export const tooltipStyle = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  fontSize: '11px',
};

export function ChartCard({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col min-h-0 min-w-0 rounded-xl border border-border/80 bg-card shadow-sm shadow-black/[0.02] overflow-hidden ${className}`}>
      <div className="px-3 py-2 border-b border-border/50 shrink-0">
        <h3 className="text-[11px] sm:text-xs font-semibold text-text">{title}</h3>
      </div>
      <div className="flex-1 min-h-0 min-w-0 p-2 flex flex-col">{children}</div>
    </div>
  );
}

import { ResponsiveContainer } from 'recharts';

export function ChartArea({ children, minHeight = 120 }: { children: React.ReactNode; minHeight?: number }) {
  return (
    <div className="flex-1 min-h-[120px] min-w-0 w-full" style={{ minHeight, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export function ChartLegend({ items }: { items: { name: string; value: number; color: string }[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 shrink-0 pt-1">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-1 text-[9px] text-text-muted">
          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
          {item.name} ({item.value})
        </div>
      ))}
    </div>
  );
}
