import { useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import type { Employee, FilterDepartment, FilterStatus } from '../../types/employee';
import { getStatusColor } from '../../utils/healthIndicator';
import { Avatar } from '../shared/Avatar';

interface DashboardEmployeePanelProps {
  employees: Employee[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  department: FilterDepartment;
  onDepartmentChange: (d: FilterDepartment) => void;
  status: FilterStatus;
  onStatusChange: (s: FilterStatus) => void;
  onView: (employee: Employee) => void;
  onViewAll: () => void;
  onAddEmployee: () => void;
  maxRows?: number;
}

const departments: FilterDepartment[] = [
  'All Departments', 'IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations',
];

const statuses: FilterStatus[] = ['All', 'Active', 'On Leave', 'Probation', 'Inactive'];

export function DashboardEmployeePanel({
  employees,
  searchQuery,
  onSearchChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
  onView,
  onViewAll,
  onAddEmployee,
  maxRows = 5,
}: DashboardEmployeePanelProps) {
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

  const preview = filtered.slice(0, maxRows);

  return (
    <div className="flex flex-col h-full min-h-0 rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="shrink-0 px-3 py-2 border-b border-border/50">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Team Directory
          </h2>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onAddEmployee}
              className="text-[11px] font-medium text-primary hover:opacity-80 transition-opacity"
            >
              + Add
            </button>
            <button
              onClick={onViewAll}
              className="flex items-center gap-0.5 text-[11px] font-medium text-text-muted hover:text-text transition-colors"
            >
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search team..."
              className="w-full rounded-lg border border-border/70 bg-background py-1.5 pl-7 pr-2 text-xs text-text placeholder:text-text-muted focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/15"
            />
          </div>
          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value as FilterDepartment)}
            className="rounded-lg border border-border/70 bg-background px-2 py-1.5 text-xs text-text focus:outline-none w-[68px] sm:w-auto"
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d === 'All Departments' ? 'All' : d}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as FilterStatus)}
            className="rounded-lg border border-border/70 bg-background px-2 py-1.5 text-xs text-text focus:outline-none w-[68px] sm:w-auto"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'Status' : s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* List — fills remaining space */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="shrink-0 grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] gap-2 px-3 py-1.5 border-b border-border/40 bg-gray-50/60">
          <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">Employee</span>
          <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium hidden sm:block">Dept</span>
          <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium text-right sm:text-left">Status</span>
        </div>

        <div className="flex-1 min-h-0 divide-y divide-border/40">
          {preview.map((emp) => (
            <button
              key={emp.id}
              type="button"
              onClick={() => onView(emp)}
              className="w-full grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] gap-2 items-center px-3 py-2 hover:bg-gray-50/70 transition-colors text-left group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Avatar name={emp.fullName} size="xs" healthRisk={emp.healthRisk} />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-text truncate">{emp.fullName}</p>
                  <p className="text-[10px] text-text-muted truncate">{emp.designation}</p>
                </div>
              </div>
              <span className="text-[10px] text-text-muted hidden sm:block truncate max-w-[80px]">
                {emp.department}
              </span>
              <span className={`justify-self-end rounded-full border px-2 py-0.5 text-[9px] font-medium whitespace-nowrap ${getStatusColor(emp.status)}`}>
                {emp.status}
              </span>
            </button>
          ))}
          {preview.length === 0 && (
            <p className="text-xs text-text-muted text-center py-8">No matches found</p>
          )}
        </div>
      </div>

      <div className="shrink-0 px-3 py-1.5 border-t border-border/50 bg-gray-50/40 flex items-center justify-between">
        <p className="text-[10px] text-text-muted">
          {preview.length} of {filtered.length} · {employees.length} total
        </p>
        <button
          onClick={onViewAll}
          className="text-[10px] font-medium text-primary sm:hidden"
        >
          See all
        </button>
      </div>
    </div>
  );
}
