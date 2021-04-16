import { Avatar, Button, Card, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../../app/auth/authSlice";
import { setSuccess } from "../../../app/data-source/feedback/clientFeedbackSlice";
import { StudentStatus } from "../../../app/students/data-source/dtos";
import {
  getAllStudentsManager,
  selectSingleStudentManager,
  selectUpdatingStudentFinished,
  selectUpdatingStudentLoading,
  setUpdatingStudentFinished,
  updateStudentByManager,
} from "../../../app/students/studentsSlice";
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

const ManagerSingleStudent: React.FC<Props> = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const singleStudent = useSelector(selectSingleStudentManager);
  const updateByManagerLoading = useSelector(selectUpdatingStudentLoading);
  const updateByManagerFinished = useSelector(selectUpdatingStudentFinished);

  const [editRingOpen, setEditRingOpen] = useState(false);

  useEffect(() => {
    if (!singleStudent) {
      history.push("/manager/students");
    }
  }, [singleStudent]);

  useEffect(() => {
    if (updateByManagerFinished) {
      dispatch(setSuccess("تم تحديث حالة الطالب"));
      history.push("/manager/students");
    }
  }, [updateByManagerFinished]);

  useEffect(() => {
    return () => {
      dispatch(getAllStudentsManager({ schoolId: user.userable.school.id }));
      dispatch(setUpdatingStudentFinished(false));
    };
  }, []);

  const handleAction = (value: StudentStatus) => {
    dispatch(
      updateStudentByManager({
        studentId: singleStudent?.id || 0,
        status: value,
        ringId: singleStudent?.ring.id || 0,
      })
    );
  };

  const handleEditRingSave = (ringId: number) => {
    dispatch(updateStudentByManager({ studentId: singleStudent?.id || 0, status: singleStudent?.user.status, ringId }));
    setEditRingOpen(false);
  };

  return (
    <Container maxWidth="sm" className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" maxWidth="xs" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            معلومات الطالب
          </Typography>
          <Avatar
            className={classes.avatar}
            src={`${env.url}/images/profile_img/${singleStudent?.user.profile_img}`}
            alt={singleStudent?.user.name}
          />
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <Button startIcon={<MessageIcon />}>مراسلة</Button>
            </Grid> */}
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                اسم الطالب
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleStudent?.user.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                رقم الطالب
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleStudent?.user.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                بريد الطالب
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleStudent?.user.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                <Button startIcon={<EditIcon />} onClick={() => setEditRingOpen(true)}>
                  الحلقة
                </Button>
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleStudent?.ring.name}
              </Typography>
              <EditRingDialog
                open={editRingOpen}
                handleClose={() => setEditRingOpen(false)}
                handleSave={handleEditRingSave}
              />
            </Grid>

            {singleStudent?.user.status === "NONACTIVE" ? (
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
                {singleStudent?.user.status === "ACTIVE" ? (
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
              <Link to="/manager/students">العودة لقائمة الطلاب</Link>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </Container>
  );
};

export default ManagerSingleStudent;
