import { useMemo } from 'react';
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
import { Plus, Users, UserCheck, UserMinus, UserPlus, TrendingUp } from 'lucide-react';
import type { Employee, FilterDepartment, FilterStatus } from '../../types/employee';
import { EmployeeFilters } from './EmployeeFilters';
import { EmployeeCard } from './EmployeeCard';
import { StatCard } from '../shared/StatCard';
import { ChartCard, ChartArea, tooltipStyle } from '../shared/charts/ChartCard';
import { Avatar } from '../shared/Avatar';
import { departmentDistribution, workforceGrowth, dashboardStats } from '../../data/mockData';

interface EmployeeDirectoryProps {
  employees: Employee[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  department: FilterDepartment;
  onDepartmentChange: (d: FilterDepartment) => void;
  status: FilterStatus;
  onStatusChange: (s: FilterStatus) => void;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onAddEmployee: () => void;
}

export function EmployeeDirectory({
  employees,
  searchQuery,
  onSearchChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
  onView,
  onEdit,
  onAddEmployee,
}: EmployeeDirectoryProps) {
  const filtered = useMemo(() => {
    return employees.filter((emp) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        emp.fullName.toLowerCase().includes(q) ||
        emp.employeeId.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        emp.manager.toLowerCase().includes(q) ||
        (emp.departmentFields.primaryTechnology?.toLowerCase().includes(q) ?? false);
      const matchesDept = department === 'All Departments' || emp.department === department;
      const matchesStatus = status === 'All' || emp.status === status;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, searchQuery, department, status]);

  const stats = useMemo(() => {
    const active = employees.filter((e) => e.status === 'Active').length;
    const onLeave = employees.filter((e) => e.status === 'On Leave').length;
    const probation = employees.filter((e) => e.status === 'Probation').length;
    const avgExp = Math.round(employees.reduce((s, e) => s + e.yearsOfExperience, 0) / employees.length * 10) / 10;
    return { total: employees.length, active, onLeave, probation, avgExp };
  }, [employees]);

  const deptBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    employees.forEach((e) => {
      counts[e.department] = (counts[e.department] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      color: departmentDistribution.find((d) => d.name === name)?.color ?? '#2563EB',
    }));
  }, [employees]);

  const recentHires = useMemo(() => {
    return [...employees]
      .sort((a, b) => new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime())
      .slice(0, 4);
  }, [employees]);

  return (
    <section className="h-full flex flex-col min-h-0 overflow-y-auto pr-1 gap-3">
      <div className="flex items-center justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-base font-semibold text-text">Employee Management</h2>
          <p className="text-xs text-text-muted">Workforce directory, analytics, and employee intelligence</p>
        </div>
        <button
          onClick={onAddEmployee}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-highlight px-3.5 py-2 text-xs font-medium text-white btn-hover shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Employee
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 shrink-0">
        <StatCard label="Total Employees" value={dashboardStats.totalEmployees} icon={Users} iconColor="text-primary" iconBg="bg-primary/10" subtext={`${stats.total} in directory`} />
        <StatCard label="Active" value={stats.active} icon={UserCheck} iconColor="text-secondary" iconBg="bg-secondary/10" subtext={`${dashboardStats.activePercentage}% workforce`} />
        <StatCard label="On Leave" value={stats.onLeave} icon={UserMinus} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <StatCard label="New Joiners" value={dashboardStats.newJoiners} icon={UserPlus} iconColor="text-highlight" iconBg="bg-highlight/10" subtext="this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 shrink-0">
        <div className="rounded-xl border border-border/80 bg-card p-3.5 shadow-sm">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2.5">Workforce Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Active Today</span>
              <span className="font-semibold text-text">{dashboardStats.activeToday}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">On Probation</span>
              <span className="font-semibold text-text">{stats.probation}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Avg Experience</span>
              <span className="font-semibold text-text">{stats.avgExp} yrs</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Attention Needed</span>
              <span className="font-semibold text-amber-600">{dashboardStats.attentionNeeded}</span>
            </div>
          </div>
        </div>

        <ChartCard title="Department Breakdown">
          <ChartArea minHeight={120}>
            <BarChart data={deptBreakdown} barSize={16} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={24} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {deptBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartArea>
        </ChartCard>

        <ChartCard title="Employee Growth">
          <ChartArea minHeight={120}>
            <LineChart data={workforceGrowth} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={28} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 2 }} />
            </LineChart>
          </ChartArea>
        </ChartCard>
      </div>

      <div className="rounded-xl border border-border/80 bg-card p-3 shadow-sm shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Recent Hires</h3>
          <TrendingUp className="h-3.5 w-3.5 text-secondary" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {recentHires.map((emp) => (
            <button
              key={emp.id}
              onClick={() => onView(emp)}
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/50 p-2 hover:bg-gray-50 transition-colors text-left"
            >
              <Avatar name={emp.fullName} size="sm" healthRisk={emp.healthRisk} />
              <div className="min-w-0">
                <p className="text-xs font-medium text-text truncate">{emp.fullName}</p>
                <p className="text-[10px] text-text-muted">{emp.department} · {emp.joiningDate}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="shrink-0">
        <EmployeeFilters
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          department={department}
          onDepartmentChange={onDepartmentChange}
          status={status}
          onStatusChange={onStatusChange}
          resultCount={filtered.length}
          compact
        />
      </div>

      <div className="shrink-0 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} onView={onView} onEdit={onEdit} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-8 rounded-xl border border-dashed border-border/80">
            <p className="text-sm text-text-muted">No employees match your search criteria.</p>
            <button
              onClick={() => {
                onSearchChange('');
                onDepartmentChange('All Departments');
                onStatusChange('All');
              }}
              className="mt-2 text-xs text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
