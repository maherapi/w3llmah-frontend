// rename env-example.json to env.json
// and add your environment

import env from "./env.json";

export interface IEnv {
  apiUrl: string;
  url: string;
  androidAppLink: string;
  iOSAppLink: string;
}

export default env as IEnv;
