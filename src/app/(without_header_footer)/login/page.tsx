import { TmdbApi } from "@/api/tmdb/tmdb";
import { NetworkLib } from "@/lib/NetworkLib";
import { LeftSide } from "./_components/LeftSide";
import { RightSide } from "./_components/RightSide";

export default async function LoginPage() {
  const network = NetworkLib.withTMDBToken();
  const { request_token } = await TmdbApi.getRequestToken(network);

  return (
    <div className="min-h-screen bg-background flex">
      <LeftSide />
      <RightSide requestToken={request_token} />
    </div>
  );
}
