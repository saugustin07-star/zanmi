export type QuestionType = 'multiple_choice' | 'emoji_rating' | 'yes_no' | 'scale';

export type SurveyAudience = 'youth' | 'adult';

export interface QuestionOption {
  id: string;
  text: string;
  emoji?: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  required: boolean;
  points: number;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  audience: SurveyAudience;
  questions: Question[];
  created_at: string;
  is_active: boolean;
  response_count: number;
  completion_rate: number;
}

export interface AvatarOption {
  id: string;
  name: string;
  theme: string;
  primaryColor: string;
  bgColor: string;
}

export interface SurveyResponse {
  id: string;
  survey_id: string;
  avatar_id: string | null;
  answers: Record<string, string | number>;
  score: number;
  completed_at: string;
}

export interface ResultSummary {
  question_id: string;
  question_text: string;
  type: QuestionType;
  answers: { label: string; count: number; percentage: number }[];
  total_responses: number;
}
