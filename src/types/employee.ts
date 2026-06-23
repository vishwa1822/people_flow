export type Department = 'IT' | 'HR' | 'Finance' | 'Marketing' | 'Sales' | 'Operations';
export type EmployeeStatus = 'Active' | 'On Leave' | 'Probation' | 'Inactive';
export type HealthRisk = 'Low Risk' | 'Medium Risk' | 'High Risk';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Intern';

export interface DepartmentFields {
  // IT
  primaryTechnology?: string;
  githubUsername?: string;
  assignedProject?: string;
  experienceLevel?: string;
  // HR
  recruitmentTeam?: string;
  employeesManaged?: number;
  specialization?: string;
  // Finance
  financialRole?: string;
  certification?: string;
  reportingManager?: string;
  // Marketing
  campaignName?: string;
  marketingChannel?: string;
  monthlyTarget?: number;
  // Sales
  salesRegion?: string;
  salesTarget?: number;
  achievement?: number;
  // Operations
  operationalArea?: string;
  shift?: string;
  supervisor?: string;
}

export interface Employee {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  department: Department;
  designation: string;
  manager: string;
  employmentType: EmploymentType;
  joiningDate: string;
  workLocation: string;
  status: EmployeeStatus;
  yearsOfExperience: number;
  healthRisk: HealthRisk;
  profileCompletion: number;
  attendanceRate: number;
  activeProjects: number;
  taskCompletion: number;
  performanceScore: number;
  departmentFields: DepartmentFields;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: 'probation' | 'onboarding' | 'profile' | 'leave' | 'compliance';
  timestamp: string;
}

export type FilterDepartment = Department | 'All Departments';
export type FilterStatus = EmployeeStatus | 'All';
