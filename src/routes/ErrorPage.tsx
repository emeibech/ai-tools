import App from "@/app/App";
import { cn } from "@/common/lib/utils";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  function errorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else {
      console.error(error);
      return "Unknown error";
    }
  }

  return (
    <App>
      <div
        className={cn(
          "mt-40 flex flex-col gap-y-2 max-w-max mx-auto p-4 min-h-screen",
        )}
      >
        <h1 className="text-3xl">OwO, what's this?</h1>
        <p className="text-xl text-card-foreground">
          Oopsie Woopsie!! Uwu we made a fucky wucky!
        </p>
        <p className="text-7xl mt-8">{errorMessage(error)}</p>
        <p className="text-xl text-card-foreground">
          This page does not exist or it has been removed.
        </p>
      </div>
    </App>
  );
}
