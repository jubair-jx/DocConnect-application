import assets from "@/assets";
import { getUserInfo } from "@/services/auth-service";
import { UserRole } from "@/types";
import { GenerateDrawerItems } from "@/utils/DrawerItems";
import { Box, Divider, Stack, Typography } from "@mui/material";
import List from "@mui/material/List";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideBarItems from "./SideBarItems";
function SideBar() {
  const [userRole, setUserRole] = useState("");
  const { role } = getUserInfo();
  useEffect(() => {
    setUserRole(role);
  }, [role]);
  return (
    <Box>
      <Stack
        sx={{
          py: 1,
          mt: 1,
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        component={Link}
        href="/"
      >
        <Image src={assets.svgs.logo} width={40} height={40} alt="logo" />
        <Typography variant="h5" component={Link} href={"/"} fontWeight={600}>
          <Box component={"span"} color={"primary.main"}>
            Doc
          </Box>
          {""}
          Connect
        </Typography>
      </Stack>
      <Divider />
      <List>
        {GenerateDrawerItems(userRole as UserRole).map((item, index) => (
          <SideBarItems key={index} item={item} />
        ))}
      </List>
      <Divider />
    </Box>
  );
}

export default SideBar;
