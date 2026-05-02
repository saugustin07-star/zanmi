import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// Table: waitlist_signups
// Required in Supabase before this route works:
//
//   create table waitlist_signups (
//     id               uuid primary key default gen_random_uuid(),
//     name             text not null,
//     email            text not null,
//     organization     text,
//     interest         text not null,
//     organization_type text,
//     created_at       timestamptz default now()
//   );
//
// No RLS needed — inserts go through the service role key on the server.

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name             = typeof body.name             === 'string' ? body.name.trim()             : '';
  const email            = typeof body.email            === 'string' ? body.email.trim().toLowerCase() : '';
  const organization     = typeof body.organization     === 'string' ? body.organization.trim()     : null;
  const interest         = typeof body.interest         === 'string' ? body.interest.trim()         : '';
  const organization_type = typeof body.organization_type === 'string' ? body.organization_type.trim() : null;

  if (!name)     return NextResponse.json({ error: 'Name is required.'     }, { status: 400 });
  if (!email)    return NextResponse.json({ error: 'Email is required.'    }, { status: 400 });
  if (!interest) return NextResponse.json({ error: 'Interest is required.' }, { status: 400 });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('waitlist_signups').insert({
    name,
    email,
    organization:      organization     || null,
    interest,
    organization_type: organization_type || null,
  });

  if (error) {
    console.error('[Zanmi] waitlist insert error:', error);
    return NextResponse.json({ error: 'Failed to save your signup. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
