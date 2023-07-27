import { cn } from "@/lib/utils";
import botImg from "./imgs/bot.png";

interface Props {
  className?: string;
}

export default function Home(props: Props) {
  return (
    <main className={props.className}>
      <section
        className={cn(
          "flex flex-col items-center justify-center max-w-[1280px] m-auto",
          "xl:flex-row gap-10",
        )}
      >
        <section className="flex flex-col gap-8 max-w-[768px]">
          <h2
            className={cn(
              "text-4xl font-semibold max-w-[640px]",
              "sm:text-5xl",
            )}
          >
            Make Your Life Easier with emeibech AI.
          </h2>
          <h3 className="max-w-[640px]">
            A collection of AI-powered tools that help you finish tasks faster
            than a cocaine-addled Flash so you can get back to doing things that
            really matter, like scrolling mindlessly on your phone. Offload most
            of the thinking to AI and go get yourself more of that sweet, sweet
            dopamine now.
          </h3>
        </section>
        <img
          height={"240px"}
          width={"240px"}
          src={botImg}
          className={cn("max-w-[240px] max-h-[240px] mt-4", "lg:mt-0")}
        />
      </section>
    </main>
  );
}
