import { MapPin, User, Briefcase, MoreHorizontal, Eye, Pencil } from 'lucide-react';
import type { Employee } from '../../types/employee';
import { getStatusColor, getHealthColor } from '../../utils/healthIndicator';
import { Avatar } from '../shared/Avatar';

interface EmployeeCardProps {
  employee: Employee;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
}

export function EmployeeCard({ employee, onView, onEdit }: EmployeeCardProps) {
  return (
    <div className="card-hover rounded-xl border border-border/80 bg-card p-4 shadow-sm shadow-black/[0.02]">
      <div className="flex items-start gap-3">
        <Avatar name={employee.fullName} size="md" healthRisk={employee.healthRisk} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-medium text-text truncate">{employee.fullName}</h3>
              <p className="text-[10px] text-text-muted">{employee.employeeId}</p>
            </div>
            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${getStatusColor(employee.status)}`}>
              {employee.status}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-text-muted">{employee.designation}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
          <Briefcase className="h-3 w-3 shrink-0" />
          <span className="truncate">{employee.department}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{employee.workLocation}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
          <User className="h-3 w-3 shrink-0" />
          <span className="truncate">{employee.manager}</span>
        </div>
        <div className="text-[11px] text-text-muted">
          {employee.yearsOfExperience} yrs exp.
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getHealthColor(employee.healthRisk)}`}>
          {employee.healthRisk}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => onView(employee)}
            className="rounded-md p-1.5 text-text-muted hover:bg-primary/10 hover:text-primary transition-all duration-200"
            title="View Profile"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onEdit(employee)}
            className="rounded-md p-1.5 text-text-muted hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
            title="Edit"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            className="rounded-md p-1.5 text-text-muted hover:bg-gray-100 hover:text-text transition-all duration-200"
            title="More Actions"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
