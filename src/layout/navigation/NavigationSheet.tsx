import HamburgerBtn from "../header/HamburgerBtn";
import SiteTitle from "../header/SiteTitle";
import Nav from "./Nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/common/components/shadcn/sheet";

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
