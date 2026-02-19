import { useEffect, useState } from 'react';
import PaperCard from '../../components/PaperCard/PaperCard';
import './Dashboard.css';

export default function Dashboard() {
  const [papers, setPapers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('');

  async function load() {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (dept) params.set('dept', dept);
    const res = await fetch((import.meta.env.VITE_API_BASE || '') + `/api/papers?${params.toString()}`);
    if (res.ok) setPapers(await res.json());
  }

  useEffect(() => {
    load();
  }, [search, dept]);

  return (
    <div className="dashboard-container glass page-enter mx-auto max-w-4xl overflow-hidden rounded-2xl px-4 py-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="load-fade-up stagger-1">
          <h1 className="text-3xl font-bold text-emphasis">University Feed</h1>
          <p className="text-muted">Top research from your departments</p>
        </div>

        <div className="load-fade-up stagger-2 flex gap-2">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search papers..."
            className="input-theme"
          />
          <select value={dept} onChange={e => setDept(e.target.value)} className="input-theme">
            <option value="">All Departments</option>
            <option value="1">Computer Science</option>
            <option value="2">Physics</option>
            <option value="3">Modern Literature</option>
            <option value="4">Mathematics</option>
          </select>
        </div>
      </header>

      <div className="grid gap-6">
        {papers.map((paper, index) => (
          <div key={paper.id} className={`load-fade-up ${index < 3 ? `stagger-${index + 1}` : ''}`}>
            <PaperCard
              paper={{
                id: String(paper.id),
                title: paper.title,
                author: paper.author_name || 'Unknown',
                dept: paper.dept_name || 'General',
                abstract: paper.abstract,
                votes: paper.votes || 0,
                rating: paper.rating
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
