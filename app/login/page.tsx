"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Building2, GraduationCap, Lock, Mail, User } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isCollege, setIsCollege] = useState(true);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCollege) {
      // Mock login as Project Coordinator (ID 3)
      login('COLLEGE_OFFICIAL', 3);
      router.push('/dashboard/college');
    } else {
      // Mock login as Client (ID 1)
      login('ORGANIZATION', 1);
      router.push('/dashboard/organization');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Panel - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-slate-900 text-white p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-brand-500 rounded-full blur-[100px] opacity-40"></div>
        
        <div className="z-10 text-center max-w-md">
          <GraduationCap className="w-24 h-24 mx-auto mb-8 text-brand-400" />
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Academic TPQA Platform</h1>
          <p className="text-slate-300 text-lg">Streamlining consultancy workflows between academia and industry organizations.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-white">Welcome Back</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Sign in to manage your projects.</p>

          {/* Role Toggle */}
          <div className="flex rounded-lg bg-slate-200 dark:bg-slate-800 p-1 mb-8">
            <button
              onClick={() => setIsCollege(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isCollege 
                  ? 'bg-white dark:bg-slate-700 shadow text-brand-600 dark:text-brand-400' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              College Official
            </button>
            <button
              onClick={() => setIsCollege(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isCollege 
                  ? 'bg-white dark:bg-slate-700 shadow text-brand-600 dark:text-brand-400' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Organization
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {isCollege ? 'Employee ID' : 'Organization Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  {isCollege ? <User className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                </div>
                <input
                  type={isCollege ? 'text' : 'email'}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white primary-ring"
                  placeholder={isCollege ? "E.g., 3" : "admin@company.com"}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white primary-ring"
                  placeholder="••••••••"
                  required
                  defaultValue="password123"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2"
            >
              {isCollege ? <GraduationCap className="h-5 w-5"/> : <Building2 className="h-5 w-5"/>}
              Sign In as {isCollege ? 'Faculty' : 'Client'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account? <Link href="/signup" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
