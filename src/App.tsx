import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { DashboardView } from './components/dashboard/DashboardView';
import { ReportsView } from './components/reports/ReportsView';
import { EmployeeDirectory } from './components/employees/EmployeeDirectory';
import { EmployeeProfile } from './components/employees/EmployeeProfile';
import { AddEmployeePanel } from './components/employees/AddEmployeePanel';
import { DepartmentsView } from './components/departments/DepartmentsView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { PayrollView } from './components/payroll/PayrollView';
import { SettingsView } from './components/settings/SettingsView';
import { employees as initialEmployees } from './data/mockData';
import type { Employee, FilterDepartment, FilterStatus } from './types/employee';

const NO_SCROLL_PAGES = ['dashboard'];

function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [employees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState<FilterDepartment>('All Departments');
  const [status, setStatus] = useState<FilterStatus>('All');

  const handleAddEmployee = () => setShowAddPanel(true);
  const goToEmployees = () => setActiveNav('employees');
  const goToReports = () => setActiveNav('reports');

  const handleGlobalSearch = (query: string) => {
    setSearchQuery(query);
    if (query && activeNav !== 'dashboard' && activeNav !== 'employees') {
      setActiveNav('employees');
    }
  };

  return (
    <Layout
      activeNav={activeNav}
      onNavigate={setActiveNav}
      onAddEmployee={handleAddEmployee}
      onGoToReports={goToReports}
      searchQuery={searchQuery}
      onSearchChange={handleGlobalSearch}
      noScroll={NO_SCROLL_PAGES.includes(activeNav)}
    >
      {activeNav === 'dashboard' && (
        <DashboardView
          employees={employees}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          department={department}
          onDepartmentChange={setDepartment}
          status={status}
          onStatusChange={setStatus}
          onView={setSelectedEmployee}
          onViewAllEmployees={goToEmployees}
          onAddEmployee={handleAddEmployee}
        />
      )}

      {activeNav === 'employees' && (
        <EmployeeDirectory
          employees={employees}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          department={department}
          onDepartmentChange={setDepartment}
          status={status}
          onStatusChange={setStatus}
          onView={setSelectedEmployee}
          onEdit={setSelectedEmployee}
          onAddEmployee={handleAddEmployee}
        />
      )}

      {activeNav === 'departments' && <DepartmentsView />}

      {activeNav === 'attendance' && <AttendanceView />}

      {activeNav === 'payroll' && <PayrollView />}

      {activeNav === 'reports' && <ReportsView onExport={() => {}} />}

      {activeNav === 'settings' && <SettingsView />}

      {selectedEmployee && (
        <EmployeeProfile
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      {showAddPanel && (
        <AddEmployeePanel
          onClose={() => setShowAddPanel(false)}
          onSubmit={() => {}}
        />
      )}
    </Layout>
  );
}

export default App;
