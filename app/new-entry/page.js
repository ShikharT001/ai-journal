"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function NewEntry() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('neutral');
  const router = useRouter();

  async function create(e) {
    e.preventDefault();
    const res = await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, mood }),
      credentials: 'include'
    });
    if (res.status === 401) {
      window.location.href = '/';
      return;
    }
    if (res.ok) router.push('/dashboard');
    else {
      const data = await res.json().catch(() => ({}));
      alert('Failed: ' + (data?.error || res.statusText));
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h2>New Entry</h2>
      <form onSubmit={create}>
        <div><input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} /></div>
        <div><textarea placeholder="Write..." value={content} onChange={e=>setContent(e.target.value)} rows={8}></textarea></div>
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
      </form>
    </main>
  );
}
