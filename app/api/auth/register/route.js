import connect from '../../../../lib/db';
import User from '../../../../lib/models/User';
import { hashPassword } from '../../../../lib/auth';

export async function POST(req) {
  try {
    await connect();
    const body = await req.json();
    const { name, email, password } = body || {};
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: 'Email exists' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    }
    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash });
    return new Response(JSON.stringify({ message: 'User registered', id: user._id }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Register error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
