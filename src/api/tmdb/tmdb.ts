import { FetchLib } from "@/lib/fetchLib";
import { AxiosInstance } from "axios";
import { TmdbConfigSchema, TmdbConfigType } from "./tmdbModels";

export class TmdbApi {
  static getConfig = async (network: AxiosInstance) => {
    return await FetchLib.validateResponse<TmdbConfigType>(
      () => network.get("/configuration"),
      TmdbConfigSchema
    );
  };
}
