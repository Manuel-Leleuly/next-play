import { globalVar } from "@/constants/globalVar";
import axios, { AxiosRequestConfig } from "axios";

export class NetworkLib {
  static withTMDBToken = (config?: AxiosRequestConfig) => {
    return axios.create({
      ...config,
      baseURL: globalVar.TMDB_BASE_URL,
      headers: {
        Authorization: `Bearer ${globalVar.TMDB_TOKEN}`,
      },
    });
  };
}
