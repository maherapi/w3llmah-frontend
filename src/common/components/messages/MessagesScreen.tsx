import { List } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChats, selectAllChats } from "../../../app/messaging/messagingSlice";
import { selectLoggedInUser } from "../../../app/auth/authSlice";
import EmptyBox from "../common/EmptyBox";
import FullScreenDialog from "../common/FullScreenDialog";
import ChatItem from "./ChatItem";

interface Props {
  open: boolean;
  onClose: () => void;
}

const MessagesScreen: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const chats = useSelector(selectAllChats);
  const userId = useSelector(selectLoggedInUser).id;

  // get all chats
  useEffect(() => {
    if (userId && open) {
      dispatch(getAllChats(userId));
    }
  }, [userId, open]);

  return (
    <FullScreenDialog title="المحادثات" open={open} onClose={onClose}>
      <List>{!chats.length ? <EmptyBox /> : chats.map((chat) => <ChatItem chat={chat} key={chat.id} />)}</List>
    </FullScreenDialog>
  );
};

export default MessagesScreen;
