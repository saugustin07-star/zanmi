import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/adminSession';

// ── In-memory rate limiter ────────────────────────────────────────────────────
// Effective within a single warm serverless instance. Resets on cold starts,
// which is acceptable for a small app — it still blocks sustained automated abuse.

interface RateEntry { count: number; resetAt: number }
const rateMap = new Map<string, RateEntry>();

function isRateLimited(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const entry = rateMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, retryAfter: 0 };
  }
  if (entry.count >= max) {
    return { limited: true, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count++;
  return { limited: false, retryAfter: 0 };
}

function tooMany(retryAfter: number, message: string): NextResponse {
  return new NextResponse(message, {
    status: 429,
    headers: { 'Retry-After': String(retryAfter), 'Content-Type': 'text/plain' },
  });
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

// ── Middleware ────────────────────────────────────────────────────────────────

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = getIp(req);

  // ── Login / auth-adjacent: 5 attempts per IP per 10 minutes ──────────────
  if (pathname === '/api/admin/auth' && req.method === 'POST') {
    const { limited, retryAfter } = isRateLimited(`auth:${ip}`, 5, 10 * 60 * 1000);
    if (limited) return tooMany(retryAfter, 'Too many login attempts. Try again later.');
  }

  // ── Survey submissions: 10 per IP per minute ──────────────────────────────
  // Survey answers are written directly from the browser to Supabase, so we
  // gate the survey page load as a proxy. When writes move to an API route,
  // add a dedicated matcher for that route instead.
  if (pathname.startsWith('/s/')) {
    const { limited, retryAfter } = isRateLimited(`survey:${ip}`, 10, 60 * 1000);
    if (limited) return tooMany(retryAfter, 'Too many requests. Please wait a moment.');
  }

  // ── AI analysis endpoints: 5 per user per minute ─────────────────────────
  // Keyed by session cookie when present (authenticated admin), otherwise IP.
  if (pathname.startsWith('/api/ai/')) {
    const sessionToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const key = sessionToken ? `ai:session:${sessionToken.slice(0, 16)}` : `ai:ip:${ip}`;
    const { limited, retryAfter } = isRateLimited(key, 5, 60 * 1000);
    if (limited) return tooMany(retryAfter, 'AI rate limit reached. Try again in a minute.');
  }

  // ── Webhooks: verify secret header, then rate limit ──────────────────────
  if (pathname.startsWith('/api/webhooks/')) {
    const webhookSecret = process.env.WEBHOOK_GATEWAY_SECRET ?? '';
    const providedSecret = req.headers.get('x-webhook-secret') ?? '';

    if (!webhookSecret || providedSecret !== webhookSecret) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // After auth, still rate-limit by IP to prevent replay flooding
    const { limited, retryAfter } = isRateLimited(`webhook:${ip}`, 60, 60 * 1000);
    if (limited) return tooMany(retryAfter, 'Webhook rate limit exceeded.');
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/admin/auth',
    '/s/:path*',
    '/api/ai/:path*',
    '/api/webhooks/:path*',
  ],
};
