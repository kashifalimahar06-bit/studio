"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, Users, Mail, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '../logo';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/employees', label: 'Employees', icon: Users },
  { href: '/admin/leaves', label: 'Leave Requests', icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Logo className="w-24"/>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  asChild
                  tooltip={{
                    children: item.label,
                    className: "font-body",
                  }}
                >
                  <div>
                    <item.icon />
                    <span>{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.profilePictureUrl} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={signOut}
            aria-label="Log out"
          >
            <LogOut />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
