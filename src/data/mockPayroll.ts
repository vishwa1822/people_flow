export type PayrollStatus = 'Processed' | 'Pending' | 'On Hold';

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  salary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: PayrollStatus;
}

export const payrollSummary = {
  totalPayroll: 1248500,
  pendingPayments: 12,
  processedSalaries: 138,
  averageSalary: 8323,
};

export const payrollDistribution = [
  { range: '< $5K', count: 18, color: '#94A3B8' },
  { range: '$5K–$8K', count: 52, color: '#2563EB' },
  { range: '$8K–$12K', count: 48, color: '#4F46E5' },
  { range: '$12K–$15K', count: 22, color: '#10B981' },
  { range: '> $15K', count: 10, color: '#F59E0B' },
];

export const monthlyPayrollTrend = [
  { month: 'Jan', amount: 1180000 },
  { month: 'Feb', amount: 1195000 },
  { month: 'Mar', amount: 1202000 },
  { month: 'Apr', amount: 1218000 },
  { month: 'May', amount: 1234000 },
  { month: 'Jun', amount: 1248500 },
];

export const salaryBreakdown = [
  { name: 'Base Salary', value: 78, color: '#2563EB' },
  { name: 'Bonuses', value: 12, color: '#10B981' },
  { name: 'Benefits', value: 7, color: '#8B5CF6' },
  { name: 'Deductions', value: 3, color: '#F59E0B' },
];

export const payrollRecords: PayrollRecord[] = [
  { id: 'p1', employeeId: 'EMP-001', employeeName: 'Sarah Chen', department: 'IT', salary: 9500, bonus: 1200, deductions: 850, netPay: 9850, status: 'Processed' },
  { id: 'p2', employeeId: 'EMP-002', employeeName: 'James Wilson', department: 'Finance', salary: 8200, bonus: 800, deductions: 720, netPay: 8280, status: 'Processed' },
  { id: 'p3', employeeId: 'EMP-003', employeeName: 'Emma Rodriguez', department: 'HR', salary: 9800, bonus: 1500, deductions: 920, netPay: 10380, status: 'Processed' },
  { id: 'p4', employeeId: 'EMP-004', employeeName: 'Michael Brown', department: 'Sales', salary: 7500, bonus: 2100, deductions: 680, netPay: 8920, status: 'On Hold' },
  { id: 'p5', employeeId: 'EMP-005', employeeName: 'Sophia Lee', department: 'Marketing', salary: 7800, bonus: 950, deductions: 650, netPay: 8100, status: 'Processed' },
  { id: 'p6', employeeId: 'EMP-006', employeeName: 'David Park', department: 'IT', salary: 12500, bonus: 2000, deductions: 1100, netPay: 13400, status: 'Processed' },
  { id: 'p7', employeeId: 'EMP-007', employeeName: 'Olivia Martinez', department: 'Operations', salary: 9200, bonus: 1100, deductions: 800, netPay: 9500, status: 'Processed' },
  { id: 'p8', employeeId: 'EMP-008', employeeName: 'William Taylor', department: 'IT', salary: 5800, bonus: 400, deductions: 420, netPay: 5780, status: 'Pending' },
  { id: 'p9', employeeId: 'EMP-009', employeeName: 'Isabella Garcia', department: 'Sales', salary: 8000, bonus: 1800, deductions: 700, netPay: 9100, status: 'Processed' },
  { id: 'p10', employeeId: 'EMP-010', employeeName: 'Benjamin Clark', department: 'Finance', salary: 8800, bonus: 0, deductions: 750, netPay: 8050, status: 'On Hold' },
  { id: 'p11', employeeId: 'EMP-011', employeeName: 'Ava Johnson', department: 'HR', salary: 6500, bonus: 500, deductions: 520, netPay: 6480, status: 'Processed' },
  { id: 'p12', employeeId: 'EMP-012', employeeName: 'Ethan Davis', department: 'Marketing', salary: 5200, bonus: 300, deductions: 380, netPay: 5120, status: 'Pending' },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}
