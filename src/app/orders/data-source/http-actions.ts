import { UserRole } from "../../auth/user.interface";
import { client } from "../../data-source/client";
import { OrderState, OrderStatus, OrderType } from "./dtos";

export interface IManagerOrdersResponse {
  id: number;
  created_at: string;
  updated_at: string;
  school: {
    id: number;
    name: string;
    manager_id: number;
    address: string;
    latitude: number;
    longitude: number;
    gender: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

export interface IUserOrdersResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  date_of_birth: string;
  profile_img: string;
  verified_at: string;
  userable_id: 2;
  userable_type: UserRole;
  status: string;
  created_at: string;
  updated_at: string;
  userable: IManagerOrdersResponse;
}

export interface IOrdersItemResponse {
  id: number;
  request_by: number;
  response_by: null;
  response: null;
  order_type: OrderType;
  state: OrderState;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  request_by_user: IUserOrdersResponse;
}

export const getAllOrders = async (userId: number) => {
  const response = await client.get<{ orders: IOrdersItemResponse[] }>(`/orders/${userId}`);
  return response.data.orders;
};
