export type AttendanceStatus = 'Present' | 'Absent' | 'On Leave' | 'Late' | 'Half Day';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
  status: AttendanceStatus;
  date: string;
}

export const attendanceSummary = {
  attendanceRate: 94.2,
  presentToday: 128,
  absentToday: 8,
  onLeave: 14,
};

export const attendanceTrend = [
  { day: 'Mon', rate: 93 },
  { day: 'Tue', rate: 95 },
  { day: 'Wed', rate: 94 },
  { day: 'Thu', rate: 96 },
  { day: 'Fri', rate: 92 },
  { day: 'Sat', rate: 45 },
  { day: 'Sun', rate: 12 },
];

export const weeklyAttendance = [
  { week: 'W1', present: 620, absent: 42, leave: 38 },
  { week: 'W2', present: 635, absent: 35, leave: 30 },
  { week: 'W3', present: 628, absent: 38, leave: 34 },
  { week: 'W4', present: 642, absent: 28, leave: 30 },
];

export const monthlyAttendanceInsights = [
  { month: 'Jan', rate: 92.5 },
  { month: 'Feb', rate: 93.1 },
  { month: 'Mar', rate: 93.8 },
  { month: 'Apr', rate: 94.0 },
  { month: 'May', rate: 94.5 },
  { month: 'Jun', rate: 94.2 },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'a1', employeeId: 'EMP-001', employeeName: 'Sarah Chen', department: 'IT', checkIn: '08:52', checkOut: '17:45', hoursWorked: 8.9, status: 'Present', date: '2024-06-23' },
  { id: 'a2', employeeId: 'EMP-002', employeeName: 'James Wilson', department: 'Finance', checkIn: '09:05', checkOut: '18:02', hoursWorked: 8.9, status: 'Present', date: '2024-06-23' },
  { id: 'a3', employeeId: 'EMP-003', employeeName: 'Emma Rodriguez', department: 'HR', checkIn: '08:45', checkOut: '17:30', hoursWorked: 8.8, status: 'Present', date: '2024-06-23' },
  { id: 'a4', employeeId: 'EMP-004', employeeName: 'Michael Brown', department: 'Sales', checkIn: '—', checkOut: '—', hoursWorked: 0, status: 'On Leave', date: '2024-06-23' },
  { id: 'a5', employeeId: 'EMP-005', employeeName: 'Sophia Lee', department: 'Marketing', checkIn: '09:22', checkOut: '17:55', hoursWorked: 8.5, status: 'Late', date: '2024-06-23' },
  { id: 'a6', employeeId: 'EMP-006', employeeName: 'David Park', department: 'IT', checkIn: '08:30', checkOut: '18:15', hoursWorked: 9.8, status: 'Present', date: '2024-06-23' },
  { id: 'a7', employeeId: 'EMP-007', employeeName: 'Olivia Martinez', department: 'Operations', checkIn: '08:55', checkOut: '17:40', hoursWorked: 8.8, status: 'Present', date: '2024-06-23' },
  { id: 'a8', employeeId: 'EMP-008', employeeName: 'William Taylor', department: 'IT', checkIn: '09:45', checkOut: '13:30', hoursWorked: 3.8, status: 'Half Day', date: '2024-06-23' },
  { id: 'a9', employeeId: 'EMP-009', employeeName: 'Isabella Garcia', department: 'Sales', checkIn: '08:48', checkOut: '17:50', hoursWorked: 9.0, status: 'Present', date: '2024-06-23' },
  { id: 'a10', employeeId: 'EMP-010', employeeName: 'Benjamin Clark', department: 'Finance', checkIn: '—', checkOut: '—', hoursWorked: 0, status: 'On Leave', date: '2024-06-23' },
  { id: 'a11', employeeId: 'EMP-011', employeeName: 'Ava Johnson', department: 'HR', checkIn: '—', checkOut: '—', hoursWorked: 0, status: 'Absent', date: '2024-06-23' },
  { id: 'a12', employeeId: 'EMP-012', employeeName: 'Ethan Davis', department: 'Marketing', checkIn: '09:10', checkOut: '17:35', hoursWorked: 8.4, status: 'Present', date: '2024-06-23' },
];
