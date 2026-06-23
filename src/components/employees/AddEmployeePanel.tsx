import { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import type { Department, EmployeeStatus, EmploymentType } from '../../types/employee';

interface AddEmployeePanelProps {
  onClose: () => void;
  onSubmit: () => void;
}

const departments: Department[] = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];
const statuses: EmployeeStatus[] = ['Active', 'On Leave', 'Probation', 'Inactive'];
const employmentTypes: EmploymentType[] = ['Full-time', 'Part-time', 'Contract', 'Intern'];

export function AddEmployeePanel({ onClose, onSubmit }: AddEmployeePanelProps) {
  const [department, setDepartment] = useState<Department>('IT');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex overlay">
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-lg bg-card shadow-2xl animate-slide-in-right overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-primary to-highlight p-2">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text">Add Employee</h2>
              <p className="text-xs text-text-muted">Create a new employee profile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-text-muted hover:bg-gray-100 hover:text-text transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Employee ID</label>
              <input type="text" placeholder="EMP-XXX" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Full Name</label>
              <input type="text" placeholder="John Doe" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Email</label>
              <input type="email" placeholder="john@company.com" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Phone Number</label>
              <input type="tel" placeholder="+1 (555) 000-0000" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Designation</label>
              <input type="text" placeholder="Software Engineer" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Manager</label>
              <input type="text" placeholder="Manager name" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Employment Type</label>
              <select className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                {employmentTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Joining Date</label>
              <input type="date" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Status</label>
              <select className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-text-muted mb-1.5">Location</label>
              <input type="text" placeholder="City, State" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          {/* Dynamic Department Fields */}
          <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-highlight/5 p-4 animate-fade-in">
            <h3 className="text-sm font-semibold text-text mb-3">{department} Department Fields</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {department === 'IT' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Primary Technology</label>
                    <input type="text" placeholder="React, Python..." className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">GitHub Username</label>
                    <input type="text" placeholder="username" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Assigned Project</label>
                    <input type="text" placeholder="Project name" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Experience Level</label>
                    <select className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option>Junior</option>
                      <option>Mid</option>
                      <option>Senior</option>
                      <option>Lead</option>
                    </select>
                  </div>
                </>
              )}
              {department === 'HR' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Recruitment Team</label>
                    <input type="text" placeholder="Team name" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Employees Managed</label>
                    <input type="number" placeholder="0" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Specialization</label>
                    <input type="text" placeholder="Talent Acquisition, etc." className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </>
              )}
              {department === 'Finance' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Financial Role</label>
                    <input type="text" placeholder="Analyst, Accountant..." className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Certification</label>
                    <input type="text" placeholder="CPA, CFA..." className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Reporting Manager</label>
                    <input type="text" placeholder="Manager name" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </>
              )}
              {department === 'Marketing' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Campaign Name</label>
                    <input type="text" placeholder="Campaign" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Marketing Channel</label>
                    <input type="text" placeholder="Digital, Social..." className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Monthly Target</label>
                    <input type="number" placeholder="50000" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </>
              )}
              {department === 'Sales' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Sales Region</label>
                    <input type="text" placeholder="Midwest, Southeast..." className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Sales Target</label>
                    <input type="number" placeholder="500000" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Achievement</label>
                    <input type="number" placeholder="420000" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </>
              )}
              {department === 'Operations' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Operational Area</label>
                    <input type="text" placeholder="Supply Chain..." className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Shift</label>
                    <select className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option>Day</option>
                      <option>Night</option>
                      <option>Rotating</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Supervisor</label>
                    <input type="text" placeholder="Supervisor name" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-gradient-to-r from-primary to-highlight px-4 py-2.5 text-sm font-medium text-white btn-hover disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating...
                </span>
              ) : (
                'Add Employee'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
