import HamburgerBtn from "../Header/HamburgerBtn";
import SiteTitle from "../Header/SiteTitle";
import Nav from "./Nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        className={props.className}
        data-darkmode={props["data-darkmode"]}
      >
        <SheetHeader>
          <SiteTitle />
        </SheetHeader>
        <Nav />
      </SheetContent>
    </Sheet>
  );
}
