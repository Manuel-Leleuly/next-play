import { globalVar } from "@/constants/globalVar";

export class ImageLib {
  static getDefaultImageUrl = (
    width: number,
    height: number,
    text?: string
  ) => {
    return `https://placehold.co/${width}x${height}?text=${text ?? "%3C/%3E"}`;
  };

  static getImageUrl = (size: string, path: string) => {
    return globalVar.TMDB_IMAGE_URL + size + path;
  };
}
