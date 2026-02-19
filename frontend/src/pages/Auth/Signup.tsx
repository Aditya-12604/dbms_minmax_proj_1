import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import type { ToastType } from '../../components/Toast/Toast';

export default function Signup({
  theme,
  onToggleTheme,
  showToast
}: {
  theme: string;
  onToggleTheme: () => void;
  showToast: (message: string, type?: ToastType) => void;
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      showToast('Please fill all required signup fields.', 'error');
      return;
    }

    showToast(`Signup captured for ${role}. Please log in with default credentials.`, 'success');
    navigate('/login');
  }

  return (
    <div className="page-enter relative mx-auto flex min-h-screen w-full max-w-md items-center px-5">
      <ThemeToggle theme={theme} onToggle={onToggleTheme} className="absolute top-6 right-5" />

      <div className="glass load-fade-up w-full rounded-2xl p-6 sm:p-8">
        <h1 className="text-emphasis text-3xl font-black">Sign Up</h1>
        <p className="text-italic-tone mt-2 italic">This is temporary and will redirect to login.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="input-theme"
            placeholder="Full name"
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-theme"
            type="email"
            placeholder="University email"
          />
          <select value={role} onChange={e => setRole(e.target.value)} className="input-theme">
            <option value="student">Student</option>
            <option value="professor">Professor</option>
          </select>
          <button className="btn-primary-fixed w-full">Create Account</button>
        </form>

        <p className="text-muted mt-4 text-sm">
          Already registered?{' '}
          <Link to="/login" className="text-emphasis font-semibold">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
