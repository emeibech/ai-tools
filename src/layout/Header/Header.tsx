import { cn } from "@/lib/utils";
import SiteTitle from "./SiteTitle";
import NavigationSheet from "../Navigation/NavigationSheet";
import { SunIcon } from "@/components/custom/Icons";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
}

export default function Header(props: Props) {
  return (
    <header className={props.className}>
      <section className="lg:hidden flex items-center gap-2 min-h-[40px]">
        <NavigationSheet
          side="left"
          className={cn(
            "w-[240px] min-[360px]:w-[280px]",
            "text-foreground bg-background",
          )}
          data-darkmode={false}
        />
        <SiteTitle />
      </section>
      <Button variant="ghost" type="button" className="px-2">
        <SunIcon height="24px" />
      </Button>
    </header>
  );
}
