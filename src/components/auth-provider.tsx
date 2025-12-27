"use client";

import React, { useState, useEffect } from 'react';
import { AuthContext, AuthContextType } from '@/hooks/use-auth';
import type { AppUser } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const ADMIN_MOCK_USER: AppUser = {
  uid: 'admin-uid',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  profilePictureUrl: PlaceHolderImages.find(img => img.id === 'profile1')?.imageUrl,
};

const EMPLOYEE_MOCK_USER: AppUser = {
  uid: 'employee-uid',
  name: 'Employee One',
  email: 'employee@example.com',
  role: 'employee',
  status: 'active',
  profilePictureUrl: PlaceHolderImages.find(img => img.id === 'profile2')?.imageUrl,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
      sessionStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = async (role: 'admin' | 'employee') => {
    setLoading(true);
    // This is a mock sign-in. In a real app, you'd use Firebase Auth.
    await new Promise(resolve => setTimeout(resolve, 500));
    const userToSet = role === 'admin' ? ADMIN_MOCK_USER : EMPLOYEE_MOCK_USER;
    setUser(userToSet);
    sessionStorage.setItem('user', JSON.stringify(userToSet));
    setLoading(false);
    router.push(`/${role}/dashboard`);
  };

  const signOut = () => {
    setLoading(true);
    setUser(null);
    sessionStorage.removeItem('user');
    setLoading(false);
    router.push('/');
  };

  const value: AuthContextType = { user, loading, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
