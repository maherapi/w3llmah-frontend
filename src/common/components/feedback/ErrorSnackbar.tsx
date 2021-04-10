import { IconButton, makeStyles, Snackbar } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeError, selectFeedbackError } from "../../../app/data-source/feedback/clientFeedbackSlice";

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.main,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

interface Props {}

const ErrorSnackbar: React.FC<Props> = () => {
  const classes = useStyles();
  const error = useSelector(selectFeedbackError);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(removeError());
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
      color="error"
      message={error ? error : "خطأ"}
      ContentProps={{ className: classes.error }}
      action={
        <IconButton color="inherit" onClick={handleClose}>
          <CloseIcon color="inherit" />
        </IconButton>
      }
    />
  );
};

export default ErrorSnackbar;
