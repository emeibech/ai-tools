import "./App.css";
import Header from "./layout/header/Header";
import Nav from "./layout/navigation/Nav";
import SiteTitle from "./layout/header/SiteTitle";
import { Separator } from "@/components/ui/separator";
import Home from "./layout/main/home/Home";
import { cn } from "./lib/utils";

function App() {
  return (
    <>
      <div
        className={cn(
          "bg-background text-foreground",
          "lg:grid lg:grid-cols-[240px_6fr_1fr] 2xl:grid-cols-[280px_6fr_1fr]",
        )}
        data-darkmode="false"
      >
        <Header
          className={cn(
            "flex justify-between col-start-3 row-start-1 mt-4",
            "lg:justify-end lg:max-h-10",
          )}
        />

        <section className="lg:flex justify-between hidden col-start-1 mt-4">
          <div className={cn("flex-col flex-1")}>
            <SiteTitle />
            <Nav />
          </div>
          <Separator orientation="vertical" />
        </section>

        <Home className={cn("p-4 mt-12", "min-[320px]:p-2 lg:p-8 xl:p-12 ")} />
      </div>
    </>
  );
}

export default App;
