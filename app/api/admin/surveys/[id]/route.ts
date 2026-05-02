import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/adminSession';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { DbSurvey, DbQuestion, DbSurveyResponse, DbAnswer } from '@/types/survey';

export type AdminSurveyPayload = {
  survey: DbSurvey;
  questions: DbQuestion[];
  responses: DbSurveyResponse[];
  answers: DbAnswer[];
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value ?? '';
  if (!(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing survey id' }, { status: 400 });
  }

  const [surveyResult, questionsResult, responsesResult] = await Promise.all([
    supabaseAdmin.from('surveys').select('*').eq('id', id).single(),
    supabaseAdmin.from('questions').select('*').eq('survey_id', id).order('order_index'),
    supabaseAdmin
      .from('survey_responses')
      .select('*')
      .eq('survey_id', id)
      .order('started_at', { ascending: false }),
  ]);

  if (surveyResult.error || !surveyResult.data) {
    const msg = surveyResult.error?.message ?? 'Survey not found';
    console.error('[Zanmi] /api/admin/surveys/[id] survey error:', surveyResult.error);
    return NextResponse.json({ error: msg }, { status: 404 });
  }

  if (questionsResult.error) {
    console.error('[Zanmi] /api/admin/surveys/[id] questions error:', questionsResult.error);
  }

  if (responsesResult.error) {
    console.error('[Zanmi] /api/admin/surveys/[id] responses error:', responsesResult.error);
  }

  const responses = (responsesResult.data ?? []) as DbSurveyResponse[];
  let answers: DbAnswer[] = [];

  if (responses.length > 0) {
    const responseIds = responses.map(r => r.id);
    const { data: answersData, error: answersErr } = await supabaseAdmin
      .from('answers')
      .select('*')
      .in('response_id', responseIds);

    if (answersErr) {
      console.error('[Zanmi] /api/admin/surveys/[id] answers error:', answersErr);
    }
    answers = (answersData ?? []) as DbAnswer[];
  }

  const payload: AdminSurveyPayload = {
    survey: surveyResult.data as DbSurvey,
    questions: ((questionsResult.data ?? []) as DbQuestion[]).sort(
      (a, b) => a.order_index - b.order_index
    ),
    responses,
    answers,
  };

  return NextResponse.json(payload);
}
