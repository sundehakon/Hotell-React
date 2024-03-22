import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Home, AssignmentInd, Apps, ContactMail, Menu } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    background: "#511",
    height: "100%"
  },
  avatar: {
    margin: "0.5rem auto",
    padding: "1rem",
    width: theme.spacing(13),
    height: theme.spacing(13)
  },
  listItem: {
    color: "tan"
  }
}));

const listItems = [
  {
    listIcon: <Home />,
    listText: "Home"
  },
  {
    listIcon: <AssignmentInd />,
    listText: "Rooms"
  },
  {
    listIcon: <Apps />,
    listText: "Register"
  },
  {
    listIcon: <ContactMail />,
    listText: "Contacts"
  }
];

export default function SideNav() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

  const sideList = () => (
    <Box className={classes.menuSliderContainer} component="div">
      <List>
        {listItems.map((listItem, index) => (
          <ListItem className={classes.listItem} button key={index}>
            <ListItemIcon className={classes.listItem}>
              {listItem.listIcon}
            </ListItemIcon>
            <ListItemText primary={listItem.listText} />
          </ListItem>
        ))}
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
            <Typography variant="h6">Portfolio</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} anchor="right" onClose={toggleSlider}>
        {sideList()}
      </Drawer>
    </>
  );
}
