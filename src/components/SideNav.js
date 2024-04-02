import React, { useState } from "react";
import { AppBar, Toolbar, Box, IconButton, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Drawer } from "@mui/material";
import { Login, Menu, Home, KingBed, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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

export default function SideNav() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth0();

  const toggleSlider = () => {
    setOpen(!open);
  };

  const handleListPath = (route) => {
    navigate(route);
    setOpen(false);
  }

  const sideList = () => (
    <Box 
      className={classes.menuSliderContainer} 
      component="div" 
      sx={{ width: 200 }}
    >
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
          <ListItem className={classes.listItem} button onClick={() => handleListPath("/profile")}>
            <ListItemIcon className={classes.listItem}>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
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
              <Menu sx={{ color: 'white'}}/>
            </IconButton>
            <Drawer open={open} anchor="left" onClose={toggleSlider}>
              {sideList()}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
