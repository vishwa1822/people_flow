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
  AreaChart,
  Area,
} from 'recharts';
import { CalendarCheck, UserCheck, UserX, Plane } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { ChartCard, ChartArea, tooltipStyle } from '../shared/charts/ChartCard';
import { Avatar } from '../shared/Avatar';
import {
  attendanceSummary,
  attendanceTrend,
  weeklyAttendance,
  monthlyAttendanceInsights,
  attendanceRecords,
  type AttendanceStatus,
} from '../../data/mockAttendance';
import type { FilterDepartment } from '../../types/employee';

const departments: FilterDepartment[] = [
  'All Departments', 'IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations',
];

const statuses: (AttendanceStatus | 'All')[] = ['All', 'Present', 'Absent', 'On Leave', 'Late', 'Half Day'];

function getAttendanceStatusColor(status: AttendanceStatus): string {
  switch (status) {
    case 'Present': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Absent': return 'bg-red-50 text-red-700 border-red-200';
    case 'On Leave': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Late': return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'Half Day': return 'bg-blue-50 text-blue-700 border-blue-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

export function AttendanceView() {
  const [department, setDepartment] = useState<FilterDepartment>('All Departments');
  const [status, setStatus] = useState<AttendanceStatus | 'All'>('All');
  const [dateFrom, setDateFrom] = useState('2024-06-01');
  const [dateTo, setDateTo] = useState('2024-06-23');

  const filtered = useMemo(() => {
    return attendanceRecords.filter((r) => {
      const matchesDept = department === 'All Departments' || r.department === department;
      const matchesStatus = status === 'All' || r.status === status;
      const matchesDate = r.date >= dateFrom && r.date <= dateTo;
      return matchesDept && matchesStatus && matchesDate;
    });
  }, [department, status, dateFrom, dateTo]);

  return (
    <div className="h-full flex flex-col min-h-0 gap-3 overflow-y-auto pr-1">
      <div className="shrink-0">
        <h1 className="text-base font-semibold text-text">Attendance Dashboard</h1>
        <p className="text-xs text-text-muted mt-0.5">Track daily attendance, shifts, and time-off patterns</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 shrink-0">
        <StatCard label="Attendance Rate" value={`${attendanceSummary.attendanceRate}%`} icon={CalendarCheck} iconColor="text-primary" iconBg="bg-primary/10" trend={{ value: '+1.2% vs last month', positive: true }} />
        <StatCard label="Present Today" value={attendanceSummary.presentToday} icon={UserCheck} iconColor="text-secondary" iconBg="bg-secondary/10" />
        <StatCard label="Absent Today" value={attendanceSummary.absentToday} icon={UserX} iconColor="text-red-500" iconBg="bg-red-50" />
        <StatCard label="On Leave" value={attendanceSummary.onLeave} icon={Plane} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 shrink-0">
        <ChartCard title="Attendance Trend">
          <ChartArea minHeight={160}>
            <AreaChart data={attendanceTrend} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={28} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="rate" stroke="#2563EB" strokeWidth={2} fill="url(#attGrad)" name="Rate %" />
            </AreaChart>
          </ChartArea>
        </ChartCard>

        <ChartCard title="Weekly Overview">
          <ChartArea minHeight={160}>
            <BarChart data={weeklyAttendance} barSize={12} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={32} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="present" fill="#10B981" radius={[2, 2, 0, 0]} name="Present" />
              <Bar dataKey="absent" fill="#EF4444" radius={[2, 2, 0, 0]} name="Absent" />
              <Bar dataKey="leave" fill="#F59E0B" radius={[2, 2, 0, 0]} name="Leave" />
            </BarChart>
          </ChartArea>
        </ChartCard>

        <ChartCard title="Monthly Insights">
          <ChartArea minHeight={160}>
            <LineChart data={monthlyAttendanceInsights} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={28} domain={[90, 96]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 2 }} name="Rate %" />
            </LineChart>
          </ChartArea>
        </ChartCard>
      </div>

      <div className="rounded-xl border border-border/80 bg-card shadow-sm overflow-hidden shrink-0">
        <div className="px-3 py-2.5 border-b border-border/50 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xs font-semibold text-text">Attendance Records</h2>
          <div className="flex flex-wrap items-center gap-1.5">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value as FilterDepartment)}
              className="rounded-lg border border-border/70 bg-background px-2 py-1.5 text-xs text-text focus:outline-none"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d === 'All Departments' ? 'All Depts' : d}</option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as AttendanceStatus | 'All')}
              className="rounded-lg border border-border/70 bg-background px-2 py-1.5 text-xs text-text focus:outline-none"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-lg border border-border/70 bg-background px-2 py-1.5 text-xs text-text focus:outline-none"
            />
            <span className="text-[10px] text-text-muted">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="rounded-lg border border-border/70 bg-background px-2 py-1.5 text-xs text-text focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border/40 bg-gray-50/60">
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Employee</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Department</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Check In</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Check Out</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Hours</th>
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
                  <td className="px-3 py-2.5 text-xs text-text tabular-nums">{record.checkIn}</td>
                  <td className="px-3 py-2.5 text-xs text-text tabular-nums">{record.checkOut}</td>
                  <td className="px-3 py-2.5 text-xs text-text tabular-nums">{record.hoursWorked > 0 ? `${record.hoursWorked}h` : '—'}</td>
                  <td className="px-3 py-2.5">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${getAttendanceStatusColor(record.status)}`}>
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
