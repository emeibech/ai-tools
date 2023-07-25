import { cn } from "@/lib/utils";
import SiteTitle from "./SiteTitle";
import NavigationSheet from "../Navigation/NavigationSheet";
import { SunIcon } from "@/components/custom/Icons";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className={cn("flex justify-between lg:justify-end")}>
      <section className="lg:hidden flex items-center gap-2 min-h-[40px]">
        <NavigationSheet side="left" />
        <SiteTitle />
      </section>
      <Button variant="ghost" type="button" className="px-2">
        <SunIcon height="24px" />
      </Button>
    </header>
  );
}
