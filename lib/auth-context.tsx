"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, Client, RoleType } from './types';
import { mockEmployees, mockClients } from './mock-data';

type UserType = 'COLLEGE_OFFICIAL' | 'ORGANIZATION' | null;

interface AuthContextType {
  userType: UserType;
  user: Employee | Client | null;
  role: RoleType | null; 
  login: (type: UserType, id: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userType: null,
  user: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [user, setUser] = useState<Employee | Client | null>(null);
  const [role, setRole] = useState<RoleType | null>(null);

  // For prototype persistence
  useEffect(() => {
    const savedType = localStorage.getItem('auth_type') as UserType;
    const savedId = localStorage.getItem('auth_id');
    if (savedType && savedId) {
      handleLogin(savedType, parseInt(savedId));
    }
  }, []);

  const handleLogin = (type: UserType, id: number) => {
    setUserType(type);
    if (type === 'COLLEGE_OFFICIAL') {
      const emp = mockEmployees.find(e => e.Employee_ID === id) || mockEmployees[0];
      setUser(emp);
      setRole(emp.Role_Name);
    } else {
      const client = mockClients.find(c => c.Client_ID === id) || mockClients[0];
      setUser(client);
      setRole(null);
    }
    localStorage.setItem('auth_type', type!);
    localStorage.setItem('auth_id', id.toString());
  };

  const handleLogout = () => {
    setUserType(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem('auth_type');
    localStorage.removeItem('auth_id');
  };

  return (
    <AuthContext.Provider value={{ userType, user, role, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
