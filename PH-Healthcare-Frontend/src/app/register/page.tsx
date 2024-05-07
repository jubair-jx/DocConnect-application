"use client";
import assets from "@/assets";
import PHFrom from "@/components/Form/PHFrom";
import PHInput from "@/components/Form/PHInput";
import { registerPatient } from "@/services/actions/registerPatient";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth-service";
import { modifyPayload } from "@/utils/FormDataPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const patientValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter your email"),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid contact number"),
  address: z.string().min(1, "Please enter a valid address"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Password must be 6 characters"),
  patient: patientValidationSchema,
});

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);

    try {
      const res = await registerPatient(data);

      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.patient.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>

          <Box>
            <PHFrom
              defaultValues={{
                password: "",
                patient: {
                  name: "",
                  email: "",
                  contactNumber: "",
                  address: "",
                },
              }}
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <PHInput
                    label="Name"
                    type="text"
                    size="small"
                    fullWidth={true}
                    name="patient.name"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Email"
                    type="email"
                    size="small"
                    fullWidth={true}
                    name="patient.email"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Contact Number"
                    type="tel"
                    size="small"
                    fullWidth={true}
                    name="patient.contactNumber"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Address"
                    type="text"
                    size="small"
                    fullWidth={true}
                    name="patient.address"
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                <p className=" text-green-500">
                  {" "}
                  Do you already have an account?
                </p>{" "}
                <Link href="/login">Login</Link>
              </Typography>
            </PHFrom>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
