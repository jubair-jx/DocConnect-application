import assets from "@/assets";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
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
                Login PH HealthCare
              </Typography>
            </Box>
          </Stack>

          {/* {error && ( */}
          <Box>
            <Typography
              sx={{
                backgroundColor: "red",
                padding: "1px",
                borderRadius: "2px",
                color: "white",
                marginTop: "5px",
              }}
            >
              {"error"}
            </Typography>
          </Box>
          {/* )} */}

          <Box>
            {/* <PHForm
          onSubmit={handleLogin}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            email: "",
            password: "",
          }}
        > */}
            <Grid container spacing={2} my={1}>
              <Grid item md={6}>
                {/* <PHInput
                name="email"
                label="Email"
                type="email"
                fullWidth={true}
              /> */}
              </Grid>
              <Grid item md={6}>
                {/* <PHInput
                name="password"
                label="Password"
                type="password"
                fullWidth={true}
              /> */}
              </Grid>
            </Grid>

            <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
              Forgot Password?
            </Typography>

            <Button
              sx={{
                margin: "10px 0px",
              }}
              fullWidth={true}
              type="submit"
            >
              Login
            </Button>
            <Typography component="p" fontWeight={300}>
              Don&apos;t have an account?{" "}
              <Link href="/register">Create an account</Link>
            </Typography>
            {/* </PHForm> */}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
