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
  }),
});

export const { useCreateAdminMutation, useCreatePerformerMutation } = userApi;
