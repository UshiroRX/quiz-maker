type QuizFormData = {
  title: string;
  description: string;
  questions: Question[];
  tags: string[];
};

type Question = {
  title: string;
  points: number;
  is_multiple: boolean;
  is_text: boolean;
  answers: Answer[];
};

type Answer = {
  text: string;
  is_correct: boolean;
};

export type { QuizFormData };
