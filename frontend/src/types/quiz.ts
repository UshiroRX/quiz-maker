export interface Answer {
  id: number;
  text: string;
  is_correct: boolean;
}

export interface Question {
  id: number;
  title: string;
  is_multiple: boolean;
  is_text: boolean;
  points: number;
  answers: Answer[];
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  created_by: number;
  created_at: string;
  questions: Question[];
  tags: string[];
}
