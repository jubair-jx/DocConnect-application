"use server";

import { FieldValues } from "react-hook-form";

export const userLogin = async (values: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
      cache: "no-store",
    }
  );
  const userInfo = await res.json();
  return userInfo;
};
