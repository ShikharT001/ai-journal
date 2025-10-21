"use client";
import { useState } from "react";

export default function Home() {
  const [tab, setTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });
      let data = null;
      try { data = await res.json(); } catch {}
      if (!res.ok) {
        alert('Register failed: ' + (data?.error || res.statusText));
        return;
      }
      alert('Registered! Please login.');
      setTab('login');
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      let data = null;
      try { data = await res.json(); } catch {}
      if (!res.ok) {
        alert('Login failed: ' + (data?.error || res.statusText));
        return;
      }
      // redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>AI Journal</h1>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => setTab('login')} disabled={tab==='login'}>Login</button>
        <button onClick={() => setTab('register')} disabled={tab==='register'} style={{ marginLeft: 8 }}>Register</button>
      </div>

      {tab === 'register' ? (
        <form onSubmit={handleRegister} style={{ marginTop: 16 }}>
          <div><input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} required /></div>
          <div><input placeholder='Email' type='email' value={email} onChange={e=>setEmail(e.target.value)} required /></div>
          <div><input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} required /></div>
          <button type='submit'>Register</button>
        </form>
      ) : (
        <form onSubmit={handleLogin} style={{ marginTop: 16 }}>
          <div><input placeholder='Email' type='email' value={email} onChange={e=>setEmail(e.target.value)} required /></div>
          <div><input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} required /></div>
          <button type='submit'>Login</button>
        </form>
      )}

      <p style={{ marginTop: 20 }}>{"After login you'll reach the dashboard where you can create, edit, and delete entries."}
        
      </p>
    </main>
  );
}
