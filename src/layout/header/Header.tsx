import { cn } from "@/lib/utils";
import SiteTitle from "./SiteTitle";
import NavigationSheet from "../navigation/NavigationSheet";
import { SunIcon } from "@/components/custom/Icons";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
}

export default function Header(props: Props) {
  return (
    <header className={cn(props.className)}>
      <section
        className={cn("flex items-center gap-2 min-h-[40px]", "lg:hidden")}
      >
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
      <Button
        variant="ghost"
        type="button"
        className={cn("px-2", "lg:fixed lg:mx-6 lg:mt-4")}
      >
        <SunIcon height="24px" />
      </Button>
    </header>
  );
}
