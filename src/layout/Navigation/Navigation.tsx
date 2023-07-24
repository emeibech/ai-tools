import HamburgerBtn from "../Header/HamburgerBtn";
import SiteTitle from "../Header/SiteTitle";
import Nav from "./Nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navigation(props: {
  side?: "top" | "bottom" | "left" | "right" | null | undefined;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerBtn />
      </SheetTrigger>
      <SheetContent side={props.side} className="w-[240px]">
        <SheetHeader>
          <SiteTitle />
        </SheetHeader>
        <Nav />
      </SheetContent>
    </Sheet>
  );
}
