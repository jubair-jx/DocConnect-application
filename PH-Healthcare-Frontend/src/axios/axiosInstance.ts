import { authKey } from "@/constant/constant";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getLocalStorageUserInfo } from "@/utils/local-storage";
import axios from "axios";

export const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;


// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const accessToken = getLocalStorageUserInfo(authKey);
  
      if (accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    //@ts-ignore
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      const responseObject: ResponseSuccessType = {
        data: response?.data?.data,
        meta: response?.data?.meta,
      };
      return responseObject;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessages: error?.response?.data?.message,
      };
      // return Promise.reject(error);
      return responseObject;
    }
  );