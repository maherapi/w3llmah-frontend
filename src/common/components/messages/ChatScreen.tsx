import React, { useEffect, useRef, useState } from "react";
import FullScreenDialog from "../common/FullScreenDialog";
import { Box, Grid, IconButton, makeStyles, TextField } from "@material-ui/core";
import { Send as SendIcon } from "@material-ui/icons";
import MessageItem from "./MessageItem";
import {
  clearSingleChat,
  selectSingleChat,
  selectSingleChatLoading,
  selectSingleChatUpdating,
  sendMessage,
  setUpdatingSingleChat,
} from "../../../app/messaging/messagingSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../app/auth/authSlice";
import { getSingleChat } from "../../../app/messaging/messagingSlice";
import env from "../../../env";

const UPDATE_FREQ = 30;

const useStyles = makeStyles((theme) => ({
  messagesBody: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  messagesContainer: {
    height: "83vh",
    [theme.breakpoints.up("md")]: {
      height: "86vh",
    },

    overflow: "auto",
    position: "relative",
    bottom: 0,
  },
  messagesScroll: {
    height: "100%",
    overflow: "auto",
    position: "relative",
    bottom: 0,
  },
  messageInput: {
    display: "flex",
    padding: "5px",
  },
}));

interface Props {}

const ChatScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const singleChat = useSelector(selectSingleChat);
  const singleChatLoading = useSelector(selectSingleChatLoading);
  const singleChatUpdating = useSelector(selectSingleChatUpdating);
  const senderId = useSelector(selectLoggedInUser).id;

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [inputMessage, setInputMessage] = useState("");

  const [secondsForUpdate, setSecondsForUpdate] = useState(UPDATE_FREQ);

  // update messages every UPDATE_FREQ seconds
  useEffect(() => {
    if (singleChat !== null && secondsForUpdate === 0) {
      dispatch(getSingleChat(singleChat?.receiver.id || 0));
      dispatch(setUpdatingSingleChat());
      setSecondsForUpdate(UPDATE_FREQ);
    } else if (singleChat !== null) {
      setTimeout(() => setSecondsForUpdate(secondsForUpdate - 1), 1000);
    } else {
      setTimeout(() => setSecondsForUpdate(secondsForUpdate + (secondsForUpdate > UPDATE_FREQ ? -1 : 1)), 1000);
    }
  }, [secondsForUpdate]);

  // scroll to bottom when messages updated
  useEffect(() => {
    setTimeout(() => scrollToBottom(), 100);
  }, [singleChat?.messages]);

  const handleSendMessage = () => {
    dispatch(sendMessage({ content: inputMessage, receiver_id: singleChat?.receiver.id || 0, sender_id: senderId }));
    setInputMessage("");
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <FullScreenDialog
      open={(singleChat !== null && !singleChatLoading) || singleChatUpdating}
      onClose={() => dispatch(clearSingleChat())}
      title={`${singleChat?.receiver.name}`}
      avatar={{
        src: `${env.url}/images/profile_img/${singleChat?.receiver.profile_img}`,
        alt: singleChat?.receiver.name,
      }}
    >
      <Box className={classes.messagesBody}>
        <Box className={classes.messagesContainer}>
          <Box className={classes.messagesScroll}>
            {!singleChat?.messages.length ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                لا توجد رسائل
              </Box>
            ) : (
              singleChat?.messages.map((m) => <MessageItem message={m} key={m.datetime} />)
            )}
            <div ref={messagesEndRef}></div>
          </Box>
        </Box>
        <Box className={classes.messageInput}>
          <IconButton color="primary" aria-label="أرسل الرسالة" component="span" onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
          <TextField
            fullWidth
            id="outlined-helperText"
            variant="outlined"
            placeholder="أكتب رسالة..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
        </Box>
      </Box>
    </FullScreenDialog>
  );
};

export default ChatScreen;
