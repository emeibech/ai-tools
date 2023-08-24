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
      <div className={cn("flex flex-col gap-y-2 max-w-max", "mx-auto p-4")}>
        <h2 className="text-2xl sm:text-3xl font-medium mt-40">
          OwO, what's this?
        </h2>
        <p className="sm:text-xl text-card-foreground">
          Oopsie Woopsie!! Uwu we made a fucky wucky!
        </p>
        <strong className="text-4xl sm:text-7xl mt-4 sm:mt-8">
          {errorMessage(error)}
        </strong>
        <em className="text-lg first-letter:sm:text-xl text-card-foreground">
          This page does not exist or it has been removed.
        </em>
      </div>
    </App>
  );
}
