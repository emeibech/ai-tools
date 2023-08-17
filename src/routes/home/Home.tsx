import { cn } from "@/common/lib/utils";
import botImg from "./imgs/bot.png";
import llm from "./imgs/llm.jpg";
import InfoCluster from "./components/InfoCluster";
import FAQs from "./components/FAQs";

export default function Home() {
  return (
    <main
      className={cn(
        "mt-12 px-4 flex flex-col items-center gap-20",
        "min-[320px]:p-4 lg:p-8",
        "2xl:p-12 2xl:gap-48",
      )}
    >
      <section
        className={cn(
          "flex flex-col items-center max-w-[920px]",
          "leading-relaxed gap-10",
          "2xl:flex-row",
        )}
      >
        <section className="flex flex-col gap-4 max-w-[768px]">
          <h2
            className={cn(
              "text-4xl font-semibold max-w-[640px]",
              "sm:text-5xl",
            )}
          >
            Make Your Life Easier with emeibech AI.
          </h2>
          <h3 className="max-w-[640px] text-lg">
            A collection of AI-powered tools that help you finish tasks faster
            the Flash on cocaine so you can get back to doing things that really
            matter, like scrolling mindlessly on your phone. Offload most of the
            thinking to AI and go get yourself more of that sweet, sweet
            dopamine now.
          </h3>
        </section>
        <img
          height={"240px"}
          width={"240px"}
          src={botImg}
          alt="AI Chatbot"
          className={cn(
            "max-w-[240px] max-h-[240px] mt-4 leading-loose",
            "lg:mt-0",
          )}
        />
      </section>

      <section
        className={cn(
          " flex flex-col gap-y-8 max-w-[920px]",
          "2xl:grid 2xl:grid-cols-2  2xl:gap-x-8",
        )}
      >
        <InfoCluster className="place-self-end">
          <h2 className={cn("font-medium")}>It's Free</h2>
          <p className={cn("text-card-foreground")}>
            The best feature of this app is that it's free. That is right. Free.
            But you can only use it like once a day maybe. I haven't decided
            yet. So, yeah, limitations will apply, and if you don't like it then
            gtfo.
          </p>
          <a
            href={"#"}
            target="_blank"
            className={cn("text-accent underline max-w-fit py-1")}
          >
            See Limitations
          </a>
        </InfoCluster>

        <InfoCluster>
          <h2 className={cn("font-medium")}>User-friendly</h2>
          <p className={cn("text-card-foreground")}>
            I strive to make this app as user-friendly as I can. Nevertheless,
            if you find yourself having trouble or getting stuck or whatever,
            I've laid out some tutorials to help you get the result you want.
          </p>
          <a
            href={"#"}
            target="_blank"
            className={cn("text-accent underline max-w-fit py-1")}
          >
            Tutorial
          </a>
        </InfoCluster>

        <InfoCluster className="place-self-end">
          <h2 className={cn("font-medium")}>Powered by OpenAI</h2>
          <p className="text-card-foreground">
            The tools provided are powered by OpenAI API. In case you live under
            a rock, OpenAI is the company that developed ChatGPT, that language
            model AI that everybody in tech and their mother is talking about.
          </p>
          <a
            href={"#"}
            target="_blank"
            className={cn("text-accent underline max-w-fit py-1")}
          >
            Learn more
          </a>
        </InfoCluster>

        <InfoCluster>
          <h2 className={cn("font-medium")}>Open Source</h2>
          <p className="text-card-foreground">
            If you think this app looks like shit and feels like shit that's
            because it is. On the off chance that you happen to like it and
            would like to create something similar to it, you can clone the repo
            or fork it or whatever.
          </p>
          <a
            href={"#"}
            target="_blank"
            className={cn("text-accent underline max-w-fit py-1")}
          >
            GitHub
          </a>
        </InfoCluster>
      </section>

      <section className={cn("min-w-full flex flex-col items-center")}>
        <div
          className={cn(
            "min-w-full",
            "2xl:min-w-[920px]",
            "min-[678px]:min-w-[640px]",
          )}
        >
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          <FAQs
            className={cn(
              "mt-8",
              "2xl:min-w-[920px]",
              "min-[678px]:max-w-[640px]",
              "min-w-full",
            )}
          />
        </div>
      </section>

      <figure
        className={cn(
          "grid place-items-center max-w-[640px]",
          "2xl:max-w-[920px]",
          "min-[678px]:min-w-[640px]",
        )}
      >
        <img
          src={llm}
          alt="Large Language Model Basics Infographic"
          className="min-w-[280px]"
        />
        <figcaption className="text-xs text-muted-foreground font-light">
          Infographic from{" "}
          <a
            className="text-accent"
            target="_blank"
            href={import.meta.env.VITE_KEYPOINT_INTELLIGENCE_URL}
          >
            Keypoint Intelligence
          </a>
        </figcaption>
      </figure>
    </main>
  );
}
