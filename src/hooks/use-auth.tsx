"use client";

import React, { createContext, useContext } from 'react';
import type { AppUser } from '@/lib/types';

export interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (role: 'admin' | 'employee') => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
