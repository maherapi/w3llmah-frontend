import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    marginTop: "auto",
  },
}));

interface Props {}

const Footer: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.bg} component="footer">
      <Container>
        <Typography align="center" color="secondary">
          جميع الحقوق محفوظة &copy; وعلمه
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
