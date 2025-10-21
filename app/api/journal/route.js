import connect from '../../../lib/db';
import Journal from '../../../lib/models/Journal';
import { verifyToken } from '../../../lib/auth';

export async function GET(req) {
  try {
    await connect();
    const cookie = req.headers.get('cookie') || '';
    const token = cookie.split('token=')[1]?.split(';')?.[0];
    const decoded = verifyToken(token);
    if (!decoded) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const entries = await Journal.find({ userId: decoded.id }).sort({ createdAt: -1 });
    return new Response(JSON.stringify(entries), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Journal GET error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST(req) {
  try {
    await connect();
    const cookie = req.headers.get('cookie') || '';
    const token = cookie.split('token=')[1]?.split(';')?.[0];
    const decoded = verifyToken(token);
    if (!decoded) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const body = await req.json();
    const entry = await Journal.create({ ...body, userId: decoded.id });
    return new Response(JSON.stringify(entry), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Journal POST error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
