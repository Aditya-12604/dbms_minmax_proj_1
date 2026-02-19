import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import type { ToastType } from '../../components/Toast/Toast';

type AuthUser = {
  username: string;
  role: 'student' | 'professor';
};

const ALLOWED_USERS: Record<string, { password: string; role: AuthUser['role'] }> = {
  student: { password: 'student123', role: 'student' },
  professor: { password: 'professor123', role: 'professor' }
};

export default function Login({
  onLogin,
  theme,
  onToggleTheme,
  showToast
}: {
  onLogin: (user: AuthUser) => void;
  theme: string;
  onToggleTheme: () => void;
  showToast: (message: string, type?: ToastType) => void;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = ALLOWED_USERS[username.trim().toLowerCase()];

    if (!user || user.password !== password) {
      setError('Invalid username or password. Use the default credentials.');
      showToast('Login failed. Try default credentials.', 'error');
      return;
    }

    setError('');
    onLogin({ username: username.trim().toLowerCase(), role: user.role });
    showToast(`Logged in as ${user.role}.`, 'success');
    navigate('/');
  }

  return (
    <div className="page-enter relative mx-auto flex min-h-screen w-full max-w-md items-center px-5">
      <ThemeToggle theme={theme} onToggle={onToggleTheme} className="absolute top-6 right-5" />

      <div className="glass load-fade-up w-full rounded-2xl p-6 sm:p-8">
        <h1 className="text-emphasis text-3xl font-black">Login</h1>
        <p className="text-italic-tone mt-2 italic">Use student/student123 or professor/professor123.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="input-theme"
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="input-theme"
          />
          {error && <p className="text-error text-sm">{error}</p>}
          <button className="btn-primary-fixed w-full">Log In</button>
        </form>

        <p className="text-muted mt-4 text-sm">
          New user?{' '}
          <Link to="/signup" className="text-emphasis font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
