import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    flexGrow: 2,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
}));

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.flexColumn}>
      <Navbar />
      <Container className={classes.container}>
        <>{children}</>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
