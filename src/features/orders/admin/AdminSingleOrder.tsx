import { Avatar, Button, Card, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { setSuccess } from "../../../app/data-source/feedback/clientFeedbackSlice";
import { OrderState } from "../../../app/orders/data-source/dtos";
import {
  approveSchool,
  selectApproveSchoolFinished,
  selectApproveSchoolLoading,
  selectSingleOrder,
  setApproveSchoolFinished,
} from "../../../app/orders/ordersSlice";

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

const AdminSingleOrder: React.FC<Props> = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  const singleOrder = useSelector(selectSingleOrder);
  const approveSchoolLoading = useSelector(selectApproveSchoolLoading);
  const approveSchoolFinished = useSelector(selectApproveSchoolFinished);

  useEffect(() => {
    if (!singleOrder) {
      history.push("/admin/orders");
    }
  }, [singleOrder]);

  useEffect(() => {
    if (approveSchoolFinished) {
      dispatch(setSuccess("تمت معالجة الطلب"));
      history.push("/admin/orders");
    }
  }, [approveSchoolFinished]);

  useEffect(() => {
    return () => {
      dispatch(setApproveSchoolFinished(false));
    };
  }, []);

  const handleAction = (value: OrderState) => {
    dispatch(approveSchool({ orderId: singleOrder?.id || 0, state: value }));
  };

  return (
    <Container maxWidth="sm" className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" maxWidth="xs" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            طلب تسجيل مدرسة
          </Typography>
          <Avatar className={classes.avatar}>
            <img src={singleOrder?.request_by_user.profile_img} alt={singleOrder?.request_by_user.name} />
          </Avatar>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                اسم المدرسة
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleOrder?.request_by_user.userable.school.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                موقع المدرسة
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleOrder?.request_by_user.userable.school.address}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                اسم مدير المدرسة
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleOrder?.request_by_user.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                بريد المدير
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleOrder?.request_by_user.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="caption" align="left">
                رقم هاتف المدير
              </Typography>
              <Typography component="p" variant="body1" align="left">
                {singleOrder?.request_by_user.phone}
              </Typography>
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
                    disabled={approveSchoolLoading}
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
                    disabled={approveSchoolLoading}
                    onClick={() => handleAction("REFUSED")}
                  >
                    رفض
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={`${classes.submit}`}
                    disabled={approveSchoolLoading}
                    onClick={() => handleAction("IN_PROGRESS")}
                  >
                    وضع تحت المراجعة
                  </Button>
                </Grid>
              </>
            ) : (
              <></>
            )}
            <Grid item xs={12} className={classes.backLinkContainer}>
              <Link to="/admin/orders">العودة لقائمة الطلبات</Link>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </Container>
  );
};

export default AdminSingleOrder;
