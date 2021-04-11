import { Backdrop, CircularProgress, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectFeedbackLoading } from "../../../app/data-source/feedback/clientFeedbackSlice";
import { selectSingleChatUpdating } from "../../../app/messaging/messagingSlice";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    color: "#fff",
  },
  close: {
    position: "absolute",
    top: "10px",
    left: "10px",
  },
}));

const DEFAULT_MSG = "من فضلك انتظر قليلًا ...";

interface Props {
  text?: string;
}

const GlobalLoading: React.FC<Props> = ({ text = DEFAULT_MSG }) => {
  const classes = useStyles();

  const loading = useSelector(selectFeedbackLoading);

  // to remove backdrop when a chat is open
  const singleChatUpdating = useSelector(selectSingleChatUpdating);

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Backdrop className={classes.backdrop} open={open && loading && !singleChatUpdating}>
      <IconButton color="inherit" className={classes.close} onClick={handleClose}>
        <CloseIcon color="inherit" />
      </IconButton>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <CircularProgress color="inherit" />
        </Grid>
        <Grid item>
          <Typography>{text}</Typography>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default GlobalLoading;
