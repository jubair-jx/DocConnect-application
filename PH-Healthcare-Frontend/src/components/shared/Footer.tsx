import facebookIcon from "@/assets/landing_page/facebook.png";
import InstagramIcon from "@/assets/landing_page/instagram.png";
import linkdInIcon from "@/assets/landing_page/linkedin.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <Box bgcolor="#32012F" py={5}>
      <Container>
        <Stack
          color={"#fff"}
          direction={"row"}
          gap={4}
          justifyContent={"center"}
        >
          <Typography color={"#fff"}>Consultation</Typography>
          <Typography color={"#fff"}>Health Plans</Typography>
          <Typography color={"#fff"}>Medicine</Typography>
          <Typography color={"#fff"}>Diagonstics</Typography>
          <Typography color={"#fff"}>NGOs</Typography>
        </Stack>
        <Stack
          color={"#fff"}
          direction={"row"}
          gap={3}
          py={3}
          justifyContent={"center"}
        >
          <Link href={"/"}>
            <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          </Link>
          <Link href={"/"}>
            <Image src={InstagramIcon} width={30} height={30} alt="facebook" />
          </Link>
          <Link href={"/"}>
            <Image src={twitterIcon} width={30} height={30} alt="facebook" />
          </Link>
          <Link href={"/"}>
            <Image src={linkdInIcon} width={30} height={30} alt="facebook" />
          </Link>
        </Stack>
        <div className="border-b-[1px] border-dashed"></div>
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          py={3}
        >
          <Typography component="p" color="white">
            &copy;2024 DocConnect. All Rights Reserved.
          </Typography>
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
            color="white"
          >
            <Box component="span" color="primary.main">
              Doc
            </Box>
            {""}
            Connect
          </Typography>
          <Typography component="p" color="white">
            Privacy Policy! Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
