"use client";

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Loader2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  SidebarComponent: React.ComponentType;
  allowedRole: 'admin' | 'employee';
}

export function DashboardLayout({ children, SidebarComponent, allowedRole }: DashboardLayoutProps) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && (!user || user.role !== allowedRole)) {
      router.replace('/');
    }
  }, [user, loading, router, allowedRole]);

  if (loading || !user || user.role !== allowedRole) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <SidebarComponent />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
