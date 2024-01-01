import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const QUIZ_ATTEMPTS_URL = "/quiz-attempts";

export const quizAttemptApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitAttempt: build.mutation({
      query: (data) => ({
        url: `${QUIZ_ATTEMPTS_URL}/submit`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.quizAttempt],
    }),
  }),
});

export const { useSubmitAttemptMutation } = quizAttemptApi;
