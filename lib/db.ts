import { supabase } from './supabaseClient';
import type {
  DbSurvey,
  DbQuestion,
  DbSurveyResponse,
  DbAnswer,
  SurveyWithQuestions,
  InsertSurvey,
  InsertQuestion,
  InsertSurveyResponse,
  InsertAnswer,
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

export async function startResponse(
  response: InsertSurveyResponse
): Promise<string> {
  const { data, error } = await supabase
    .from('survey_responses')
    .insert(response)
    .select('id')
    .single();
  if (error) throw error;
  return (data as { id: string }).id;
}

export async function completeResponse(
  responseId: string,
  score: number
): Promise<void> {
  const { error } = await supabase
    .from('survey_responses')
    .update({ completed_at: new Date().toISOString(), score })
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

export async function saveAnswers(answers: InsertAnswer[]): Promise<void> {
  if (answers.length === 0) return;
  const { error } = await supabase.from('answers').insert(answers);
  if (error) throw error;
}

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
