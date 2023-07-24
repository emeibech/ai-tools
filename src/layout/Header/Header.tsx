import { cn } from "@/lib/utils";
import SiteTitle from "./SiteTitle";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <header className={cn("flex items-center gap-2 lg:hidden")}>
      <Navigation side="left" />
      <SiteTitle />
    </header>
  );
}
