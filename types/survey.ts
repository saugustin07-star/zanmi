// Database row types — mirror the actual Supabase table columns

export type AudienceType = 'youth' | 'adult';

export type QuestionType =
  | 'multiple_choice'
  | 'emoji_rating'
  | 'yes_no'
  | 'scale'
  | 'short_answer';

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
  audience: AudienceType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// questions table
export interface DbQuestion {
  id: string;
  survey_id: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[] | null; // null for short_answer
  required: boolean;
  points: number;                   // 0 for adult surveys
  order_index: number;
}

// survey_responses table
export interface DbSurveyResponse {
  id: string;
  survey_id: string;
  nickname: string | null;          // youth only
  avatar_id: string | null;         // youth only
  score: number;                    // accumulated points, 0 for adult
  started_at: string;
  completed_at: string | null;      // null if abandoned mid-survey
  created_at: string;
}

// answers table
export interface DbAnswer {
  id: string;
  response_id: string;
  question_id: string;
  answer_value: string | null;      // selected option id for choice/scale/yes_no
  answer_text: string | null;       // free text for short_answer
  created_at: string;
}

// ── Composite types used across the app ──────────────────────────────────────

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
  audience: AudienceType;
  is_active: boolean;
  created_at: string;
  response_count: number;
  completion_rate: number;
}

// Insert shapes (omit server-generated fields)
export type InsertSurvey = Omit<DbSurvey, 'id' | 'created_at' | 'updated_at'>;
export type InsertQuestion = Omit<DbQuestion, 'id'>;
export type InsertSurveyResponse = Omit<DbSurveyResponse, 'id' | 'created_at'>;
export type InsertAnswer = Omit<DbAnswer, 'id' | 'created_at'>;
