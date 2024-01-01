import { IMeta, IQuestions } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const QUESTIONS_URL = "/questions";

export const questionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createQuestions: build.mutation({
      query: (data) => ({
        url: QUESTIONS_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.questions],
    }),

    getAllQuestions: build.query({
      query: (arg: Record<string, any>) => ({
        url: QUESTIONS_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IQuestions[], meta: IMeta) => ({
        questions: response,
        meta,
      }),
      providesTags: [tagTypes.questions],
    }),

    getQuestionsByCategory: build.query({
      query: ({
        categoryId,
        arg,
      }: {
        categoryId: string;
        arg: Record<string, any>;
      }) => ({
        url: `${QUESTIONS_URL}/category/${categoryId}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IQuestions[], meta: IMeta) => ({
        services: response,
        meta,
      }),
      providesTags: [tagTypes.questions],
    }),

    getQuestionsById: build.query({
      query: (id: string) => ({
        url: `${QUESTIONS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.questions],
    }),

    updateQuestions: build.mutation({
      query: (data) => ({
        url: `${QUESTIONS_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.questions],
    }),

    deleteQuestions: build.mutation({
      query: (id) => ({
        url: `${QUESTIONS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.questions],
    }),
  }),
});

export const {} = questionsApi;
