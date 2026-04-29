import { supabase } from './supabaseClient';
import type {
  DbSurvey,
  DbQuestion,
  DbSurveyResponse,
  DbAnswer,
  SurveyWithQuestions,
  InsertSurvey,
  InsertQuestion,
} from '@/types/survey';

// ── Surveys ───────────────────────────────────────────────────────────────────

export async function getSurveyBySlug(slug: string): Promise<SurveyWithQuestions | null> {
  const { data, error } = await supabase
    .from('surveys')
    .select('*, questions(*)')
    .eq('public_slug', slug)
    .eq('status', 'published')
    .eq('audience_type', 'student')
    .single();
  if (error) return null;
  const survey = data as SurveyWithQuestions & { questions: DbQuestion[] };
  survey.questions = (survey.questions ?? []).sort(
    (a, b) => a.order_index - b.order_index
  );
  return survey;
}

export async function getSurveys(): Promise<DbSurvey[]> {
  const { data, error } = await supabase
    .from('surveys')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getSurveyById(id: string): Promise<SurveyWithQuestions | null> {
  const { data, error } = await supabase
    .from('surveys')
    .select('*, questions(*)')
    .eq('id', id)
    .single();
  if (error) return null;
  const survey = data as SurveyWithQuestions & { questions: DbQuestion[] };
  survey.questions = (survey.questions ?? []).sort(
    (a, b) => a.order_index - b.order_index
  );
  return survey;
}

export async function createSurvey(
  survey: InsertSurvey,
  questions: InsertQuestion[]
): Promise<string> {
  const { data, error } = await supabase
    .from('surveys')
    .insert(survey)
    .select('id')
    .single();
  if (error) throw error;
  const surveyId = (data as { id: string }).id;
  if (questions.length > 0) {
    const { error: qErr } = await supabase
      .from('questions')
      .insert(questions.map((q) => ({ ...q, survey_id: surveyId })));
    if (qErr) throw qErr;
  }
  return surveyId;
}

// ── Questions ─────────────────────────────────────────────────────────────────

export async function getQuestionsBySurveyId(surveyId: string): Promise<DbQuestion[]> {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('survey_id', surveyId)
    .order('order_index');
  if (error) throw error;
  return data ?? [];
}

// ── Responses ─────────────────────────────────────────────────────────────────

export async function createStudentResponse(payload: {
  survey_id: string;
  audience_type: string;
  respondent_nickname: string | null;
  avatar: string | null;
  completed: boolean;
}): Promise<string> {
  const responseId = crypto.randomUUID();
  const insert = {
    id: responseId,
    survey_id: payload.survey_id,
    audience_type: payload.audience_type,
    respondent_nickname: payload.respondent_nickname,
    avatar: payload.avatar,
    completed: payload.completed,
  };
  console.log('[Zanmi] survey_responses insert payload:', JSON.stringify(insert, null, 2));
  const { error } = await supabase.from('survey_responses').insert(insert);
  if (error) {
    console.error('[Zanmi] survey_responses insert error:', JSON.stringify(error, null, 2));
    throw error;
  }
  return responseId;
}

export async function saveStudentAnswers(
  answers: Array<{ response_id: string; question_id: string; answer_value: string }>
): Promise<void> {
  if (answers.length === 0) return;
  const { error } = await supabase.from('answers').insert(answers);
  if (error) throw error;
}

export async function markResponseComplete(responseId: string): Promise<void> {
  const { error } = await supabase
    .from('survey_responses')
    .update({ completed: true, submitted_at: new Date().toISOString() })
    .eq('id', responseId);
  if (error) throw error;
}

export async function getResponsesBySurveyId(
  surveyId: string
): Promise<DbSurveyResponse[]> {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('*')
    .eq('survey_id', surveyId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// ── Answers ───────────────────────────────────────────────────────────────────

export async function getAnswersByResponseId(
  responseId: string
): Promise<DbAnswer[]> {
  const { data, error } = await supabase
    .from('answers')
    .select('*')
    .eq('response_id', responseId);
  if (error) throw error;
  return data ?? [];
}

export async function getAnswersByResponseIds(
  responseIds: string[]
): Promise<DbAnswer[]> {
  if (responseIds.length === 0) return [];
  const { data, error } = await supabase
    .from('answers')
    .select('*')
    .in('response_id', responseIds);
  if (error) throw error;
  return data ?? [];
}

// ── Admin aggregates ──────────────────────────────────────────────────────────

export async function getResponseCountsBySurvey(): Promise<
  Record<string, { total: number; completed: number }>
> {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('survey_id, completed');
  if (error) throw error;
  const counts: Record<string, { total: number; completed: number }> = {};
  for (const row of (data ?? []) as Array<{ survey_id: string; completed: boolean }>) {
    if (!counts[row.survey_id]) counts[row.survey_id] = { total: 0, completed: 0 };
    counts[row.survey_id].total++;
    if (row.completed) counts[row.survey_id].completed++;
  }
  return counts;
}
