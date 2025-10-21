import connect from '../../../../lib/db';
import Journal from '../../../../lib/models/Journal';
import { verifyToken } from '../../../../lib/auth';

export async function GET(req, { params }) {
  try {
    await connect();
    const cookie = req.headers.get('cookie') || '';
    const token = cookie.split('token=')[1]?.split(';')?.[0];
    const decoded = verifyToken(token);
    if (!decoded) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const entry = await Journal.findOne({ _id: params.id, userId: decoded.id });
    if (!entry) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    return new Response(JSON.stringify(entry), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Journal GET single error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT(req, { params }) {
  try {
    await connect();
    const cookie = req.headers.get('cookie') || '';
    const token = cookie.split('token=')[1]?.split(';')?.[0];
    const decoded = verifyToken(token);
    if (!decoded) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const body = await req.json();
    const updated = await Journal.findOneAndUpdate(
      { _id: params.id, userId: decoded.id },
      body,
      { new: true }
    );
    if (!updated) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    return new Response(JSON.stringify(updated), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Journal PUT error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connect();
    const cookie = req.headers.get('cookie') || '';
    const token = cookie.split('token=')[1]?.split(';')?.[0];
    const decoded = verifyToken(token);
    if (!decoded) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    await Journal.deleteOne({ _id: params.id, userId: decoded.id });
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Journal DELETE error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
