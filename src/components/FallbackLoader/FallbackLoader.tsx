import { cn } from "@/lib/utils";
import { ClipLoader } from "react-spinners";

export const FallbackLoader = ({
  isFullScreen,
  className,
}: {
  isFullScreen?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative h-40",
        isFullScreen && "w-full min-h-screen",
        className
      )}
    >
      <ClipLoader className="absolute left-1/2 top-1/2 transform -translate-1/2" />
    </div>
  );
};
