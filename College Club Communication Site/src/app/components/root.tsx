import { Outlet, Link, useLocation } from "react-router";
import { Briefcase, Users, PlusCircle, FileText, User } from "lucide-react";
import { Button } from "./ui/button";

export function Root() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">CC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ClubConnect</h1>
                <p className="text-xs text-gray-500">College Collaboration Hub</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/clubs" 
                className={`flex items-center gap-2 ${isActive('/clubs') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Users className="w-4 h-4" />
                Clubs
              </Link>
              <Link 
                to="/jobs" 
                className={`flex items-center gap-2 ${isActive('/jobs') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Briefcase className="w-4 h-4" />
                Opportunities
              </Link>
              <Link 
                to="/my-applications" 
                className={`flex items-center gap-2 ${isActive('/my-applications') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <FileText className="w-4 h-4" />
                My Applications
              </Link>
              <Link to="/post-job">
                <Button size="sm" className="gap-2">
                  <PlusCircle className="w-4 h-4" />
                  Post Opportunity
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
            </nav>

            {/* Mobile menu */}
            <div className="md:hidden flex items-center gap-2">
              <Link to="/post-job">
                <Button size="sm">
                  <PlusCircle className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile nav */}
          <nav className="md:hidden flex justify-around pb-3 border-t pt-3">
            <Link to="/clubs" className={`flex flex-col items-center gap-1 ${isActive('/clubs') ? 'text-blue-600' : 'text-gray-600'}`}>
              <Users className="w-5 h-5" />
              <span className="text-xs">Clubs</span>
            </Link>
            <Link to="/jobs" className={`flex flex-col items-center gap-1 ${isActive('/jobs') ? 'text-blue-600' : 'text-gray-600'}`}>
              <Briefcase className="w-5 h-5" />
              <span className="text-xs">Jobs</span>
            </Link>
            <Link to="/my-applications" className={`flex flex-col items-center gap-1 ${isActive('/my-applications') ? 'text-blue-600' : 'text-gray-600'}`}>
              <FileText className="w-5 h-5" />
              <span className="text-xs">Applied</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">ClubConnect</h3>
              <p className="text-sm text-gray-600">
                Connecting college students for collaborative opportunities within clubs and committees.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/clubs" className="hover:text-blue-600">Browse Clubs</Link></li>
                <li><Link to="/jobs" className="hover:text-blue-600">Find Opportunities</Link></li>
                <li><Link to="/post-job" className="hover:text-blue-600">Post a Job</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
              <p className="text-sm text-gray-600">
                support@clubconnect.college.edu
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
            © 2026 ClubConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
