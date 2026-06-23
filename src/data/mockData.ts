import type { Employee, Alert } from '../types/employee';

export const employees: Employee[] = [
  {
    id: '1', employeeId: 'EMP-001', fullName: 'Sarah Chen', email: 'sarah.chen@company.com',
    phone: '+1 (555) 123-4567', address: '123 Tech Lane, San Francisco, CA',
    department: 'IT', designation: 'Senior Software Engineer',
    manager: 'David Park', employmentType: 'Full-time', joiningDate: '2021-03-15',
    workLocation: 'San Francisco', status: 'Active', yearsOfExperience: 6,
    healthRisk: 'Low Risk', profileCompletion: 95, attendanceRate: 96,
    activeProjects: 3, taskCompletion: 92, performanceScore: 88,
    departmentFields: { primaryTechnology: 'React', githubUsername: 'sarahchen', assignedProject: 'PeopleFlow', experienceLevel: 'Senior' },
  },
  {
    id: '2', employeeId: 'EMP-002', fullName: 'James Wilson', email: 'james.wilson@company.com',
    phone: '+1 (555) 234-5678', address: '456 Finance Ave, New York, NY',
    department: 'Finance', designation: 'Financial Analyst',
    manager: 'Robert Kim', employmentType: 'Full-time', joiningDate: '2022-06-01',
    workLocation: 'New York', status: 'Active', yearsOfExperience: 4,
    healthRisk: 'Low Risk', profileCompletion: 88, attendanceRate: 94,
    activeProjects: 2, taskCompletion: 85, performanceScore: 82,
    departmentFields: { financialRole: 'Analyst', certification: 'CFA Level 2', reportingManager: 'Robert Kim' },
  },
  {
    id: '3', employeeId: 'EMP-003', fullName: 'Emma Rodriguez', email: 'emma.rodriguez@company.com',
    phone: '+1 (555) 345-6789', address: '789 HR Blvd, Austin, TX',
    department: 'HR', designation: 'HR Manager',
    manager: 'Lisa Thompson', employmentType: 'Full-time', joiningDate: '2020-01-10',
    workLocation: 'Austin', status: 'Active', yearsOfExperience: 8,
    healthRisk: 'Low Risk', profileCompletion: 100, attendanceRate: 98,
    activeProjects: 4, taskCompletion: 95, performanceScore: 91,
    departmentFields: { recruitmentTeam: 'Tech Hiring', employeesManaged: 45, specialization: 'Talent Acquisition' },
  },
  {
    id: '4', employeeId: 'EMP-004', fullName: 'Michael Brown', email: 'michael.brown@company.com',
    phone: '+1 (555) 456-7890', address: '321 Sales St, Chicago, IL',
    department: 'Sales', designation: 'Sales Executive',
    manager: 'Jennifer Adams', employmentType: 'Full-time', joiningDate: '2023-02-20',
    workLocation: 'Chicago', status: 'On Leave', yearsOfExperience: 3,
    healthRisk: 'Medium Risk', profileCompletion: 72, attendanceRate: 78,
    activeProjects: 1, taskCompletion: 70, performanceScore: 75,
    departmentFields: { salesRegion: 'Midwest', salesTarget: 500000, achievement: 420000 },
  },
  {
    id: '5', employeeId: 'EMP-005', fullName: 'Sophia Lee', email: 'sophia.lee@company.com',
    phone: '+1 (555) 567-8901', address: '654 Marketing Way, Los Angeles, CA',
    department: 'Marketing', designation: 'Marketing Specialist',
    manager: 'Chris Martinez', employmentType: 'Full-time', joiningDate: '2022-09-05',
    workLocation: 'Los Angeles', status: 'Active', yearsOfExperience: 5,
    healthRisk: 'Low Risk', profileCompletion: 90, attendanceRate: 93,
    activeProjects: 3, taskCompletion: 88, performanceScore: 86,
    departmentFields: { campaignName: 'Brand Refresh 2024', marketingChannel: 'Digital', monthlyTarget: 50000 },
  },
  {
    id: '6', employeeId: 'EMP-006', fullName: 'David Park', email: 'david.park@company.com',
    phone: '+1 (555) 678-9012', address: '987 Tech Park, San Francisco, CA',
    department: 'IT', designation: 'Engineering Lead',
    manager: 'CTO Office', employmentType: 'Full-time', joiningDate: '2019-07-22',
    workLocation: 'San Francisco', status: 'Active', yearsOfExperience: 10,
    healthRisk: 'Low Risk', profileCompletion: 98, attendanceRate: 97,
    activeProjects: 5, taskCompletion: 94, performanceScore: 93,
    departmentFields: { primaryTechnology: 'Node.js', githubUsername: 'davidpark', assignedProject: 'Platform Core', experienceLevel: 'Lead' },
  },
  {
    id: '7', employeeId: 'EMP-007', fullName: 'Olivia Martinez', email: 'olivia.martinez@company.com',
    phone: '+1 (555) 789-0123', address: '147 Ops Center, Denver, CO',
    department: 'Operations', designation: 'Operations Manager',
    manager: 'Thomas Wright', employmentType: 'Full-time', joiningDate: '2021-11-08',
    workLocation: 'Denver', status: 'Active', yearsOfExperience: 7,
    healthRisk: 'Low Risk', profileCompletion: 92, attendanceRate: 95,
    activeProjects: 2, taskCompletion: 90, performanceScore: 87,
    departmentFields: { operationalArea: 'Supply Chain', shift: 'Day', supervisor: 'Thomas Wright' },
  },
  {
    id: '8', employeeId: 'EMP-008', fullName: 'William Taylor', email: 'william.taylor@company.com',
    phone: '+1 (555) 890-1234', address: '258 Dev Lane, Seattle, WA',
    department: 'IT', designation: 'Junior Developer',
    manager: 'David Park', employmentType: 'Full-time', joiningDate: '2024-01-15',
    workLocation: 'Seattle', status: 'Probation', yearsOfExperience: 1,
    healthRisk: 'Medium Risk', profileCompletion: 65, attendanceRate: 85,
    activeProjects: 1, taskCompletion: 72, performanceScore: 68,
    departmentFields: { primaryTechnology: 'Python', githubUsername: 'willtaylor', assignedProject: 'Data Pipeline', experienceLevel: 'Junior' },
  },
  {
    id: '9', employeeId: 'EMP-009', fullName: 'Isabella Garcia', email: 'isabella.garcia@company.com',
    phone: '+1 (555) 901-2345', address: '369 Sales Plaza, Miami, FL',
    department: 'Sales', designation: 'Account Manager',
    manager: 'Jennifer Adams', employmentType: 'Full-time', joiningDate: '2023-08-12',
    workLocation: 'Miami', status: 'Active', yearsOfExperience: 4,
    healthRisk: 'Low Risk', profileCompletion: 85, attendanceRate: 91,
    activeProjects: 2, taskCompletion: 83, performanceScore: 80,
    departmentFields: { salesRegion: 'Southeast', salesTarget: 350000, achievement: 310000 },
  },
  {
    id: '10', employeeId: 'EMP-010', fullName: 'Benjamin Clark', email: 'benjamin.clark@company.com',
    phone: '+1 (555) 012-3456', address: '741 Finance Tower, Boston, MA',
    department: 'Finance', designation: 'Senior Accountant',
    manager: 'Robert Kim', employmentType: 'Full-time', joiningDate: '2020-04-30',
    workLocation: 'Boston', status: 'On Leave', yearsOfExperience: 9,
    healthRisk: 'High Risk', profileCompletion: 55, attendanceRate: 70,
    activeProjects: 0, taskCompletion: 60, performanceScore: 65,
    departmentFields: { financialRole: 'Accountant', certification: 'CPA', reportingManager: 'Robert Kim' },
  },
  {
    id: '11', employeeId: 'EMP-011', fullName: 'Ava Johnson', email: 'ava.johnson@company.com',
    phone: '+1 (555) 111-2222', address: '852 HR Center, Portland, OR',
    department: 'HR', designation: 'Recruitment Specialist',
    manager: 'Emma Rodriguez', employmentType: 'Full-time', joiningDate: '2023-05-18',
    workLocation: 'Portland', status: 'Active', yearsOfExperience: 3,
    healthRisk: 'Low Risk', profileCompletion: 78, attendanceRate: 92,
    activeProjects: 2, taskCompletion: 80, performanceScore: 77,
    departmentFields: { recruitmentTeam: 'General Hiring', employeesManaged: 0, specialization: 'Campus Recruitment' },
  },
  {
    id: '12', employeeId: 'EMP-012', fullName: 'Ethan Davis', email: 'ethan.davis@company.com',
    phone: '+1 (555) 222-3333', address: '963 Marketing Hub, Atlanta, GA',
    department: 'Marketing', designation: 'Content Strategist',
    manager: 'Chris Martinez', employmentType: 'Contract', joiningDate: '2024-02-01',
    workLocation: 'Remote', status: 'Probation', yearsOfExperience: 2,
    healthRisk: 'Medium Risk', profileCompletion: 60, attendanceRate: 82,
    activeProjects: 1, taskCompletion: 75, performanceScore: 70,
    departmentFields: { campaignName: 'Content Hub', marketingChannel: 'Social Media', monthlyTarget: 25000 },
  },
];

export const alerts: Alert[] = [
  {
    id: 'a1', title: 'Probation ending this week',
    description: 'William Taylor (EMP-008) probation period ends on Friday. Review required.',
    priority: 'high', type: 'probation', timestamp: '2 hours ago',
  },
  {
    id: 'a2', title: 'New joiner awaiting onboarding',
    description: 'Ethan Davis (EMP-012) completed documents but onboarding checklist is incomplete.',
    priority: 'high', type: 'onboarding', timestamp: '4 hours ago',
  },
  {
    id: 'a3', title: 'Incomplete employee profiles',
    description: '5 employees have profile completion below 70%. Action needed for compliance.',
    priority: 'medium', type: 'profile', timestamp: '6 hours ago',
  },
  {
    id: 'a4', title: 'Upcoming approved leave',
    description: 'Michael Brown returns from leave tomorrow. Team handover pending.',
    priority: 'medium', type: 'leave', timestamp: '1 day ago',
  },
  {
    id: 'a5', title: 'HR compliance reminder',
    description: 'Quarterly performance review submissions due in 5 days.',
    priority: 'low', type: 'compliance', timestamp: '2 days ago',
  },
];

export const departmentDistribution = [
  { name: 'IT', value: 35, color: '#2563EB' },
  { name: 'HR', value: 12, color: '#4F46E5' },
  { name: 'Finance', value: 15, color: '#10B981' },
  { name: 'Marketing', value: 18, color: '#8B5CF6' },
  { name: 'Sales', value: 22, color: '#F59E0B' },
  { name: 'Operations', value: 18, color: '#06B6D4' },
];

export const activeVsLeave = [
  { name: 'Active', value: 135, color: '#10B981' },
  { name: 'On Leave', value: 10, color: '#F59E0B' },
  { name: 'Probation', value: 8, color: '#2563EB' },
  { name: 'Inactive', value: 7, color: '#9CA3AF' },
];

export const newJoinersTrend = [
  { month: 'Jan', count: 3 },
  { month: 'Feb', count: 5 },
  { month: 'Mar', count: 2 },
  { month: 'Apr', count: 4 },
  { month: 'May', count: 6 },
  { month: 'Jun', count: 5 },
];

export const workforceGrowth = [
  { month: 'Jan', total: 138 },
  { month: 'Feb', total: 140 },
  { month: 'Mar', total: 142 },
  { month: 'Apr', total: 144 },
  { month: 'May', total: 147 },
  { month: 'Jun', total: 150 },
];

export const dashboardStats = {
  totalEmployees: 150,
  activePercentage: 90,
  onLeave: 10,
  newJoiners: 5,
  activeToday: 135,
  attentionNeeded: 5,
  returningTomorrow: 3,
};
