import "./App.css";
import Header from "../layout/header/Header";
import Nav from "../layout/navigation/Nav";
import SiteTitle from "../layout/header/SiteTitle";
import { cn } from "../common/lib/utils";
import { useAppSelector } from "../app/hooks";
import { darkModeStatus } from "../features/darkmode/darkmodeSlice";
import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Footer from "@/layout/footer/Footer";

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
            "col-start-3 row-start-1 row-span-3 bg-background",
            "fixed top-0 z-10 min-w-full",
            "grid grid-cols-2",
            "lg:justify-end lg:static",
          )}
        />

        <section
          className={cn(
            "hidden col-start-1 row-span-3 bg-muted min-h-screen",
            "lg:block",
          )}
        >
          <div
            className={cn(
              "lg:fixed lg:min-w-[260px] min-h-screen",
              "grid grid-flow-row grid-rows-[1fr_6fr_1fr] py-4",
            )}
          >
            <SiteTitle />
            <Nav />
            <Footer />
          </div>
        </section>

        <Outlet />
        {children}
      </div>
    </>
  );
}
