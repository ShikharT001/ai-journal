"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const router = useRouter();

  async function fetchEntries() {
    const res = await fetch('/api/journal', { credentials: 'include' });
    if (res.status === 401) {
      // not logged in
      window.location.href = '/';
      return;
    }
    const data = await res.json();
    setEntries(data);
  }

  useEffect(() => { fetchEntries(); }, []);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    window.location.href = '/';
  }

  async function handleDelete(id) {
    if (!confirm('Delete this entry?')) return;
    const res = await fetch('/api/journal/' + id, { method: 'DELETE', credentials: 'include' });
    if (res.ok) fetchEntries();
    else {
      const data = await res.json().catch(()=>({}));
      alert('Delete failed: ' + (data?.error || res.statusText));
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Your Journal</h1>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => router.push('/new-entry')}>+ New Entry</button>
        <button onClick={handleLogout} style={{ marginLeft: 8 }}>Logout</button>
      </div>
      <ul>
        {entries.length === 0 && <li>No entries yet</li>}
        {entries.map(e => (
          <li key={e._id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{e.title || '(no title)'}</strong>
              <div>
                <button onClick={() => router.push('/journal/' + e._id)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => handleDelete(e._id)}>Delete</button>
              </div>
            </div>
            <div style={{ marginTop: 6 }}>{e.mood} • {new Date(e.createdAt).toLocaleString()}</div>
            <p style={{ marginTop: 8 }}>{e.content?.slice(0, 200)}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
