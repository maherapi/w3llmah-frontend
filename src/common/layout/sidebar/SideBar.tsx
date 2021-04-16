import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Box, Divider, SvgIconTypeMap } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/logo/logo-colored.png";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    color: theme.palette.primary.dark,
  },
  fullList: {
    width: "auto",
  },

  logo: {
    display: "grid",
    placeItems: "center",
    "& img": {
      maxHeight: "80px",
    },
  },
  logoLink: {
    display: "grid",
    placeItems: "center",
    margin: theme.spacing(3, 5),
  },
}));

export type VendorIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">>;

export interface ISideNavLink {
  text: string;
  link: string;
  Icon: VendorIcon;
}

interface Props {
  sideNaveLinks: ISideNavLink[];
  open: boolean;
  setOpenSideBar: (open: boolean) => void;
}

const SideBar: React.FC<Props> = ({ sideNaveLinks, open, setOpenSideBar }) => {
  const classes = useStyles();
  const history = useHistory();

  const toggleDrawer = (value: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpenSideBar(value);
  };

  return (
    <SwipeableDrawer anchor="left" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
      <Box onClick={() => history.push("/")} className={classes.logoLink}>
        <Box className={classes.logo}>
          <img src={logo} alt="شعار وعلمه" />
        </Box>
      </Box>
      <Divider />
      <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        {sideNaveLinks.map((link) => (
          <Box onClick={() => history.push(link.link)} key={link.link}>
            <ListItem button key={link.text}>
              <ListItemIcon>{<link.Icon />}</ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItem>
          </Box>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default SideBar;
