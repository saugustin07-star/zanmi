/**
 * Verifies a Supabase webhook HMAC-SHA256 signature.
 *
 * Setup:
 *   1. Set a webhook secret in the Supabase dashboard.
 *   2. Store it as SUPABASE_WEBHOOK_SECRET in .env.local (no NEXT_PUBLIC_ prefix).
 *   3. In your route handler: await verifySupabaseWebhook(req.clone())
 *
 * Supabase sends the signature as: x-webhook-signature: sha256=<hex-digest>
 */
export async function verifySupabaseWebhook(req: Request): Promise<void> {
  const secret = process.env.SUPABASE_WEBHOOK_SECRET;
  if (!secret) throw new Error('SUPABASE_WEBHOOK_SECRET not configured.');

  const sig = req.headers.get('x-webhook-signature') ?? '';
  const [scheme, received] = sig.split('=');
  if (scheme !== 'sha256' || !received) throw new Error('Bad or missing webhook signature header.');

  const body = await req.text();
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const expected = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  const expectedHex = Array.from(new Uint8Array(expected))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  if (received !== expectedHex) throw new Error('Webhook signature mismatch.');
}

/*
 * Example usage in app/api/webhooks/supabase/route.ts:
 *
 * export async function POST(req: Request) {
 *   try {
 *     await verifySupabaseWebhook(req.clone());
 *   } catch {
 *     return new Response('Forbidden', { status: 403 });
 *   }
 *   const payload = await req.json();
 *   // handle webhook payload
 * }
 */
