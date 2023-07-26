import "./App.css";
import Header from "./layout/Header/Header";
import Nav from "./layout/Navigation/Nav";
import SiteTitle from "./layout/Header/SiteTitle";
import { Separator } from "@/components/ui/separator";
import Main from "./layout/Main/Main";
import { cn } from "./lib/utils";

function App() {
  return (
    <>
      <div
        className={cn(
          "lg:grid lg:grid-cols-[280px_6fr_1fr]",
          "bg-background text-",
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
          <div className="flex-col flex-1">
            <SiteTitle />
            <Nav />
          </div>
          <Separator orientation="vertical" />
        </section>

        <Main className={cn("p-4 mt-12")} />
      </div>
    </>
  );
}

export default App;
