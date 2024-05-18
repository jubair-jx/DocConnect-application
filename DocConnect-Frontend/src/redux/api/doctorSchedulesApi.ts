import { IMeta } from "@/types";
import { tagTypes } from "../tagTypes/tagTypes";
import { baseApi } from "./baseApi";

const doctorSchedulesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDoctorSchedules: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/doctor-schedule",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: [], meta: IMeta) => {
        return {
          doctorSchedules: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctorSchedule],
    }),
    createDoctorSchedule: build.mutation({
      query: (data) => ({
        url: "/doctor-schedule",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),
  }),
});

export const {
  useGetAllDoctorSchedulesQuery,
  useCreateDoctorScheduleMutation,
} = doctorSchedulesApi;
