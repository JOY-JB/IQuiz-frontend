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
      invalidatesTags: [tagTypes.user],
    }),

    createAdmin: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-admin`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
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
      providesTags: [tagTypes.user],
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
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useCreatePerformerMutation,
  useGetAllAdminsQuery,
  useGetAllPerformersQuery,
} = userApi;
