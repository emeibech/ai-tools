import { cn } from "@/common/lib/utils";
import SiteTitle from "./SiteTitle";
import NavigationSheet from "../navigation/NavigationSheet";
import { MoonIcon, SunIcon } from "@/common/components/ui/Icons";
import { Button } from "@/common/components/shadcn/button";
import { Separator } from "@/common/components/shadcn/separator";
import { useAppSelector } from "../../app/hooks";
import {
  darkModeStatus,
  turnOffDarkmode,
  turnOnDarkmode,
} from "../../features/darkmode/darkmodeSlice";
import { useDispatch } from "react-redux";

interface Props {
  className?: string;
}

export default function Header(props: Props) {
  const darkmode = useAppSelector(darkModeStatus);
  const dispatch = useDispatch();

  function handleClickDarkmode(mode: boolean) {
    if (mode) {
      dispatch(turnOffDarkmode());
    } else {
      dispatch(turnOnDarkmode());
    }
  }

  return (
    <header className={cn(props.className)}>
      <section className={cn("flex items-center gap-2", "lg:hidden")}>
        <NavigationSheet
          side="left"
          className={cn(
            darkmode ? "dark" : "",
            "w-[240px] min-[360px]:w-[280px]",
            "text-foreground bg-background",
          )}
          data-darkmode={false}
        />
        <SiteTitle />
      </section>
      <Button
        onClick={() => handleClickDarkmode(darkmode)}
        variant="ghost"
        type="button"
        className={cn("px-2 justify-self-end", "lg:fixed lg:mx-6 lg:mt-4")}
      >
        {darkmode ? <SunIcon height="24px" /> : <MoonIcon height="24px" />}
      </Button>

      <Separator className={cn("col-span-2", "lg:hidden")} />
    </header>
  );
}
