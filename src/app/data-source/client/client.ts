import Axios, { AxiosResponse } from "axios";
import env from "../../../env";
import { authInterceptor, contentTypeInterceptor } from "./interceptors/request";
import { getApiCSFRToken } from "./init-with-api";

const axios = Axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

// Requests interceptors
axios.interceptors.request.use(authInterceptor);
axios.interceptors.request.use(contentTypeInterceptor);

// Responses interceptors


export default axios;

export { getApiCSFRToken };
