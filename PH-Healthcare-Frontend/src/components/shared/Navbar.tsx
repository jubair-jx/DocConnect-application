import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <Container>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        justifyItems={"center"}
      >
        <Typography variant="h5" component={Link} href={"/"} fontWeight={600}>
          <Box component={"span"} color={"primary.main"}>
            Doc
          </Box>
          {""}
          Connect
        </Typography>
        <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
          <Typography>Consultation</Typography>
          <Typography>Health Plans</Typography>
          <Typography>Medicine</Typography>
          <Typography>Diagonstics</Typography>
          <Typography>NGOs</Typography>
        </Stack>
        <Button variant="contained" component={Link} href="/login">
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Navbar;
