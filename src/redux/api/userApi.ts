import { IMeta, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPerformer: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-performer`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.quizAttempt],
    }),

    createAdmin: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-admin`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.quizAttempt],
    }),

    getAllAdmins: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${USER_URL}/admins`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IUser[], meta: IMeta) => ({
        admins: response,
        meta,
      }),
      providesTags: [tagTypes.user, tagTypes.quizAttempt],
    }),

    getAllPerformers: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${USER_URL}/performers`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IUser[], meta: IMeta) => ({
        performers: response,
        meta,
      }),
      providesTags: [tagTypes.user, tagTypes.quizAttempt],
    }),
    getAllUsers: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${USER_URL}/`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IUser[], meta: IMeta) => ({
        users: response,
        meta,
      }),
      providesTags: [tagTypes.user, tagTypes.quizAttempt],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useCreatePerformerMutation,
  useGetAllAdminsQuery,
  useGetAllPerformersQuery,
  useGetAllUsersQuery,
} = userApi;
