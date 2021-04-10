import Axios from "axios";
import env from "../../../env";

export const getApiCSFRToken = async () => {
  await Axios.get(`${env.url}/sanctum/csrf-cookie`, { withCredentials: true });
};
