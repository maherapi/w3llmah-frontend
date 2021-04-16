import { Avatar, Button, Card, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import EyeIcon from "@material-ui/icons/Visibility";
import { selectLoggedInUser, selectUserRole } from "../../../app/auth/authSlice";
import { setSuccess } from "../../../app/data-source/feedback/clientFeedbackSlice";
import { OrderState } from "../../../app/orders/data-source/dtos";
import {
  approveStudent,
  selectApproveStudentFinished,
  selectApproveStudentLoading,
  selectSingleOrder,
  setApproveStudentFinished,
} from "../../../app/orders/ordersSlice";
import { getAllRings, selectAllRings } from "../../../app/rings/ringsSlice";
import CustomSelectWithoutForm from "../../../common/components/common/CustomSelectWithouForm";
import ImageDialog from "../../../common/components/common/ImageDialog";
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

const ManagerSingleOrderStudent: React.FC<Props> = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  const loggedInUserRole = useSelector(selectUserRole);
  const loggedInUser = useSelector(selectLoggedInUser);
  const singleOrder = useSelector(selectSingleOrder);
  const approveStudentLoading = useSelector(selectApproveStudentLoading);
  const approveStudentFinished = useSelector(selectApproveStudentFinished);
  const rings = useSelector(selectAllRings);

  const [selectedRing, setSelectedRing] = useState("");
  const [certificationDialogOpen, setCertificationDialogOpen] = useState(false);

  useEffect(() => {
    if (!singleOrder) {
      history.push(`/${(loggedInUserRole + "").toLowerCase()}/orders`);
    }
  }, [singleOrder]);

  useEffect(() => {
    if (approveStudentFinished) {
      dispatch(setSuccess("تمت معالجة الطلب"));
      history.push(`/${(loggedInUserRole + "").toLowerCase()}/orders`);
    }
  }, [approveStudentFinished]);

  useEffect(() => {
    dispatch(getAllRings(loggedInUser.id));
    return () => {
      dispatch(setApproveStudentFinished(false));
    };
  }, []);

  const handleAction = (value: OrderState) => {
    dispatch(
      approveStudent({ ringId: +selectedRing, studentId: singleOrder?.request_by_user.userable.id, state: value })
    );
  };

  return (
    <Container maxWidth="sm" className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" maxWidth="xs" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            طلب تسجيل طالب
          </Typography>
          <Avatar
            className={classes.avatar}
            src={`${env.url}/images/profile_img/${singleOrder?.request_by_user.profile_img}`}
            alt={singleOrder?.request_by_user.name}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                اسم الطالب
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleOrder?.request_by_user.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                بريد الطالب
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleOrder?.request_by_user.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                رقم هاتف الطالب
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleOrder?.request_by_user.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => setCertificationDialogOpen(true)} startIcon={<EyeIcon />}>
                الشهادة
              </Button>
              <ImageDialog
                open={certificationDialogOpen}
                handleClose={() => setCertificationDialogOpen(false)}
                title={`شهادة الطالب ${singleOrder?.request_by_user.name}`}
                imgSrc={`${env.url}/images/certification/${singleOrder?.request_by_user.userable.certification}`}
              />
            </Grid>
            <Grid item xs={12}>
              {rings && (singleOrder?.state === "NEW" || singleOrder?.state === "IN_PROGRESS") && (
                <CustomSelectWithoutForm
                  label="اختر حلقة"
                  options={rings.map((ring) => ({ text: ring.name, value: `${ring.id}` }))}
                  onChange={(v) => setSelectedRing(v.target.value + "")}
                />
              )}
            </Grid>

            {singleOrder?.state === "NEW" || singleOrder?.state === "IN_PROGRESS" ? (
              <>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={approveStudentLoading || !selectedRing}
                    onClick={() => handleAction("ACCEPTED")}
                  >
                    قبول
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={`${classes.submit} ${classes.refuse}`}
                    disabled={approveStudentLoading}
                    onClick={() => handleAction("REFUSED")}
                  >
                    رفض
                  </Button>
                </Grid>
                {singleOrder?.state !== "IN_PROGRESS" && (
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={`${classes.submit}`}
                      disabled={approveStudentLoading}
                      onClick={() => handleAction("IN_PROGRESS")}
                    >
                      وضع تحت المراجعة
                    </Button>
                  </Grid>
                )}
              </>
            ) : (
              <></>
            )}
            <Grid item xs={12} className={classes.backLinkContainer}>
              <Link to="/manager/orders">العودة لقائمة الطلبات</Link>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </Container>
  );
};

export default ManagerSingleOrderStudent;
