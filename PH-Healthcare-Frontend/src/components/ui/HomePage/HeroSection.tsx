import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "../../../assets";
export const HeroSection = () => {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          direction: "row",
        }}
      >
        <Box
          sx={{
            flex: 1,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "700px",
              left: "-90px",
              top: "-120px",
            }}
          >
            <Image src={assets.svgs.grid} alt="Grid Image" />
            <Typography variant="h2" component="h1" fontWeight={600}>
              Healthier Hearts
            </Typography>
            <Typography variant="h2" component="h1" fontWeight={600}>
              Come From
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              fontWeight={600}
              color="primary.main"
            >
              Preventive Care
            </Typography>
            <Typography sx={{ my: 4 }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit
              eum iusto consequatur eius, doloribus nesciunt facere aliquid
              eveniet et. Rerum maiores saepe cupiditate repellat recusandae
              atque sed. Saepe, vitae id?
            </Typography>
          </Box>
        </Box>
        <Box>right</Box>
      </Container>
    </>
  );
};
