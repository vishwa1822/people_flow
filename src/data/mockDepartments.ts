import type { Department } from '../types/employee';

export interface DepartmentRecord {
  id: string;
  name: Department;
  head: string;
  employeeCount: number;
  activeProjects: number;
  budgetUtilization: number;
  performance: number;
  budget: number;
  growth: number;
}

export const departments: DepartmentRecord[] = [
  {
    id: 'dept-it',
    name: 'IT',
    head: 'David Park',
    employeeCount: 35,
    activeProjects: 12,
    budgetUtilization: 78,
    performance: 92,
    budget: 2400000,
    growth: 8.5,
  },
  {
    id: 'dept-hr',
    name: 'HR',
    head: 'Emma Rodriguez',
    employeeCount: 12,
    activeProjects: 6,
    budgetUtilization: 65,
    performance: 88,
    budget: 850000,
    growth: 4.2,
  },
  {
    id: 'dept-finance',
    name: 'Finance',
    head: 'Robert Kim',
    employeeCount: 15,
    activeProjects: 4,
    budgetUtilization: 71,
    performance: 90,
    budget: 1200000,
    growth: 3.8,
  },
  {
    id: 'dept-sales',
    name: 'Sales',
    head: 'Jennifer Adams',
    employeeCount: 22,
    activeProjects: 8,
    budgetUtilization: 84,
    performance: 86,
    budget: 1800000,
    growth: 12.1,
  },
  {
    id: 'dept-marketing',
    name: 'Marketing',
    head: 'Chris Martinez',
    employeeCount: 18,
    activeProjects: 9,
    budgetUtilization: 69,
    performance: 84,
    budget: 1100000,
    growth: 6.7,
  },
  {
    id: 'dept-operations',
    name: 'Operations',
    head: 'Olivia Martinez',
    employeeCount: 18,
    activeProjects: 5,
    budgetUtilization: 73,
    performance: 87,
    budget: 1350000,
    growth: 5.4,
  },
];

export const departmentSummary = {
  totalDepartments: 6,
  totalEmployees: 150,
  largestDepartment: 'IT',
  averageTeamSize: 25,
};

export const departmentGrowthTrend = [
  { month: 'Jan', IT: 32, HR: 11, Finance: 14, Sales: 19, Marketing: 16, Operations: 17 },
  { month: 'Feb', IT: 33, HR: 11, Finance: 14, Sales: 20, Marketing: 16, Operations: 17 },
  { month: 'Mar', IT: 33, HR: 12, Finance: 14, Sales: 20, Marketing: 17, Operations: 17 },
  { month: 'Apr', IT: 34, HR: 12, Finance: 15, Sales: 21, Marketing: 17, Operations: 18 },
  { month: 'May', IT: 34, HR: 12, Finance: 15, Sales: 21, Marketing: 18, Operations: 18 },
  { month: 'Jun', IT: 35, HR: 12, Finance: 15, Sales: 22, Marketing: 18, Operations: 18 },
];

export const headcountAnalytics = [
  { department: 'IT', headcount: 35, capacity: 40 },
  { department: 'Sales', headcount: 22, capacity: 25 },
  { department: 'Marketing', headcount: 18, capacity: 22 },
  { department: 'Operations', headcount: 18, capacity: 20 },
  { department: 'Finance', headcount: 15, capacity: 18 },
  { department: 'HR', headcount: 12, capacity: 15 },
];
