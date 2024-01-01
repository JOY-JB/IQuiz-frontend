import { IMeta, IQuizCategory } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const QUIZ_CATEGORY_URL = "/quiz-categories";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createQuizCategory: build.mutation({
      query: (data) => ({
        url: QUIZ_CATEGORY_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.quizCategory],
    }),

    getAllQuizCategory: build.query({
      query: (arg: Record<string, any>) => ({
        url: QUIZ_CATEGORY_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IQuizCategory[], meta: IMeta) => ({
        quizCategories: response,
        meta,
      }),
      providesTags: [tagTypes.quizCategory],
    }),

    getCategoryById: build.query({
      query: (id: string) => ({
        url: `${QUIZ_CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.quizCategory],
    }),

    updateCategory: build.mutation({
      query: (data) => ({
        url: `${QUIZ_CATEGORY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.quizCategory],
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${QUIZ_CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.quizCategory],
    }),
  }),
});

export const {
  useCreateQuizCategoryMutation,
  useGetAllQuizCategoryQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = serviceApi;
