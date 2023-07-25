import "./App.css";
import Header from "./layout/Header/Header";
import Nav from "./layout/Navigation/Nav";
import SiteTitle from "./layout/Header/SiteTitle";
import { Separator } from "@/components/ui/separator";

function App() {
  return (
    <>
      <section className="lg:grid lg:grid-cols-[240px_1fr]">
        <section className="lg:flex justify-between hidden">
          <div className="flex-col flex-1">
            <SiteTitle />
            <Nav />
          </div>
          <Separator orientation="vertical" />
        </section>
        <section className="flex flex-col">
          <Header />
          <Separator className="my-2" />
        </section>
      </section>
    </>
  );
}

export default App;
