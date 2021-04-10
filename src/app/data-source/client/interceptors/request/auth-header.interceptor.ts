import { AxiosRequestConfig } from "axios";

const tokenTemplate = (token: string) => `Bearer ${token}`;

const authInterceptor = (config: AxiosRequestConfig) => { 
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: tokenTemplate(token),
    };
  }
  return config;
};

export default authInterceptor;
