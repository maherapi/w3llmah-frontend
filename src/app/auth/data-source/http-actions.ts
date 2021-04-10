import { client } from "../../data-source/client";
import { LoginDto } from "./dtos";

export interface ILoginResponseData {
  user: {
    name: string;
    date_of_birth: string;
    email: string;
    phone: string;
    username: string;
    profile_img: string;
    userable_id: number;
    userable_type: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
  token: string;
}

export const sendOTP = async ({ username }: { username: string }) => {
  const response = await client.post<any>(`/otp`, { username });
  return response.data;
};

export const login = async (loginDto: LoginDto) => {
  const response = await client.post<ILoginResponseData>(`/users/login`, loginDto);
  return response.data;
};

export const logout = async () => {
  const response = await client.post<any>(`/users/logout`);
  return response.data;
};
