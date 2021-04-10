import { Avatar, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { Person as PersonIcon } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSchools, selectAllSchools } from "../../app/registration/registrationSlice";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    minHeight: "100%",
  },
  gridItem: {
    marginTop: theme.spacing(3),
  },
  card: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    "&:hover": {
      boxShadow: theme.shadows[15],
      backgroundColor: theme.palette.grey[100],
    },
  },
  avatar: {
    margin: theme.spacing(1),
    marginRight: "auto",
    marginLeft: "auto",
    height: "100px",
    width: "100px",
    marginBottom: "20px",
  },
  avatarIcon: {
    fontSize: 60,
  },
  bgStudent: {
    backgroundColor: theme.palette.primary.light,
  },
  bgTeacher: {
    backgroundColor: theme.palette.primary.main,
  },
  bgManager: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const registrationLinks = [
  {
    title: "سجل كطالب",
    Icon: PersonIcon,
    link: "/register/student",
    classes: "bgSecondaryLight",
  },
  {
    title: "سجل كأستاذ",
    Icon: PersonIcon,
    link: "/register/teacher",
    classes: "bgSecondaryMain",
  },
  {
    title: "سجل كمدير مدرسة",
    Icon: PersonIcon,
    link: "/register/manager",
    classes: "bgSecondaryDark",
  },
];
interface Props {}

const Registration: React.FC<Props> = (props) => {
  const classes = useStyles();
  const avatarClasses = [classes.bgStudent, classes.bgTeacher, classes.bgManager];

  const dispatch = useDispatch();
  const schools = useSelector(selectAllSchools);

  useEffect(() => {
    if(!schools.length) {
      dispatch(getAllSchools());
    }
  }, [])

  return (
    <Grid container className={classes.gridContainer} justify="space-between" alignContent="center">
      {registrationLinks.map((l, i) => (
        <Grid item xl={3} lg={3} md={4} sm={12} xs={12} key={i} className={classes.gridItem}>
          <Link to={l.link}>
            <Card className={`${classes.card} fadeInUp delay${i + 1}`}>
              <Avatar className={`${classes.avatar} ${avatarClasses[i]}`}>
                <l.Icon className={classes.avatarIcon} />
              </Avatar>
              <Typography color="textPrimary" component="h3" variant="h5" align="center">
                {l.title}
              </Typography>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Registration;
