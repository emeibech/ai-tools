import "./App.css";
import Header from "../layout/header/Header";
import Nav from "../layout/navigation/Nav";
import SiteTitle from "../layout/header/SiteTitle";
import { cn } from "../common/lib/utils";
import { Separator } from "@/common/components/shadcn/separator";
import Footer from "../layout/footer/Footer";
import { useAppSelector } from "../app/hooks";
import { darkModeStatus } from "../features/darkmode/darkmodeSlice";
import { Outlet } from "react-router-dom";
import { ReactNode } from "react";

export default function App({ children }: { children?: ReactNode }) {
  const darkmode = useAppSelector(darkModeStatus);

  return (
    <>
      <div
        className={cn(
          darkmode ? "dark" : "",
          "bg-background text-foreground",
          "lg:grid lg:grid-cols-[260px_1fr_80px]",
        )}
        data-darkmode={darkmode}
      >
        <Header
          className={cn(
            "col-start-3 row-start-1 row-span-3",
            "fixed top-0 left-0 right-0 bg-background",
            "grid grid-cols-2 py-1",
            "lg:justify-end lg:static lg:bg-inherit",
          )}
        />

        <section
          className={cn(
            "hidden justify-between col-start-1 row-span-3",
            "bg-muted relative min-h-screen",
            "lg:flex lg:pt-4",
          )}
        >
          <div className={cn("lg:fixed lg:min-w-[260px]")}>
            <SiteTitle />
            <Nav />
          </div>
        </section>

        <Outlet />
        {children}

        <Separator
          className={cn("col-start-2 max-w-[920px]", "row-start-3 mx-auto")}
        />

        <Footer
          className={cn("col-start-2 max-w-[920px] p-2", "row-start-3 mx-auto")}
        />
      </div>
    </>
  );
}
