"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { EmployeeSidebar } from "@/components/employee/employee-sidebar";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout SidebarComponent={EmployeeSidebar} allowedRole="employee">
      {children}
    </DashboardLayout>
  );
}
