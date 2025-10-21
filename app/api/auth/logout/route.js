export async function POST() {
  const headers = new Headers();
  headers.append('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax');
  return new Response(JSON.stringify({ message: 'Logged out' }), { status: 200, headers });
}
