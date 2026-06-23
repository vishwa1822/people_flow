import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import { Building2, Users, TrendingUp, BarChart3 } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { ChartCard, ChartArea, tooltipStyle } from '../shared/charts/ChartCard';
import { Avatar } from '../shared/Avatar';
import {
  departments,
  departmentSummary,
  departmentGrowthTrend,
  headcountAnalytics,
} from '../../data/mockDepartments';
import { departmentDistribution } from '../../data/mockData';

function formatBudget(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  return `$${(amount / 1000).toFixed(0)}K`;
}

export function DepartmentsView() {
  return (
    <div className="h-full flex flex-col min-h-0 gap-3 overflow-y-auto pr-1">
      <div className="shrink-0">
        <h1 className="text-base font-semibold text-text">Department Management</h1>
        <p className="text-xs text-text-muted mt-0.5">Organizational structure, headcount, and performance analytics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 shrink-0">
        <StatCard label="Total Departments" value={departmentSummary.totalDepartments} icon={Building2} iconColor="text-primary" iconBg="bg-primary/10" />
        <StatCard label="Total Employees" value={departmentSummary.totalEmployees} icon={Users} iconColor="text-secondary" iconBg="bg-secondary/10" />
        <StatCard label="Largest Department" value={departmentSummary.largestDepartment} subtext="35 employees" icon={BarChart3} iconColor="text-highlight" iconBg="bg-highlight/10" />
        <StatCard label="Avg Team Size" value={departmentSummary.averageTeamSize} subtext="employees per dept" icon={TrendingUp} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 shrink-0">
        <ChartCard title="Department Distribution" className="lg:col-span-1">
          <ChartArea minHeight={180}>
            <BarChart data={departmentDistribution} barSize={18} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
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

        <ChartCard title="Headcount Analytics" className="lg:col-span-1">
          <ChartArea minHeight={180}>
            <BarChart data={headcountAnalytics} barSize={14} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="department" tick={{ fontSize: 8, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="headcount" fill="#2563EB" radius={[3, 3, 0, 0]} name="Current" />
              <Bar dataKey="capacity" fill="#E5E7EB" radius={[3, 3, 0, 0]} name="Capacity" />
            </BarChart>
          </ChartArea>
        </ChartCard>

        <ChartCard title="Department Growth Trends" className="lg:col-span-1">
          <ChartArea minHeight={180}>
            <LineChart data={departmentGrowthTrend} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="IT" stroke="#2563EB" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Sales" stroke="#F59E0B" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Marketing" stroke="#8B5CF6" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartArea>
        </ChartCard>
      </div>

      <div className="shrink-0">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">All Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {departments.map((dept) => (
            <div key={dept.id} className="card-hover rounded-xl border border-border/80 bg-card p-4 shadow-sm shadow-black/[0.02]">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-highlight/10 border border-border/60">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text">{dept.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Avatar name={dept.head} size="xs" />
                      <p className="text-[11px] text-text-muted">{dept.head}</p>
                    </div>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-medium">
                  +{dept.growth}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-lg bg-background/80 p-2">
                  <p className="text-[10px] text-text-muted">Employees</p>
                  <p className="text-sm font-semibold text-text">{dept.employeeCount}</p>
                </div>
                <div className="rounded-lg bg-background/80 p-2">
                  <p className="text-[10px] text-text-muted">Active Projects</p>
                  <p className="text-sm font-semibold text-text">{dept.activeProjects}</p>
                </div>
                <div className="rounded-lg bg-background/80 p-2">
                  <p className="text-[10px] text-text-muted">Budget</p>
                  <p className="text-sm font-semibold text-text">{formatBudget(dept.budget)}</p>
                </div>
                <div className="rounded-lg bg-background/80 p-2">
                  <p className="text-[10px] text-text-muted">Performance</p>
                  <p className="text-sm font-semibold text-text">{dept.performance}%</p>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-text-muted">Budget Utilization</span>
                  <span className="font-medium text-text">{dept.budgetUtilization}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-highlight progress-bar"
                    style={{ width: `${dept.budgetUtilization}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
