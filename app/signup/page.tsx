"use client";

import { Building2, Landmark, Mail, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [isCollege, setIsCollege] = useState(false); // Default to organization for signup
  const { login } = useAuth();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock successful signup -> login
    if (isCollege) {
      login('COLLEGE_OFFICIAL', 3);
      router.push('/dashboard/college');
    } else {
      login('ORGANIZATION', 1);
      router.push('/dashboard/organization');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Right Panel - Signup Form (Swapped for variety) */}
      <div className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950 order-2 md:order-1">
        <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-xl max-h-screen overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-white">Create an Account</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Register to request or manage consultancy projects.</p>

          {/* Role Toggle */}
          <div className="flex rounded-lg bg-slate-200 dark:bg-slate-800 p-1 mb-6">
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

          <form onSubmit={handleSignup} className="space-y-4">
            
            {isCollege ? (
              // College Official Fields
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input type="text" className="w-full px-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Employee ID</label>
                  <input type="text" className="w-full px-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Department</label>
                  <select className="w-full px-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" required>
                    <option value="">Select Department</option>
                    <option value="1">Computer Engineering</option>
                    <option value="2">Civil Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Role Type</label>
                  <select className="w-full px-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" required>
                    <option value="PROJECT_COORDINATOR">Project Coordinator</option>
                    <option value="HOD">Head of Department (HOD)</option>
                    <option value="SUPPORT_STAFF">Support Staff</option>
                  </select>
                </div>
              </>
            ) : (
              // Organization Fields
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Organization Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Person</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="tel" className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" required />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">GSTIN / UIN</label>
                    <div className="relative">
                      <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">State</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" required />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Office Address</label>
                  <textarea rows={2} className="w-full px-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" required></textarea>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Create Password</label>
              <input type="password" className="w-full px-3 py-2 text-sm border rounded-lg bg-transparent dark:border-slate-600 primary-ring" required />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 text-sm rounded-lg transition-colors mt-4"
            >
              Complete Registration
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account? <Link href="/login" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Left Panel - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white p-12 relative overflow-hidden order-1 md:order-2 border-l border-slate-200 dark:border-slate-800">
        <div className="z-10 max-w-md">
          <h1 className="text-3xl font-bold mb-6 tracking-tight">Join the Network</h1>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-brand-600 dark:text-brand-400"/>
              </div>
              <div>
                <h3 className="font-semibold text-sm">For Organizations</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Request quality audits and track your projects digitally.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5 text-emerald-600 dark:text-emerald-400"/>
              </div>
              <div>
                <h3 className="font-semibold text-sm">For Faculty</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Manage consultancy projects, invoices, and distribution from one dashboard.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
