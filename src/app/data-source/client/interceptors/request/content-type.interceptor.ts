import { AxiosRequestConfig } from "axios";

const contentTypeInterceptor = (config: AxiosRequestConfig) => {
  const contentType = config.headers["Content-Type"];
  if (!contentType) {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
    };
  }
  return config;
};

export default contentTypeInterceptor;
