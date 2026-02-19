import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { ChevronDown, ChevronUp, Home, Upload as UploadIcon, User, LogOut } from 'lucide-react';
import useLocalStorage from 'use-local-storage';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import PaperDetails from './pages/PaperDetails/PaperDetails';
import Profile from './pages/Profile/Profile';
import Upload from './pages/Upload/Upload';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Toast, { type ToastState, type ToastType } from './components/Toast/Toast';
import './App.css';

type AuthUser = {
  username: string;
  role: 'student' | 'professor';
};

function AppLayout({
  theme,
  switchTheme,
  user,
  onLogout
}: {
  theme: string;
  switchTheme: () => void;
  user: AuthUser;
  onLogout: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollTo = (direction: 'top' | 'bottom') => {
    window.scrollTo({
      top: direction === 'top' ? 0 : document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="layout-shell text-normal bg-theme">
      <nav className="side-nav glass page-enter">
        <h1 className="text-xl font-black italic tracking-tighter text-emphasis">UNISCHOLAR</h1>

        <div className="flex flex-col gap-2 rounded-lg glass-soft p-2 load-fade-up stagger-1">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Home size={20} /> Feed
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <User size={20} /> Profile
          </NavLink>

          <ThemeToggle theme={theme} onToggle={switchTheme} className="mt-3" />
        </div>

        <div className="mt-auto flex flex-col gap-3 load-fade-up stagger-2">
          <button onClick={() => navigate('/upload')} className="btn-primary-fixed flex items-center justify-center gap-2">
            <UploadIcon size={20} /> Upload Paper
          </button>
          <button onClick={onLogout} className="btn-ghost flex items-center justify-center gap-2">
            <LogOut size={18} /> Logout ({user.role})
          </button>
        </div>
      </nav>

      <main className="flex-1 p-6 page-enter">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/paper/:id" element={<PaperDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <button onClick={() => scrollTo('top')} className="floating-btn glass load-fade-up stagger-2">
          <ChevronUp size={24} />
        </button>
        <button onClick={() => scrollTo('bottom')} className="floating-btn glass load-fade-up stagger-3">
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
}

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const [authUser, setAuthUser] = useLocalStorage<AuthUser | null>('auth-user', null);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            authUser ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={setAuthUser} theme={theme} onToggleTheme={switchTheme} showToast={showToast} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            authUser ? (
              <Navigate to="/" replace />
            ) : (
              <Signup theme={theme} onToggleTheme={switchTheme} showToast={showToast} />
            )
          }
        />
        <Route
          path="*"
          element={
            authUser ? (
              <AppLayout
                theme={theme}
                switchTheme={switchTheme}
                user={authUser}
                onLogout={() => {
                  setAuthUser(null);
                  showToast('Logged out successfully.', 'info');
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </Router>
  );
}

export default App;
