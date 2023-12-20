"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import AppsIcon from "@mui/icons-material/Apps";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSession, signOut } from "next-auth/react";
import { Avatar, Badge, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";
import { purple, red } from "@mui/material/colors";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor:'#172025',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor:'#172025',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});
const DrawerTitle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor:'red',
  
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export const AccountZone = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "20px",
  paddingRight: "30px",
  paddingLeft: "30px",
}));

export default function SideBar() {
  const { data: session } = useSession();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChangeTab = (tab: number) => {
    if (tab === 0) {
      router.push("/");
    } else if (tab === 1) {
      router.push("/favorite");
    } else {
      return;
    }
  };

  return (
    <Box sx={{ display: "flex"  }}>
      <CssBaseline />
      {session ? (
        <Drawer variant="permanent" open={open} >
          <DrawerTitle>
            {open && (
              <AccountZone>
                <Avatar
                  alt="image"
                  src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
                  sx={{ width: 60, height: 60 }}
                />
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={theme.palette.primary.contrastText}
                >
                  {session.user?.name}
                </Typography>
              </AccountZone>
            )}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{
                marginTop: 2,
                ...(open && { display: "none" }),
                color: 'white'
              }}
            >
              <Avatar
                alt="image"
                src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
                sx={{ width: 50, height: 50 }}
              />
            </IconButton>
          </DrawerTitle>
          <DrawerHeader>
            {open && (
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon sx={{color: 'white' }}/>
                ) : (
                  <ChevronLeftIcon sx={{color: 'white' }}/>
                )}
              </IconButton>
            )}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{
                marginRight: 1.5,
                ...(open && { display: "none" }),
                color: 'white'
              }}
            >
              <MenuIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["Movie", "Favorite"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    color:'white'
                  }}
                  onClick={() => handleChangeTab(index)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                      px: 5,
                    }}
                  >
                    {index === 0 && <AppsIcon sx={{color: theme.palette.primary.light }} />}
                    {index === 1 && (
                      <Badge badgeContent={1} color="primary">
                        <FavoriteIcon sx={{ color: theme.palette.primary.light}} />
                      </Badge>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List sx={{ bottom: 0, left: 0, right: 0, position: "absolute" }}>
            {["Log out"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 5,
                    color:'white'
                  }}
                  onClick={() => signOut()}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "red",
                    }}
                  >
                    {<LogoutIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      ) : (
        <></>
      )}
    </Box>
  );
}
