import { Avatar, Button, Card, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { setSuccess } from "../../../app/data-source/feedback/clientFeedbackSlice";
import { SchoolStatus } from "../../../app/schools/data-source/dtos";
import {
  selectActivationSchoolFinished,
  selectActivationSchoolLoading,
  selectSingleSchoolAdmin,
  setActivationSchoolFinished,
  updateActivationSchool,
} from "../../../app/schools/schoolsSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  innerContainer: {},
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
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  refuse: {
    backgroundColor: "#802232",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#702131",
    },
  },
  backLinkContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

interface Props {}

const AdminSingleSchool: React.FC<Props> = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  const singleSchool = useSelector(selectSingleSchoolAdmin);
  const activationSchoolLoading = useSelector(selectActivationSchoolLoading);
  const activationSchoolFinished = useSelector(selectActivationSchoolFinished);

  useEffect(() => {
    if (!singleSchool) {
      history.push("/admin/schools");
    }
  }, [singleSchool]);

  useEffect(() => {
    if (activationSchoolFinished) {
      dispatch(setSuccess("تم تحديث حالة المدرسة"));
      history.push("/admin/schools");
    }
  }, [activationSchoolFinished]);

  useEffect(() => {
    return () => {
      dispatch(setActivationSchoolFinished(false));
    };
  }, []);

  const handleAction = (value: SchoolStatus) => {
    dispatch(updateActivationSchool({ managerId: singleSchool?.manager_id || 0, status: value }));
  };

  return (
    <Container maxWidth="sm" className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" maxWidth="xs" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            معلومات المدرسة
          </Typography>
          <Avatar className={classes.avatar}>
            <img src={singleSchool?.manager.user.profile_img} alt={singleSchool?.manager.user.name} />
          </Avatar>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                اسم المدرسة
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleSchool?.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                موقع المدرسة
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleSchool?.address}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                اسم مدير المدرسة
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleSchool?.manager.user.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                اسم المستخدم للمدير
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleSchool?.manager.user.username}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                بريد المدير
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleSchool?.manager.user.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                رقم هاتف المدير
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleSchool?.manager.user.phone}
              </Typography>
            </Grid>

            {singleSchool?.status === "NONACTIVE" ? (
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={activationSchoolLoading}
                  onClick={() => handleAction("ACTIVE")}
                >
                  تنشيط
                </Button>
              </Grid>
            ) : (
              <>
                {singleSchool?.status === "ACTIVE" ? (
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={`${classes.submit} ${classes.refuse}`}
                      disabled={activationSchoolLoading}
                      onClick={() => handleAction("NONACTIVE")}
                    >
                      إلغاء تنشيط
                    </Button>
                  </Grid>
                ) : (
                  <></>
                )}
              </>
            )}
            <Grid item xs={12} className={classes.backLinkContainer}>
              <Link to="/admin/schools">العودة لقائمة المدارس</Link>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </Container>
  );
};

export default AdminSingleSchool;
