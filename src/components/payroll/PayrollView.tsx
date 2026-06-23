import { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { DollarSign, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { ChartCard, ChartArea, ChartLegend, tooltipStyle } from '../shared/charts/ChartCard';
import { Avatar } from '../shared/Avatar';
import {
  payrollSummary,
  payrollDistribution,
  monthlyPayrollTrend,
  salaryBreakdown,
  payrollRecords,
  formatCurrency,
  type PayrollStatus,
} from '../../data/mockPayroll';

const statuses: (PayrollStatus | 'All')[] = ['All', 'Processed', 'Pending', 'On Hold'];

function getPayrollStatusColor(status: PayrollStatus): string {
  switch (status) {
    case 'Processed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'On Hold': return 'bg-red-50 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

export function PayrollView() {
  const [status, setStatus] = useState<PayrollStatus | 'All'>('All');

  const filtered = useMemo(() => {
    return payrollRecords.filter((r) => status === 'All' || r.status === status);
  }, [status]);

  return (
    <div className="h-full flex flex-col min-h-0 gap-3 overflow-y-auto pr-1">
      <div className="shrink-0">
        <h1 className="text-base font-semibold text-text">Payroll Management</h1>
        <p className="text-xs text-text-muted mt-0.5">Compensation overview, pay cycles, and salary analytics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 shrink-0">
        <StatCard label="Total Payroll" value={formatCurrency(payrollSummary.totalPayroll)} icon={DollarSign} iconColor="text-primary" iconBg="bg-primary/10" trend={{ value: '+2.1% vs last month', positive: true }} />
        <StatCard label="Pending Payments" value={payrollSummary.pendingPayments} icon={Clock} iconColor="text-amber-600" iconBg="bg-amber-50" subtext="awaiting processing" />
        <StatCard label="Processed Salaries" value={payrollSummary.processedSalaries} icon={CheckCircle} iconColor="text-secondary" iconBg="bg-secondary/10" />
        <StatCard label="Average Salary" value={formatCurrency(payrollSummary.averageSalary)} icon={TrendingUp} iconColor="text-highlight" iconBg="bg-highlight/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 shrink-0">
        <ChartCard title="Payroll Distribution">
          <ChartArea minHeight={160}>
            <BarChart data={payrollDistribution} barSize={20} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="range" tick={{ fontSize: 8, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {payrollDistribution.map((entry) => (
                  <Cell key={entry.range} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartArea>
        </ChartCard>

        <ChartCard title="Monthly Payroll Trend">
          <ChartArea minHeight={160}>
            <LineChart data={monthlyPayrollTrend} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatCurrency(Number(v))} />
              <Line type="monotone" dataKey="amount" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 2 }} />
            </LineChart>
          </ChartArea>
        </ChartCard>

        <ChartCard title="Salary Breakdown">
          <ChartArea minHeight={140}>
            <PieChart>
              <Pie
                data={salaryBreakdown}
                cx="50%"
                cy="50%"
                innerRadius="42%"
                outerRadius="68%"
                paddingAngle={2}
                dataKey="value"
              >
                {salaryBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${Number(v)}%`} />
            </PieChart>
          </ChartArea>
          <ChartLegend items={salaryBreakdown.map((s) => ({ name: s.name, value: s.value, color: s.color }))} />
        </ChartCard>
      </div>

      <div className="rounded-xl border border-border/80 bg-card shadow-sm overflow-hidden shrink-0">
        <div className="px-3 py-2.5 border-b border-border/50 flex items-center justify-between gap-2">
          <h2 className="text-xs font-semibold text-text">Payroll Records — June 2024</h2>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as PayrollStatus | 'All')}
            className="rounded-lg border border-border/70 bg-background px-2 py-1.5 text-xs text-text focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-border/40 bg-gray-50/60">
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Employee</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Department</th>
                <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">Salary</th>
                <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">Bonus</th>
                <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">Deductions</th>
                <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">Net Pay</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={record.employeeName} size="xs" />
                      <div>
                        <p className="text-xs font-medium text-text">{record.employeeName}</p>
                        <p className="text-[10px] text-text-muted">{record.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-text-muted">{record.department}</td>
                  <td className="px-3 py-2.5 text-xs text-text text-right tabular-nums">{formatCurrency(record.salary)}</td>
                  <td className="px-3 py-2.5 text-xs text-emerald-600 text-right tabular-nums">{formatCurrency(record.bonus)}</td>
                  <td className="px-3 py-2.5 text-xs text-red-500 text-right tabular-nums">-{formatCurrency(record.deductions)}</td>
                  <td className="px-3 py-2.5 text-xs font-semibold text-text text-right tabular-nums">{formatCurrency(record.netPay)}</td>
                  <td className="px-3 py-2.5">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${getPayrollStatusColor(record.status)}`}>
                      {record.status}
                    </span>
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
