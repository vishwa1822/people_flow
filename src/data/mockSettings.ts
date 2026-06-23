export interface OrganizationSettings {
  companyName: string;
  industry: string;
  timeZone: string;
  address: string;
}

export interface Role {
  id: string;
  name: string;
  users: number;
  permissions: string[];
}

export interface ReportHistoryItem {
  id: string;
  name: string;
  category: string;
  generatedAt: string;
  format: string;
  size: string;
}

export const organizationSettings: OrganizationSettings = {
  companyName: 'PeopleFlow Inc.',
  industry: 'Technology & Services',
  timeZone: 'America/Los_Angeles (PST)',
  address: '500 Market Street, Suite 1200, San Francisco, CA 94105',
};

export const roles: Role[] = [
  { id: 'r1', name: 'Super Admin', users: 2, permissions: ['Full Access', 'User Management', 'Billing', 'Security'] },
  { id: 'r2', name: 'HR Manager', users: 5, permissions: ['Employees', 'Attendance', 'Payroll', 'Reports'] },
  { id: 'r3', name: 'Department Head', users: 12, permissions: ['Team View', 'Attendance', 'Reports'] },
  { id: 'r4', name: 'Employee', users: 131, permissions: ['Self Service', 'Leave Requests'] },
];

export const reportCategories = [
  { id: 'employee', name: 'Employee Reports', description: 'Headcount, demographics, and tenure analysis', count: 24, icon: 'users' },
  { id: 'payroll', name: 'Payroll Reports', description: 'Salary summaries, tax filings, and compensation', count: 18, icon: 'dollar' },
  { id: 'attendance', name: 'Attendance Reports', description: 'Daily logs, leave patterns, and shift compliance', count: 15, icon: 'clock' },
  { id: 'department', name: 'Department Reports', description: 'Org structure, budget, and team performance', count: 12, icon: 'building' },
  { id: 'performance', name: 'Performance Reports', description: 'Reviews, goals, and productivity metrics', count: 9, icon: 'chart' },
];

export const reportHistory: ReportHistoryItem[] = [
  { id: 'rh1', name: 'Monthly Workforce Summary', category: 'Employee Reports', generatedAt: 'Jun 22, 2024 · 09:15 AM', format: 'PDF', size: '2.4 MB' },
  { id: 'rh2', name: 'Q2 Payroll Analysis', category: 'Payroll Reports', generatedAt: 'Jun 20, 2024 · 02:30 PM', format: 'XLSX', size: '1.8 MB' },
  { id: 'rh3', name: 'Weekly Attendance Log', category: 'Attendance Reports', generatedAt: 'Jun 19, 2024 · 08:00 AM', format: 'CSV', size: '540 KB' },
  { id: 'rh4', name: 'Department Headcount Report', category: 'Department Reports', generatedAt: 'Jun 18, 2024 · 11:45 AM', format: 'PDF', size: '1.2 MB' },
  { id: 'rh5', name: 'Performance Review Summary', category: 'Performance Reports', generatedAt: 'Jun 15, 2024 · 04:20 PM', format: 'PDF', size: '3.1 MB' },
];

export const reportsSummary = {
  generatedReports: 78,
  workforceGrowth: '+4.3%',
  attendanceInsights: '94.2%',
  payrollReports: 18,
};
