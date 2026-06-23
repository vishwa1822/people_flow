import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  FileText,
  TrendingUp,
  CalendarCheck,
  DollarSign,
  Download,
  Users,
  Clock,
  Building2,
  BarChart3,
} from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { ChartCard, ChartArea, ChartLegend, tooltipStyle } from '../shared/charts/ChartCard';
import {
  departmentDistribution,
  activeVsLeave,
  newJoinersTrend,
  workforceGrowth,
} from '../../data/mockData';
import { reportCategories, reportHistory, reportsSummary } from '../../data/mockSettings';

const categoryIcons: Record<string, typeof Users> = {
  users: Users,
  dollar: DollarSign,
  clock: Clock,
  building: Building2,
  chart: BarChart3,
};

interface ReportsViewProps {
  onExport?: () => void;
}

export function ReportsView({ onExport }: ReportsViewProps) {
  const totalWorkforce = useMemo(() => workforceGrowth[workforceGrowth.length - 1]?.total ?? 150, []);

  return (
    <div className="h-full flex flex-col min-h-0 gap-3 overflow-y-auto pr-1">
      <div className="flex items-center justify-between shrink-0 gap-3">
        <div className="min-w-0">
          <h1 className="text-base font-semibold text-text">Workforce Reporting Center</h1>
          <p className="text-xs text-text-muted mt-0.5">Generate, export, and analyze workforce intelligence reports</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-3 py-1.5 text-xs font-medium text-text hover:bg-gray-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Export All
          </button>
          <button className="rounded-lg bg-gradient-to-r from-primary to-highlight px-3 py-1.5 text-xs font-medium text-white btn-hover">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 shrink-0">
        <StatCard label="Generated Reports" value={reportsSummary.generatedReports} icon={FileText} iconColor="text-primary" iconBg="bg-primary/10" />
        <StatCard label="Workforce Growth" value={reportsSummary.workforceGrowth} icon={TrendingUp} iconColor="text-secondary" iconBg="bg-secondary/10" trend={{ value: `${totalWorkforce} total employees`, positive: true }} />
        <StatCard label="Attendance Insights" value={reportsSummary.attendanceInsights} icon={CalendarCheck} iconColor="text-highlight" iconBg="bg-highlight/10" subtext="avg attendance rate" />
        <StatCard label="Payroll Reports" value={reportsSummary.payrollReports} icon={DollarSign} iconColor="text-amber-600" iconBg="bg-amber-50" subtext="this quarter" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 shrink-0">
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Report Categories</h2>
          {reportCategories.map((cat) => {
            const Icon = categoryIcons[cat.icon] ?? FileText;
            return (
              <div key={cat.id} className="card-hover rounded-xl border border-border/80 bg-card p-3 shadow-sm">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xs font-semibold text-text">{cat.name}</h3>
                      <span className="text-[10px] text-text-muted">{cat.count} reports</span>
                    </div>
                    <p className="text-[11px] text-text-muted mt-0.5">{cat.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="flex items-center gap-1 text-[10px] font-medium text-primary hover:opacity-80">
                        <Download className="h-3 w-3" /> Download
                      </button>
                      <button className="flex items-center gap-1 text-[10px] font-medium text-text-muted hover:text-text">
                        <FileText className="h-3 w-3" /> Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ChartCard title="Department Distribution">
            <ChartArea minHeight={140}>
              <BarChart data={departmentDistribution} barSize={16} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                  {departmentDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ChartArea>
          </ChartCard>

          <ChartCard title="Active vs Leave">
            <ChartArea minHeight={120}>
              <PieChart>
                <Pie data={activeVsLeave} cx="50%" cy="50%" innerRadius="42%" outerRadius="68%" paddingAngle={2} dataKey="value">
                  {activeVsLeave.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ChartArea>
            <ChartLegend items={activeVsLeave} />
          </ChartCard>

          <ChartCard title="New Joiners">
            <ChartArea minHeight={140}>
              <AreaChart data={newJoinersTrend} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="joinerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} fill="url(#joinerGrad)" />
              </AreaChart>
            </ChartArea>
          </ChartCard>

          <ChartCard title="Workforce Growth">
            <ChartArea minHeight={140}>
              <LineChart data={workforceGrowth} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={28} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 2 }} />
              </LineChart>
            </ChartArea>
          </ChartCard>
        </div>
      </div>

      <div className="rounded-xl border border-border/80 bg-card shadow-sm overflow-hidden shrink-0">
        <div className="px-3 py-2.5 border-b border-border/50">
          <h2 className="text-xs font-semibold text-text">Report History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-border/40 bg-gray-50/60">
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Report Name</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Category</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Generated</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Format</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Size</th>
                <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {reportHistory.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 py-2.5 text-xs font-medium text-text">{report.name}</td>
                  <td className="px-3 py-2.5 text-xs text-text-muted">{report.category}</td>
                  <td className="px-3 py-2.5 text-xs text-text-muted">{report.generatedAt}</td>
                  <td className="px-3 py-2.5">
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-text-muted">{report.format}</span>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-text-muted tabular-nums">{report.size}</td>
                  <td className="px-3 py-2.5 text-right">
                    <button className="text-[11px] font-medium text-primary hover:opacity-80 mr-2">Download</button>
                    <button className="text-[11px] font-medium text-text-muted hover:text-text">Export</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
