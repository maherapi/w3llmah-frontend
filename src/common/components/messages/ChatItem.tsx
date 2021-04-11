import {
  Avatar,
  Button,
  createStyles,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { IAllChatResponse } from "../../../app/messaging/data-source/http-actions";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getSingleChat } from "../../../app/messaging/messagingSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: "inline",
    },
    lastMessage: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    time: {
      justifySelf: "end",
    },
  })
);

const TIME_COLS = 1;
const BODY_COLS = 11;

interface Props {
  chat: IAllChatResponse;
}

const ChatItem: React.FC<Props> = ({ chat }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleChatClick = () => {
    dispatch(getSingleChat(chat.id))
  }
  
  return (
    <>
      <Button style={{display: "block", width: "100%", textTransform: "unset"}} onClick={handleChatClick}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={chat.name} src={chat.profile_img} />
          </ListItemAvatar>
          <Grid container>
            <Grid item xs={BODY_COLS} sm={BODY_COLS} md={BODY_COLS} lg={BODY_COLS} xl={BODY_COLS}>
              <ListItemText
                primary={chat.name}
                secondary={chat.lastMessage}
                secondaryTypographyProps={{ className: classes.lastMessage }}
              />
            </Grid>
            <Grid item xs={TIME_COLS} sm={TIME_COLS} md={TIME_COLS} lg={TIME_COLS} xl={TIME_COLS}>
              <ListItemText className={classes.time} secondary={dayjs(chat.datetime).format("HH:mm")} />
            </Grid>
          </Grid>
        </ListItem>
        <Divider variant="inset" component="li" />
      </Button>
    </>
  );
};

export default ChatItem;
