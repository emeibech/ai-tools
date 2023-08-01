import "./App.css";
import Header from "./layout/header/Header";
import Nav from "./layout/navigation/Nav";
import SiteTitle from "./layout/header/SiteTitle";
import Home from "./layout/main/home/Home";
import { cn } from "./lib/utils";

function App() {
  return (
    <>
      <div
        className={cn(
          "bg-background text-foreground",
          "lg:grid lg:grid-cols-[260px_1fr_80px]",
        )}
        data-darkmode="false"
      >
        <Header
          className={cn(
            "flex justify-between col-start-3 row-start-1",
            "fixed top-0 left-0 right-0 bg-muted",
            "lg:justify-end lg:static lg:bg-inherit",
          )}
        />

        <section
          className={cn(
            "justify-between hidden col-start-1 bg-muted relative",
            "lg:flex lg:pt-4",
          )}
        >
          <div className={cn("lg:fixed lg:min-w-[260px]")}>
            <SiteTitle />
            <Nav />
          </div>
        </section>

        <Home
          className={cn(
            "mt-12 px-4 flex flex-col items-center gap-20",
            "min-[320px]:p-4 lg:p-8",
            "2xl:p-12 2xl:gap-48",
          )}
        />
      </div>
    </>
  );
}

export default App;
