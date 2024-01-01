export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type ResponseErrorType = {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  quizzes: IQuizCategory[];
  quizAttempts: IQuizAttempt[];
}

export interface IQuizCategory {
  id: string;
  title: string;
  description: string;
  category: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: IUser;
  questions?: IQuestions[];
  QuizAttempts?: IQuizAttempt[];
}

export interface IQuestions {
  id: string;
  text: string;
  options: string[];
  correctOptions: string[];
  quizCategoryId: string;
  quizzes?: IQuizCategory;
}

export interface IQuizAttempt {
  id: string;
  userId: string;
  quizCategoryId: string;
  score: number;
  startedAt: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPerformerStats {
  id: string;
  totalAttempts: number;
  totalScore: number;
}

export enum UserRole {
  PERFORMER = "PERFORMER",
  ADMIN = "ADMIN",
}
