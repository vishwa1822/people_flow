import { Search, Filter, X } from 'lucide-react';
import type { FilterDepartment, FilterStatus } from '../../types/employee';

interface EmployeeFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  department: FilterDepartment;
  onDepartmentChange: (d: FilterDepartment) => void;
  status: FilterStatus;
  onStatusChange: (s: FilterStatus) => void;
  resultCount: number;
  compact?: boolean;
}

const departments: FilterDepartment[] = [
  'All Departments', 'IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations',
];

const statuses: FilterStatus[] = ['All', 'Active', 'On Leave', 'Probation', 'Inactive'];

export function EmployeeFilters({
  searchQuery,
  onSearchChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
  resultCount,
  compact = false,
}: EmployeeFiltersProps) {
  const hasFilters = department !== 'All Departments' || status !== 'All' || searchQuery;

  return (
    <div className={compact ? 'space-y-2' : 'space-y-4'}>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, ID, email, department..."
            className={`w-full rounded-lg border border-border/80 bg-card pl-9 pr-3 text-text placeholder:text-text-muted focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all ${
              compact ? 'py-1.5 text-xs' : 'py-2.5 text-sm'
            }`}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-text-muted shrink-0" />
          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value as FilterDepartment)}
            className={`rounded-lg border border-border/80 bg-card px-2.5 text-text focus:outline-none focus:ring-1 focus:ring-primary/20 ${
              compact ? 'py-1.5 text-xs' : 'py-2.5 text-sm'
            }`}
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as FilterStatus)}
            className={`rounded-lg border border-border/80 bg-card px-2.5 text-text focus:outline-none focus:ring-1 focus:ring-primary/20 ${
              compact ? 'py-1.5 text-xs' : 'py-2.5 text-sm'
            }`}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className={`text-text-muted ${compact ? 'text-[11px]' : 'text-sm'}`}>
          Showing <span className="font-medium text-text">{resultCount}</span> employees
        </p>
        {hasFilters && (
          <button
            onClick={() => {
              onSearchChange('');
              onDepartmentChange('All Departments');
              onStatusChange('All');
            }}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
