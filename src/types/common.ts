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
}

export interface IQuestions {
  id: string;
  text: string;
  options: string[];
  correctOption: string[] | string;
  quizCategoryId: string;
  quizzes?: IQuizCategory;
}

export enum UserRole {
  PERFORMER = "PERFORMER",
  ADMIN = "ADMIN",
}
