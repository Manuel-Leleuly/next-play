import { TmdbApi } from "@/api/tmdb/tmdb";
import { NetworkLib } from "@/lib/NetworkLib";
import { DynamicMetadataFunction } from "@/models/models";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LeftSide } from "./_components/LeftSide";
import { RightSide } from "./_components/RightSide";

export const generateMetadata: DynamicMetadataFunction = async () => {
  return {
    title: "MovieApp | Login",
  };
};

export default async function LoginPage() {
  const network = NetworkLib.withTMDBToken();
  const { request_token } = await TmdbApi.getRequestToken(network);

  const serverCookies = await cookies();
  const userCookiesStr = serverCookies.get("user");
  if (!!userCookiesStr && userCookiesStr.value !== "") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background flex">
      <LeftSide />
      <RightSide requestToken={request_token} />
    </div>
  );
}
