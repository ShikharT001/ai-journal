import connect from '../../../../lib/db';
import User from '../../../../lib/models/User';
import { comparePassword, createToken } from '../../../../lib/auth';

export async function POST(req) {
  try {
    await connect();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const token = createToken({ id: user._id, email: user.email });
    const headers = new Headers();
    headers.append('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`);
    return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200, headers });
  } catch (err) {
    console.error('Login error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
