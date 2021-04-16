import { Avatar, Button, Card, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../../app/auth/authSlice";
import { setSuccess } from "../../../app/data-source/feedback/clientFeedbackSlice";
import { TeacherStatus } from "../../../app/teachers/data-source/dtos";
import {
  getAllTeachersManager,
  selectSingleTeacherManager,
  selectUpdatingTeacherFinished,
  selectUpdatingTeacherLoading,
  setUpdatingTeacherFinished,
  updateTeacherByManager,
} from "../../../app/teachers/teachersSlice";
import EditRingDialog from "../../../common/components/common/EditRingDialog";
import env from "../../../env";

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

const ManagerSingleTeacher: React.FC<Props> = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const singleTeacher = useSelector(selectSingleTeacherManager);
  const updateByManagerLoading = useSelector(selectUpdatingTeacherLoading);
  const updateByManagerFinished = useSelector(selectUpdatingTeacherFinished);

  const [editRingOpen, setEditRingOpen] = useState(false);

  useEffect(() => {
    if (!singleTeacher) {
      history.push("/manager/teachers");
    }
  }, [singleTeacher]);

  useEffect(() => {
    if (updateByManagerFinished) {
      dispatch(setSuccess("تم تحديث حالة الأستاذ"));
      history.push("/manager/teachers");
    }
  }, [updateByManagerFinished]);

  useEffect(() => {
    return () => {
      dispatch(getAllTeachersManager({ schoolId: user.userable.school.id }));
      dispatch(setUpdatingTeacherFinished(false));
    };
  }, []);

  const handleAction = (value: TeacherStatus) => {
    dispatch(
      updateTeacherByManager({
        teacherId: singleTeacher?.id || 0,
        status: value,
        ringId: singleTeacher?.rings[singleTeacher?.rings.length - 1].id || 0,
      })
    );
  };

  const handleEditRingSave = (ringId: number) => {
    dispatch(updateTeacherByManager({ teacherId: singleTeacher?.id || 0, status: singleTeacher?.user.status, ringId }));
    setEditRingOpen(false);
  };

  return (
    <Container maxWidth="sm" className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" maxWidth="xs" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            معلومات الأستاذ
          </Typography>
          <Avatar
            className={classes.avatar}
            src={`${env.url}/images/profile_img/${singleTeacher?.user.profile_img}`}
            alt={singleTeacher?.user.name}
          />
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <Button startIcon={<MessageIcon />}>مراسلة</Button>
            </Grid> */}
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                اسم الأستاذ
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleTeacher?.user.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                رقم الأستاذ
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleTeacher?.user.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                بريد الأستاذ
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleTeacher?.user.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                <Button startIcon={<EditIcon />} onClick={() => setEditRingOpen(true)}>
                  الحلقة
                </Button>
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleTeacher?.rings[singleTeacher?.rings.length - 1].name}
              </Typography>
              <EditRingDialog
                open={editRingOpen}
                handleClose={() => setEditRingOpen(false)}
                handleSave={handleEditRingSave}
              />
            </Grid>

            {singleTeacher?.user.status === "NONACTIVE" ? (
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
                {singleTeacher?.user.status === "ACTIVE" ? (
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
              <Link to="/manager/teachers">العودة لقائمة الأساتذة</Link>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </Container>
  );
};

export default ManagerSingleTeacher;
