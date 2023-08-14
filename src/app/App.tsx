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

function App() {
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
            "justify-between hidden col-start-1 bg-muted relative row-span-3",
            "lg:flex lg:pt-4",
          )}
        >
          <div className={cn("lg:fixed lg:min-w-[260px]")}>
            <SiteTitle />
            <Nav />
          </div>
        </section>

        <Outlet />

        <Separator className="col-start-2 max-w-[920px] mx-auto mt-4" />

        <Footer className="col-start-2 max-w-[920px] mx-auto p-2" />
      </div>
    </>
  );
}

export default App;
