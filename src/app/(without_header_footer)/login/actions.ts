"use server";

import { TmdbApi } from "@/api/tmdb/tmdb";
import { LoginRequestBodyType } from "@/api/tmdb/tmdbModels";
import { NetworkLib } from "@/lib/NetworkLib";

export const submitLogin = async (reqBody: LoginRequestBodyType) => {
  const network = NetworkLib.withTMDBToken();
  const loginResult = await TmdbApi.login(network, reqBody);
  return await TmdbApi.getSessionId(network, {
    request_token: loginResult.request_token,
  });
};
