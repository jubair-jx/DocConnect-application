// Need to use the React-specific entry point to import createApi
import { axiosBaseQuery } from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  endpoints: () => ({}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {} = baseApi;
