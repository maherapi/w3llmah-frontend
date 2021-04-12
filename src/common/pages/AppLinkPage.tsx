import React from "react";
import { Apps as AppsIcon, Title } from "@material-ui/icons";
import { makeStyles, Card, Avatar, Typography, Box, Link, Tooltip } from "@material-ui/core";
import appStoreLogo from "../../assets/images/appstore.png";
import playStoreLogo from "../../assets/images/playstore.png";
import env from "../../env";

const useStyles = makeStyles((theme) => ({
  card: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  avatar: {
    margin: theme.spacing(1),
    marginRight: "auto",
    marginLeft: "auto",
    height: "100px",
    width: "100px",
    marginBottom: "20px",
    backgroundColor: theme.palette.success.light,
  },
  avatarIcon: {
    fontSize: 60,
  },
  storeLogosContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "70px",
      height: "70px",
      margin: theme.spacing(4),
      filter: "grayscale(50%)",
      transitionProperty: "all",
      transitionDuration: "0.3s",
      transitionTimingFunction: "ease-in-out",
      "&:hover": {
        filter: "grayscale(0)",
      },
    },
  },
}));

interface Props {}

const AppLinkPage: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.card} fadeInUp`}>
      <Avatar className={`${classes.avatar}`}>
        <AppsIcon className={classes.avatarIcon} />
      </Avatar>
      <Typography color="textPrimary" component="h3" variant="h5" align="center">
        {`حمل التطبيق من متجر التطبيقات`}
      </Typography>
      <Box className={classes.storeLogosContainer}>
        <Tooltip title="متجر آبل">
          <Link href={env.iOSAppLink} target="_blank">
            <img src={appStoreLogo} alt="appstore" />
          </Link>
        </Tooltip>
        <Tooltip title="متجر جوجل">
          <Link href={env.androidAppLink} target="_blank">
            <img src={playStoreLogo} alt="playstore" />
          </Link>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default AppLinkPage;
