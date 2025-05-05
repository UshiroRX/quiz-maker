export interface QuizFormData {
  title: string;
  description: string;
  questions: CreateQuestion[];
}

export interface CreateQuestion {
  id: number;
  title: string;
  points: number;
  is_multiple: boolean;
  is_text: boolean;
  answers: CreateAnswer[];
}

export interface CreateAnswer {
  text: string;
  is_correct: boolean;
}
