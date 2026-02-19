import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const API = import.meta.env.VITE_API_BASE || '';
  const currentUserId = Number(import.meta.env.VITE_FAKE_USER_ID || 1);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return alert('Please pick a file');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title);
    fd.append('abstract', abstract);
    fd.append('author_id', String(currentUserId));

    const res = await fetch(`${API}/api/papers`, { method: 'POST', body: fd });
    if (!res.ok) return alert('Upload failed');
    alert('Uploaded');
  }

  return (
    <div className="glass page-enter mx-auto max-w-2xl overflow-hidden rounded-2xl px-4 py-12">
      <h1 className="text-emphasis load-fade-up text-2xl font-bold">Upload Paper</h1>
      <form onSubmit={submit} className="load-fade-up stagger-1 mt-4 space-y-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="input-theme" />
        <textarea value={abstract} onChange={e => setAbstract(e.target.value)} placeholder="Abstract" className="input-theme min-h-32" />
        <input
          onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
          type="file"
          accept=".pdf,.md,.txt"
          className="input-theme"
        />
        <div>
          <button className="btn-primary-fixed">Upload</button>
        </div>
      </form>
    </div>
  );
}
