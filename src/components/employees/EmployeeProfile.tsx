import { X, Mail, Phone, MapPin, Building2, Calendar, Briefcase, User } from 'lucide-react';
import type { Employee } from '../../types/employee';
import { getStatusColor, getHealthColor } from '../../utils/healthIndicator';
import { Avatar } from '../shared/Avatar';

interface EmployeeProfileProps {
  employee: Employee;
  onClose: () => void;
}

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-text-muted">{label}</span>
        <span className="font-medium text-text">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-full progress-bar ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value, accent = 'text-primary' }: {
  icon: typeof User;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-background/80 p-2">
      <Icon className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${accent}`} />
      <div className="min-w-0">
        <p className="text-[10px] text-text-muted">{label}</p>
        <p className="text-xs font-medium text-text truncate">{value}</p>
      </div>
    </div>
  );
}

export function EmployeeProfile({ employee, onClose }: EmployeeProfileProps) {
  return (
    <div className="fixed inset-0 z-50 flex overlay">
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-xl bg-card shadow-2xl animate-slide-in-right flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="relative shrink-0 bg-gradient-to-br from-primary/5 to-highlight/5 px-5 py-4 border-b border-border/60">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-1.5 text-text-muted hover:bg-white/80 hover:text-text transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 pr-8">
            <Avatar name={employee.fullName} size="lg" />
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-text truncate">{employee.fullName}</h2>
              <p className="text-xs text-text-muted">{employee.designation}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getHealthColor(employee.healthRisk)}`}>
                  {employee.healthRisk}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content — 3-column layout, no scroll */}
        <div className="flex-1 min-h-0 p-4 grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden">
          <section className="flex flex-col min-h-0">
            <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">Personal</h3>
            <div className="space-y-1.5 flex-1">
              <InfoItem icon={User} label="Employee ID" value={employee.employeeId} />
              <InfoItem icon={Mail} label="Email" value={employee.email} />
              <InfoItem icon={Phone} label="Phone" value={employee.phone} />
              <InfoItem icon={MapPin} label="Address" value={employee.address} />
            </div>
          </section>

          <section className="flex flex-col min-h-0">
            <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">Work</h3>
            <div className="space-y-1.5 flex-1">
              <InfoItem icon={Building2} label="Department" value={employee.department} accent="text-secondary" />
              <InfoItem icon={Briefcase} label="Designation" value={employee.designation} accent="text-secondary" />
              <InfoItem icon={User} label="Manager" value={employee.manager} accent="text-secondary" />
              <InfoItem icon={Calendar} label="Joined" value={employee.joiningDate} accent="text-secondary" />
              <InfoItem icon={MapPin} label="Location" value={employee.workLocation} accent="text-secondary" />
            </div>
          </section>

          <section className="flex flex-col min-h-0">
            <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">Performance</h3>
            <div className="rounded-xl border border-border/60 bg-background/50 p-3 space-y-3 flex-1">
              <MetricBar label="Attendance" value={employee.attendanceRate} color="bg-secondary" />
              <MetricBar label="Tasks" value={employee.taskCompletion} color="bg-primary" />
              <MetricBar label="Score" value={employee.performanceScore} color="bg-highlight" />
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-[11px] text-text-muted">Active Projects</span>
                <span className="text-sm font-semibold text-text">{employee.activeProjects}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
