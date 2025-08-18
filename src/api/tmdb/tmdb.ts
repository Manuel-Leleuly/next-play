import { FetchLib } from "@/lib/fetchLib";
import { AxiosInstance } from "axios";
import {
  CreateSessionReqBodySchema,
  CreateSessionReqBodyType,
  CreateSessionResponseSchema,
  CreateSessionResponseType,
  LoginRequestBodySchema,
  LoginRequestBodyType,
  RequestTokenSchema,
  RequestTokenType,
  TmdbConfigSchema,
  TmdbConfigType,
  UserDetailSchema,
  UserDetailType,
} from "./tmdbModels";

export class TmdbApi {
  static getConfig = async (network: AxiosInstance) => {
    return await FetchLib.validateResponse<TmdbConfigType>(
      () => network.get("/configuration"),
      TmdbConfigSchema
    );
  };

  static getRequestToken = async (network: AxiosInstance) => {
    return await FetchLib.validateResponse<RequestTokenType>(
      () => network.get("/authentication/token/new"),
      RequestTokenSchema
    );
  };

  static login = async (
    network: AxiosInstance,
    reqBody: LoginRequestBodyType
  ) => {
    const {
      success,
      data: loginReqBody,
      error,
    } = LoginRequestBodySchema.safeParse(reqBody);
    if (!success) throw error;

    return await FetchLib.validateResponse<RequestTokenType>(
      () =>
        network.post("/authentication/token/validate_with_login", loginReqBody),
      RequestTokenSchema
    );
  };

  static getSessionId = async (
    network: AxiosInstance,
    reqBody: CreateSessionReqBodyType
  ) => {
    const {
      success,
      data: createSessionReqBody,
      error,
    } = CreateSessionReqBodySchema.safeParse(reqBody);
    if (!success) throw error;

    return await FetchLib.validateResponse<CreateSessionResponseType>(
      () => network.post("/authentication/session/new", createSessionReqBody),
      CreateSessionResponseSchema
    );
  };

  static getUserDetail = async (network: AxiosInstance, sessionId: string) => {
    return await FetchLib.validateResponse<UserDetailType>(
      () => network.get("/account", { params: { sessionId } }),
      UserDetailSchema
    );
  };
}
