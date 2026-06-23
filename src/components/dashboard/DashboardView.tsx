import { useState, useEffect } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { CompactAlerts } from './CompactAlerts';
import { DashboardEmployeePanel } from './DashboardEmployeePanel';
import type { Employee, FilterDepartment, FilterStatus } from '../../types/employee';

interface DashboardViewProps {
  employees: Employee[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  department: FilterDepartment;
  onDepartmentChange: (d: FilterDepartment) => void;
  status: FilterStatus;
  onStatusChange: (s: FilterStatus) => void;
  onView: (employee: Employee) => void;
  onViewAllEmployees: () => void;
  onAddEmployee: () => void;
}

type PanelTab = 'alerts' | 'team';

export function DashboardView({
  employees,
  searchQuery,
  onSearchChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
  onView,
  onViewAllEmployees,
  onAddEmployee,
}: DashboardViewProps) {
  const [mobileTab, setMobileTab] = useState<PanelTab>('team');
  const [maxRows, setMaxRows] = useState(4);

  useEffect(() => {
    const update = () => setMaxRows(window.innerWidth >= 1024 ? 6 : 4);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="h-full min-h-0 grid grid-rows-[auto_auto_1fr] gap-2 lg:gap-3">
      <DashboardHeader />

      {/* Mobile / tablet tab switcher */}
      <div className="lg:hidden shrink-0 flex rounded-xl border border-border/70 bg-card p-1 shadow-sm">
        {(['alerts', 'team'] as PanelTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all duration-200 ${
              mobileTab === tab
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-muted hover:text-text'
            }`}
          >
            {tab === 'team' ? 'Team Directory' : 'Smart Alerts'}
          </button>
        ))}
      </div>

      {/* Desktop: side-by-side | Mobile: tabbed single panel */}
      <div className="min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(240px,28%)_1fr] gap-2 lg:gap-3 overflow-hidden">
        <div
          className={`min-h-0 overflow-hidden ${
            mobileTab === 'alerts' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'
          }`}
        >
          <CompactAlerts />
        </div>
        <div
          className={`min-h-0 overflow-hidden ${
            mobileTab === 'team' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'
          }`}
        >
          <DashboardEmployeePanel
            employees={employees}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            department={department}
            onDepartmentChange={onDepartmentChange}
            status={status}
            onStatusChange={onStatusChange}
            onView={onView}
            onViewAll={onViewAllEmployees}
            onAddEmployee={onAddEmployee}
            maxRows={maxRows}
          />
        </div>
      </div>
    </div>
  );
}
