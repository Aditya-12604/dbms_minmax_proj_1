import { Moon, Sun } from 'lucide-react';

type ThemeToggleProps = {
  theme: string;
  onToggle: () => void;
  className?: string;
};

export default function ThemeToggle({ theme, onToggle, className = '' }: ThemeToggleProps) {
  return (
    <button onClick={onToggle} className={`btn-ghost flex items-center gap-3 ${className}`}>
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
