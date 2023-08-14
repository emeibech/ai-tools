import { cn } from "@/common/lib/utils";
import { Link } from "react-router-dom";

export default function SiteTitle() {
  return (
    <Link to={"/"}>
      <h1
        data-name="site-name"
        className={cn(
          "text-xl text-left cursor-pointer font-bold rounded-md px-2",
          "lg:text-2xl lg:px-6 lg:py-1",
        )}
      >
        emeibech<span className={cn("ml-1")}>ai</span>
      </h1>
    </Link>
  );
}
