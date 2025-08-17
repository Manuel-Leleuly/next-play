import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export class FetchLib {
  static validateResponse = async <D>(
    networkCall: () => Promise<AxiosResponse<D>>,
    Codec: z.ZodType<D>
  ) => {
    try {
      const response = await networkCall();
      const { success, data, error } = Codec.safeParse(response.data);

      if (!success) throw error;

      return data;
    } catch (error) {
      throw new Error((error as AxiosError).message);
    }
  };
}
