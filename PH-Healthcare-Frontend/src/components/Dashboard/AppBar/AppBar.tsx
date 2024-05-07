"use client";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

function AppTopBar({ drawerWidth }: { drawerWidth: number }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        background: "#F4F7FE",
        boxShadow: 0,
        borderBottom: "1px solid lightgray",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" }, color: "primary.main" }}
        >
          <MenuIcon />
        </IconButton>
        <Box>
          <Typography variant="body2" noWrap component="div" color="gray">
            Hi, Tanmoy Parvez
          </Typography>
          <Typography
            variant="body2"
            noWrap
            component="div"
            color="primary.main"
          >
            Welcome To, PH Health Care !
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default AppTopBar;
