import { tagTypes } from "../tagTypes/tagTypes";
import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialty: build.mutation({
      query: (data) => ({
        url: "/specialites",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
    getAllSpecialty: build.query({
      query: () => ({
        url: "/specialites",
        method: "GET",
      }),
      providesTags: [tagTypes.specialties],
    }),
  }),
});

export const { useCreateSpecialtyMutation, useGetAllSpecialtyQuery } =
  specialtiesApi;
