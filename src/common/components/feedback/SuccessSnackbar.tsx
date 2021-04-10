import { IconButton, makeStyles, Snackbar } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSuccess, selectFeedbackSuccess } from "../../../app/data-source/feedback/clientFeedbackSlice";

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

interface Props {}

const SuccessSnackbar: React.FC<Props> = () => {
  const classes = useStyles();
  const success = useSelector(selectFeedbackSuccess);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(removeSuccess());
  };

  return (
    <Snackbar
      open={success !== null}
      autoHideDuration={6000}
      onClose={handleClose}
      color="success"
      message={success ? success : "تمت العملية بنجاح"}
      ContentProps={{ className: classes.success }}
      action={
        <IconButton color="inherit" onClick={handleClose}>
          <CloseIcon color="inherit" />
        </IconButton>
      }
    />
  );
};

export default SuccessSnackbar;
