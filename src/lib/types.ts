import type { Timestamp } from 'firebase/firestore';

export type UserRole = 'admin' | 'employee';

export type Employee = {
  id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
  status: 'active' | 'inactive';
  role: 'employee';
};

export type Admin = {
  id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
  role: 'admin';
};

export type AppUser = (Employee | Admin) & { uid: string };

export type LeaveType = 'Annual' | 'Sick' | 'Unpaid' | 'Maternity' | 'Paternity';

export const leaveTypes: LeaveType[] = ['Annual', 'Sick', 'Unpaid', 'Maternity', 'Paternity'];

export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string; // denormalized for easier display
  employeeProfilePicture?: string; // denormalized
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveStatus;
  managerRemark?: string;
  createdAt: Date;
};
