"use server";

import { TmdbApi } from "@/api/tmdb/tmdb";
import { LoginRequestBodyType } from "@/api/tmdb/tmdbModels";
import { NetworkLib } from "@/lib/NetworkLib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const submitLogin = async (reqBody: LoginRequestBodyType) => {
  const network = NetworkLib.withTMDBToken();
  const loginResult = await TmdbApi.login(network, reqBody);
  const result = await TmdbApi.getSessionId(network, {
    request_token: loginResult.request_token,
  });
  if (result.success) {
    const serverCookies = await cookies();
    serverCookies.set(
      "user",
      JSON.stringify({
        username: reqBody.username,
        session_id: result.session_id,
      }),
      { httpOnly: true }
    );
    redirect("/");
  }
};
