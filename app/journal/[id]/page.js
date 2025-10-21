"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [entry, setEntry] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('neutral');

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/journal/' + id, { credentials: 'include' });
      if (res.status === 401) return window.location.href = '/';
      if (res.status === 404) return alert('Not found');
      const data = await res.json();
      setEntry(data);
      setTitle(data.title || '');
      setContent(data.content || '');
      setMood(data.mood || 'neutral');
    }
    load();
  }, [id]);

  async function save(e) {
    e.preventDefault();
    const res = await fetch('/api/journal/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, mood }),
      credentials: 'include'
    });
    if (res.status === 401) return window.location.href = '/';
    if (res.ok) router.push('/dashboard');
    else {
      const data = await res.json().catch(()=>({}));
      alert('Update failed: ' + (data?.error || res.statusText));
    }
  }

  if (!entry) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <main style={{ padding: 24 }}>
      <h2>Edit Entry</h2>
      <form onSubmit={save}>
        <div><input value={title} onChange={e=>setTitle(e.target.value)} /></div>
        <div><textarea rows={8} value={content} onChange={e=>setContent(e.target.value)}></textarea></div>
        <div>
          <select value={mood} onChange={e=>setMood(e.target.value)}>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="neutral">Neutral</option>
            <option value="excited">Excited</option>
            <option value="angry">Angry</option>
          </select>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={()=>router.push('/dashboard')} style={{ marginLeft: 8 }}>Cancel</button>
      </form>
    </main>
  );
}
