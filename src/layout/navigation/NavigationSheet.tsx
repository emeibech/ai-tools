import { cn } from "@/common/lib/utils";
import Footer from "../footer/Footer";
import HamburgerBtn from "../header/HamburgerBtn";
import SiteTitle from "../header/SiteTitle";
import Nav from "./Nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/common/components/ui/sheet";

export default function NavigationSheet(props: {
  side?: "top" | "bottom" | "left" | "right" | null | undefined;
  className?: string;
  "data-darkmode": boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerBtn />
      </SheetTrigger>
      <SheetContent
        side={props.side}
        className={cn(
          props.className,
          "grid grid-flow-row grid-rows-[1fr_6fr_1fr] py-4",
        )}
        data-darkmode={props["data-darkmode"]}
      >
        <SheetHeader>
          <SiteTitle />
        </SheetHeader>
        <Nav />
        <Footer />
      </SheetContent>
    </Sheet>
  );
}
