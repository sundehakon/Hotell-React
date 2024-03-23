import React, { useState } from "react";
import { AppBar, Toolbar, Box, IconButton, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Drawer, Typography, Divider } from "@mui/material";
import { Login, Menu, Home, KingBed, Person, Room } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import RegisterForm from "./RegisterForm";

const useStyles = () => ({
  menuSliderContainer: {
    width: 250,
    background: "#511",
    height: "100%"
  },
  listItem: {
    color: "tan"
  }
});

const listItems = [
  {
    listIcon: <Home />,
    listText: "Home",
    route: "/"
  },
  {
    listIcon: <KingBed />,
    listText: "Rooms",
    route: "/rooms"
  },
  {
    listIcon: <Login />,
    listText: "Register",
    route: "/register"
  },
  {
    listIcon: <Person />,
    listText: "Profile",
    route: "/profile"
  }
];

export default function SideNav() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const username = Cookies.get('username');

  const toggleSlider = () => {
    setOpen(!open);
  };

  const handleListPath = (route) => {
    navigate(route);
    setOpen(false);
  }

  const renderProfileOrRegister = () => {
    if (username) {
      return (
        <ListItem className={classes.listItem} button onClick={() => handleListPath("/profile")}>
          <ListItemIcon className={classes.listItem}>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      );
    } else {
      return (
        <ListItem className={classes.listItem} button onClick={() => handleListPath("/register")}>
          <ListItemIcon className={classes.listItem}>
            <Login />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItem>
      );
    }
  };

  const sideList = () => (
    <Box 
      className={classes.menuSliderContainer} 
      component="div" 
      sx={{ width: 200 }}
    >
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Hotell</Typography>
    </Box>
      <Divider />
      <List>
          <ListItem className={classes.listItem} button onClick={() => handleListPath("/")}>
            <ListItemIcon className={classes.listItem}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem className={classes.listItem} button onClick={() => handleListPath("/rooms")}>
            <ListItemIcon className={classes.listItem}>
              <KingBed />
            </ListItemIcon>
            <ListItemText primary="Rooms" />
          </ListItem>
          {renderProfileOrRegister()}
      </List>
    </Box>
  );

  return (
    <>
      <CssBaseline />

      <Box component="nav">
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={toggleSlider}>
              <Menu />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {username && <Typography variant="h6" sx={{ textAlign: 'center', gap: 10, fontWeight: 'bold' }}>Welcome, {username}</Typography>}
            </Box>
            <Drawer open={open} anchor="left" onClose={toggleSlider}>
              {sideList()}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
