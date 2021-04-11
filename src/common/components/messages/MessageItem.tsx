import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  message: {
    maxWidth: "300px",
    borderRadius: "25px",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  senderMessage: {
    borderTopLeftRadius: "5px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  receiverMessage: {
    borderTopRightRadius: "5px",
    marginLeft: "auto",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  time: {
    opacity: 0.6,
    display: "block",
  },
}));

interface Props {
  message: any;
}

const MessageItem: React.FC<Props> = ({ message }) => {
  const classes = useStyles();
  return (
    <Box
      className={`${classes.message} ${
        message.messageType === "sender" ? classes.senderMessage : classes.receiverMessage
      }`}
    >
      <Typography variant="body1"> {message.messageContent}</Typography>
      <Typography
        variant="caption"
        className={classes.time}
        align={message.messageType === "sender" ? "right" : "left"}
      >
        {message.messageType === "sender"
          ? dayjs(message.datetime).format("(DD-M-YYYY) HH:mm")
          : dayjs(message.datetime).format("HH:mm (DD-M-YYYY)")}
      </Typography>
    </Box>
  );
};

export default MessageItem;
