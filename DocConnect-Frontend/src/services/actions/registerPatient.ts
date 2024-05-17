"use server";

export const registerPatient = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/create-patient`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );
  const patientInfo = res.json();
  return patientInfo;
};
