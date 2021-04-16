import { Avatar, Button, Card, Container, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { setSuccess } from "../../../app/data-source/feedback/clientFeedbackSlice";
import { selectSingleRing, selectUpdateByManagerFinished, selectUpdateByManagerLoading, setUpdateByManagerFinished, updateRingByManager } from "../../../app/rings/ringsSlice";
import EyeIcon from "@material-ui/icons/Visibility";
import { SchoolStatus } from "../../../app/schools/data-source/dtos";
import {
  selectActivationSchoolFinished,
  selectActivationSchoolLoading,
  selectSingleSchoolAdmin,
  setActivationSchoolFinished,
  updateActivationSchool,
} from "../../../app/schools/schoolsSlice";
import env from "../../../env";
import { RingStatus } from "../../../app/rings/data-source/dtos";

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

const ManagerSingleRing: React.FC<Props> = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  const singleRing = useSelector(selectSingleRing);
  const updateByManagerLoading = useSelector(selectUpdateByManagerLoading);
  const updateByManagerFinished = useSelector(selectUpdateByManagerFinished);

  useEffect(() => {
    if (!singleRing) {
      history.push("/manager/rings");
    }
  }, [singleRing]);

  useEffect(() => {
    if (updateByManagerFinished) {
      dispatch(setSuccess("تم تحديث حالة الحلقة"));
      history.push("/manager/rings");
    }
  }, [updateByManagerFinished]);

  useEffect(() => {
    return () => {
      dispatch(setUpdateByManagerFinished(false));
    };
  }, []);

  const handleAction = (value: RingStatus) => {
    dispatch(updateRingByManager({ ringId: singleRing?.id || 0, status: value }));
  };

  const handleTeacherDetailsClick = (teacher: any) => {};

  return (
    <Container maxWidth="sm" className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" maxWidth="xs" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            معلومات الحلقة
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                اسم الحلقة
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleRing?.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                اسم الأستاذ
              </Typography>
              <Typography component="p" variant="body1" align="left">
                <Button onClick={handleTeacherDetailsClick} startIcon={<EyeIcon />}>
                  {singleRing?.teacherName}
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                فترة الحلقة
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleRing?.period === "MORNING" ? "صباحية" : "مسائية"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                عدد الطلاب الأقصى
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleRing?.max_student}
              </Typography>
            </Grid>
            {singleRing?.status === "NONACTIVE" ? (
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={updateByManagerLoading}
                  onClick={() => handleAction("ACTIVE")}
                >
                  تنشيط
                </Button>
              </Grid>
            ) : (
              <>
                {singleRing?.status === "ACTIVE" ? (
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={`${classes.submit} ${classes.refuse}`}
                      disabled={updateByManagerLoading}
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
              <Link to="/manager/rings">العودة لقائمة الحلقات</Link>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </Container>
  );
};

export default ManagerSingleRing;
