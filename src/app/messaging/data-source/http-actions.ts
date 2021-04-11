import { UserRole } from "../../auth/user.interface";
import { client } from "../../data-source/client";
import { MessageDto } from "./dtos";

export interface IAllChatResponse {
  id: number;
  name: string;
  profile_img: string;
  message_id: number;
  lastMessage: string;
  datetime: string;
}

export interface IChatReseiverResponse {
  id: number;
  name: string;
  phone: string;
  profile_img: string;
  userable_type: UserRole;
}

export interface IChatMessageResponse {
  messageContent: string;
  messageType: "receiver" | "sender";
  datetime: string;
}

export interface ISingleChatResponse {
  receiver: IChatReseiverResponse;
  messages: IChatMessageResponse[];
}

export interface ISendMessageResponse {
  content: string;
  receiver_id: number;
  sender_id: number;
  updated_at: string;
  created_at: string;
  id: number;
}

export const getAllChats = async (userId: number) => {
  const response = await client.get<{ chats: IAllChatResponse[] }>(`/messages/${userId}/chats`);
  return response.data.chats;
};

export const getChat = async (receiverId: number) => {
  const response = await client.get<ISingleChatResponse>(`/messages/${receiverId}`);
  return response.data;
};

export const sendMessage = async (messageDto: MessageDto) => {
  const response = await client.post<{message: ISendMessageResponse}>(`/messages`, messageDto);
  return {
    messageContent: response.data.message.content,
    datetime: response.data.message.created_at,
    messageType: "sender",
  } as IChatMessageResponse;
};
