import React, { useState } from "react";
import { AppBar, Container, Toolbar, Button, Box, makeStyles, IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo-colored.png";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsLoggedIn } from "../../../app/auth/authSlice";
import { ExitToAppRounded as ExitToAppRoundedIcon, MailOutline as MailOutlineIcon } from "@material-ui/icons";
import MessagesScreen from "../../components/messages/MessagesScreen";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.grey[300],
  },
  container: {
    display: "flex",
  },
  logoLink: {
    display: "grid",
    placeItems: "center",
  },
  logo: {
    display: "grid",
    placeItems: "center",
    "& img": {
      maxHeight: "50px",
    },
  },
  navlinks: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

interface Props {
  onToggleSideBar: () => void;
}

const Navbar: React.FC<Props> = ({ onToggleSideBar }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);

  const [messagesOpen, setMessagesOpen] = useState(false);

  const handleLogout = async () => dispatch(logout());

  return (
    <AppBar position="sticky" className={classes.appbar}>
      <Toolbar>
        <Container className={classes.container}>
          {loggedIn && (
            <IconButton color="primary" aria-label="المتنقل الجانبي" onClick={onToggleSideBar}>
              <MenuIcon />
            </IconButton>
          )}
          <Link to="/" className={classes.logoLink}>
            <Box className={classes.logo}>
              <img src={logo} alt="شعار وعلمه" />
            </Box>
          </Link>
          <Box className={classes.navlinks}>
            {!loggedIn ? (
              <>
                <Link to="/login">
                  <Button color="primary">سجل دخول</Button>
                </Link>
                <Link to="/register">
                  <Button color="primary" variant="outlined">
                    أنشئ حساب
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Tooltip title="الرسائل">
                  <IconButton
                    color="primary"
                    aria-label="قائمة الرسائل"
                    onClick={() => setMessagesOpen((open) => !open)}
                  >
                    <MailOutlineIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="سجل خروج">
                  <IconButton color="primary" aria-label="زر تسجيل الخروج" onClick={handleLogout}>
                    <ExitToAppRoundedIcon />
                  </IconButton>
                </Tooltip>
                <MessagesScreen open={messagesOpen} onClose={() => setMessagesOpen((_) => false)} />
              </>
            )}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
