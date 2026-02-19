import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PaperDetails.css';

export default function PaperDetails() {
  const { id } = useParams();
  const API = import.meta.env.VITE_API_BASE || '';
  const [paper, setPaper] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const currentUserId = Number(import.meta.env.VITE_FAKE_USER_ID || 1);
  const [voting, setVoting] = useState(false);
  const [selectedVote, setSelectedVote] = useState<number>(0);
  const [posting, setPosting] = useState(false);

  async function load() {
    if (!id) return;
    const p = await fetch(`${API}/api/papers/${id}`);
    if (p.ok) setPaper(await p.json());
    const c = await fetch(`${API}/api/papers/${id}/comments`);
    if (c.ok) setComments(await c.json());
  }

  useEffect(() => {
    load();
  }, [id]);

  async function postComment() {
    if (!newComment.trim()) return;
    setPosting(true);
    try {
      const res = await fetch(`${API}/api/papers/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUserId, content: newComment })
      });
      if (!res.ok) throw new Error('failed to post');
      setNewComment('');
      const saved = await res.json();
      setComments(prev => [...prev, { ...saved, user_name: saved.user_name || 'You' }]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert('Failed to post comment');
    } finally {
      setPosting(false);
    }
  }

  async function vote(v: number) {
    if (voting) return;
    setVoting(true);
    try {
      const newValue = selectedVote === v ? 0 : v;
      const res = await fetch(`${API}/api/papers/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUserId, vote_value: newValue })
      });
      if (!res.ok) throw new Error('vote failed');
      const data = await res.json();
      setPaper((p: any) => ({ ...p, votes: data.votes }));
      setSelectedVote(newValue);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setVoting(false);
    }
  }

  if (!paper) return <div className="page-enter mx-auto max-w-3xl px-6 py-16 text-normal">Loading...</div>;

  return (
    <div className="glass page-enter mx-auto max-w-3xl rounded-xl px-6 py-16">
      <header className="mb-12 border-b pb-8 text-center" style={{ borderColor: 'var(--border-main)' }}>
        <span className="text-emphasis text-xs font-bold uppercase tracking-widest">{paper.dept_name}</span>
        <h1 className="text-emphasis mt-4 mb-2 text-4xl font-black">{paper.title}</h1>
        <p className="text-italic-tone italic">
          By {paper.author_name} • {new Date(paper.created_at).toLocaleDateString()}
        </p>
      </header>

      <article className="prose max-w-none text-normal">
        <p className="glass-soft text-italic-tone mb-8 rounded-lg p-4 text-xl font-bold italic">{paper.abstract}</p>
        {paper.raw_content ? (
          paper.raw_content.split('\n\n').map((p: string, i: number) => (
            <p key={i} className="text-normal mb-6 leading-relaxed">
              {p}
            </p>
          ))
        ) : (
          <p className="text-normal">No inline content available. Download the file to read.</p>
        )}
      </article>

      <section className="glass-soft mt-20 rounded-xl p-6">
        <div className="glass-soft mb-6 flex w-max items-center gap-4 rounded-lg p-4">
          <button
            onClick={() => vote(1)}
            disabled={voting}
            className={selectedVote === 1 ? 'btn-primary-fixed px-3 py-2' : 'btn-ghost px-3 py-2'}
          >
            Upvote
          </button>
          <span className="text-emphasis font-bold">{paper.votes || 0}</span>
          <button
            onClick={() => vote(-1)}
            disabled={voting}
            className={selectedVote === -1 ? 'btn-danger px-3 py-2' : 'btn-ghost px-3 py-2'}
          >
            Downvote
          </button>
        </div>

        <h3 className="text-emphasis mb-6 text-2xl font-bold">Comments</h3>
        {comments.length === 0 && (
          <div className="glass-soft text-italic-tone rounded-2xl p-6 text-center italic">
            No comments yet. Be the first to peer-review this!
          </div>
        )}
        {comments.map(c => (
          <div key={c.id} className="py-4" style={{ borderBottom: '1px solid var(--border-main)' }}>
            <div className="text-muted text-sm font-semibold">{c.user_name}</div>
            <div className="text-normal mt-1">{c.content}</div>
          </div>
        ))}

        <div className="mt-6">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className="input-theme min-h-28"
            placeholder="Write a constructive comment..."
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button onClick={postComment} disabled={posting} className="btn-primary-fixed">
              {posting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
