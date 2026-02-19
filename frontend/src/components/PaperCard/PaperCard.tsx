import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, MessageSquare, Star } from 'lucide-react';
import './PaperCard.css';

interface PaperProps {
  paper: {
    id: string;
    title: string;
    author: string;
    dept: string;
    abstract: string;
    votes: number;
    rating?: number;
  };
}

export default function PaperCard({ paper }: PaperProps) {
  const API = import.meta.env.VITE_API_BASE || '';
  const currentUserId = Number(import.meta.env.VITE_FAKE_USER_ID || 1);
  const [votes, setVotes] = useState<number>(paper.votes || 0);
  const [selected, setSelected] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  async function vote(delta: number) {
    if (loading) return;
    setLoading(true);
    try {
      const newValue = selected === delta ? 0 : delta;
      const res = await fetch(`${API}/api/papers/${paper.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUserId, vote_value: newValue })
      });
      if (!res.ok) throw new Error('vote failed');
      const data = await res.json();
      if (typeof data.votes === 'number') setVotes(data.votes);
      setSelected(newValue);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="paper-card glass rounded-2xl p-6">
      <div className="mb-4 flex items-start justify-between">
        <span className={`dept-badge dept-${paper.dept}`}>{paper.dept}</span>
        {paper.rating && (
          <div className="rating-pill px-2 py-1">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">{paper.rating}/5</span>
          </div>
        )}
      </div>

      <h3 className="text-emphasis mt-2 line-clamp-2 text-xl font-bold">{paper.title}</h3>
      <p className="text-muted mt-1 text-sm">by {paper.author}</p>

      <p className="text-normal mt-4 line-clamp-3 text-sm">{paper.abstract}</p>

      <div className="mt-6 flex items-center justify-between border-t pt-4" style={{ borderColor: 'var(--border-main)' }}>
        <div className="flex items-center gap-4">
          <div className="glass-soft flex items-center rounded-lg p-1">
            <button
              onClick={() => vote(1)}
              disabled={loading}
              className={`vote-btn p-1 transition-colors ${selected === 1 ? 'text-emphasis' : ''}`}
            >
              <ChevronUp size={20} />
            </button>
            <span className="text-normal px-2 text-sm font-medium">{votes}</span>
            <button
              onClick={() => vote(-1)}
              disabled={loading}
              className={`vote-btn p-1 transition-colors ${selected === -1 ? 'vote-down' : ''}`}
            >
              <ChevronDown size={20} />
            </button>
          </div>
          <Link to={`/paper/${paper.id}`} className="text-muted hover:text-emphasis flex items-center gap-2 text-sm">
            <MessageSquare size={18} />
            Comments
          </Link>
        </div>
        <Link to={`/paper/${paper.id}`} className="text-emphasis text-sm font-semibold hover:underline">
          Read Paper →
        </Link>
      </div>
    </div>
  );
}
