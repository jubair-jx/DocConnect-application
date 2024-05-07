import { USER_ROLE } from "@/constant/role";

export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type UserRole = keyof typeof USER_ROLE;
