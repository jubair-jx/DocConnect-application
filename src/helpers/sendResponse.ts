import { Response } from "express";

type TResponseData<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    totalCount: number;
  };
  data: T | null | undefined;
};
const sendResponse = <T>(res: Response, jsonData: TResponseData<T>) => {
  res.status(jsonData?.statusCode).json({
    success: jsonData.success,
    message: jsonData.message,
    meta: jsonData.meta || undefined || null,
    data: jsonData.data || undefined || null,
  });
};

export default sendResponse;
