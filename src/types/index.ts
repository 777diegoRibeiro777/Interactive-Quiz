export interface TriviaApiResult {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface TriviaApiResponse {
  response_code: number;
  results: TriviaApiResult[];
}

export interface QuestionAndAnswers {
  question: string;
  correct_answer: string;
  answers: string[];
}

export enum View {
  Create = 'create',
  Quiz = 'quiz',
  Done = 'done'
}

export interface CreateQuizFormValues {
  category: string;
  amount: number;
  difficulty: string;
  type: string;
}

export interface QuizFormValues {
  answers: string[];
}