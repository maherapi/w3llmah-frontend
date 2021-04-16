import React from "react";
import { TimeToLeave as TimeToLeaveIcon } from "@material-ui/icons";
import { makeStyles, Card, Avatar, Typography } from "@material-ui/core";

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
    backgroundColor: theme.palette.warning.dark,
  },
  avatarIcon: {
    fontSize: 60,
  },
}));

interface Props {}

const WaitForApprovePage: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.card} fadeInUp`}>
      <Avatar className={`${classes.avatar}`}>
        <TimeToLeaveIcon className={classes.avatarIcon} />
      </Avatar>
      <Typography color="textPrimary" component="h3" variant="h5" align="center">
        {`مرحبًا.. يرجى الانتظار إلى أن تتم معالجة طلبك`}
      </Typography>
    </Card>
  );
};

export default WaitForApprovePage;
