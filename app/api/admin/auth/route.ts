import { NextRequest, NextResponse } from 'next/server';
import { makeAdminToken, verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/adminSession';

const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const passcode = process.env.ADMIN_PASSCODE ?? '';

  if (!passcode || body.passcode !== passcode) {
    await new Promise(r => setTimeout(r, 400));
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = await makeAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
  return res;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value ?? '';
  const valid = await verifyAdminToken(token);
  return valid
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}
