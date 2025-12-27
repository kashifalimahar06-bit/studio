"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout SidebarComponent={AdminSidebar} allowedRole="admin">
      {children}
    </DashboardLayout>
  );
}
