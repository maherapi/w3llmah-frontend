import React from "react";
import { AppBar, Container, Toolbar, Button, Box, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo-colored.png";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsLoggedIn } from "../../../app/auth/authSlice";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.grey[300],
  },
  container: {
    display: "flex",
  },
  logo: {
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

interface Props {}

const Navbar: React.FC<Props> = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);

  const handleLogout = async () => dispatch(logout());

  return (
    <AppBar position="sticky" className={classes.appbar}>
      <Toolbar>
        <Container className={classes.container}>
          <Link to="/">
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
                <Button color="primary" variant="outlined" onClick={handleLogout}>
                  سجل خروج
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
