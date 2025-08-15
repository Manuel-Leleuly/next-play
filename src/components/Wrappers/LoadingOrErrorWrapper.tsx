import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";

export const LoadingOrErrorWrapper = ({
  children,
  isLoading,
  error,
}: {
  children: ReactNode;
  isLoading: boolean;
  error?: Error | null;
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    return <div className="w-full text-center">{error.message}</div>;
  }

  return children;
};
