export const ADMIN_COOKIE_NAME = 'zanmi_admin_session';

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function makeAdminToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET ?? 'change-me-in-production';
  const nonce = crypto.randomUUID();
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(nonce));
  const sigHex = Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return `${nonce}.${sigHex}`;
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET ?? 'change-me-in-production';
  const dotIndex = token.indexOf('.');
  if (dotIndex === -1) return false;
  const nonce = token.slice(0, dotIndex);
  const sigHex = token.slice(dotIndex + 1);
  if (!nonce || !sigHex || sigHex.length % 2 !== 0) return false;
  try {
    const key = await getKey(secret);
    const sig = Uint8Array.from(
      (sigHex.match(/.{2}/g) ?? []).map(b => parseInt(b, 16))
    );
    return crypto.subtle.verify('HMAC', key, sig, new TextEncoder().encode(nonce));
  } catch {
    return false;
  }
}
