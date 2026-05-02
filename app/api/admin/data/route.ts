import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/adminSession';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { DbSurvey, DbSurveyResponse } from '@/types/survey';

export type LatestResponse = DbSurveyResponse & {
  surveys: { title: string } | null;
};

export type AdminDataPayload = {
  surveys: DbSurvey[];
  counts: Record<string, { total: number; completed: number }>;
  latestResponses: LatestResponse[];
};

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value ?? '';
  if (!(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [surveysResult, countsResult, latestResult] = await Promise.all([
    supabaseAdmin
      .from('surveys')
      .select('*')
      .order('created_at', { ascending: false }),

    supabaseAdmin
      .from('survey_responses')
      .select('survey_id, completed'),

    supabaseAdmin
      .from('survey_responses')
      .select('*, surveys(title)')
      .order('started_at', { ascending: false })
      .limit(10),
  ]);

  if (surveysResult.error) {
    console.error('[Zanmi] /api/admin/data surveys error:', surveysResult.error);
    return NextResponse.json({ error: surveysResult.error.message }, { status: 500 });
  }

  if (countsResult.error) {
    console.error('[Zanmi] /api/admin/data counts error:', countsResult.error);
  }

  if (latestResult.error) {
    console.error('[Zanmi] /api/admin/data latest error:', latestResult.error);
  }

  const counts: Record<string, { total: number; completed: number }> = {};
  for (const row of (countsResult.data ?? []) as Array<{ survey_id: string; completed: boolean }>) {
    if (!counts[row.survey_id]) counts[row.survey_id] = { total: 0, completed: 0 };
    counts[row.survey_id].total++;
    if (row.completed) counts[row.survey_id].completed++;
  }

  const payload: AdminDataPayload = {
    surveys: (surveysResult.data ?? []) as DbSurvey[],
    counts,
    latestResponses: (latestResult.data ?? []) as LatestResponse[],
  };

  return NextResponse.json(payload);
}
