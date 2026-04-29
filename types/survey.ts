// Database row types — mirror the actual Supabase table columns

export type AudienceType = 'student' | 'adult';

export type SurveyStatus = 'draft' | 'published' | 'archived';

export type QuestionType =
  | 'multiple_choice'
  | 'rating_scale'
  | 'yes_no'
  | 'short_answer'
  | 'long_answer'
  | 'emoji_rating'  // legacy alias
  | 'scale';        // legacy alias

// Stored as JSONB in the questions table
export interface QuestionOption {
  id: string;
  text: string;
  emoji?: string;
}

// surveys table
export interface DbSurvey {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  audience_type: AudienceType;
  status: SurveyStatus;
  public_slug: string | null;
  created_at: string;
  updated_at: string;
}

// questions table
export interface DbQuestion {
  id: string;
  survey_id: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[] | null; // null for open-ended types
  required: boolean;
  points: number;
  order_index: number;
}

// survey_responses table
export interface DbSurveyResponse {
  id: string;
  survey_id: string;
  nickname: string | null;
  avatar_id: string | null;
  score: number;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

// answers table
export interface DbAnswer {
  id: string;
  response_id: string;
  question_id: string;
  answer_value: string | null; // selected option id for choice/scale/yes_no/rating_scale
  answer_text: string | null;  // free text for short_answer / long_answer
  created_at: string;
}

// ── Composite types ───────────────────────────────────────────────────────────

export interface SurveyWithQuestions extends DbSurvey {
  questions: DbQuestion[];
}

export interface ResponseWithAnswers extends DbSurveyResponse {
  answers: DbAnswer[];
}

// Lightweight shape for listing surveys in the dashboard
export interface SurveyListItem {
  id: string;
  title: string;
  emoji: string;
  color: string;
  audience_type: AudienceType;
  status: SurveyStatus;
  created_at: string;
  response_count: number;
  completion_rate: number;
}

// Insert shapes (omit server-generated fields)
export type InsertSurvey = Omit<DbSurvey, 'id' | 'created_at' | 'updated_at'>;
export type InsertQuestion = Omit<DbQuestion, 'id'>;
export type InsertSurveyResponse = Omit<DbSurveyResponse, 'id' | 'created_at'>;
export type InsertAnswer = Omit<DbAnswer, 'id' | 'created_at'>;
