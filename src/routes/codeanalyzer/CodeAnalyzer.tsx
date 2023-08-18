import { cn } from "@/common/lib/utils";
import CodeAnalyzerForm from "./CodeAnalyzerForm";

export default function CodeAnalyzer() {
  return (
    <main
      className={cn(
        "mt-12 px-4 flex flex-col items-start gap-8 max-w-[920px] mx-auto",
        "min-[320px]:p-4 lg:p-8",
        "2xl:p-12",
      )}
    >
      <h2
        className={cn(
          "self-start text-4xl font-semibold max-w-[640px]",
          "sm:text-5xl",
        )}
      >
        Code Analyzer
      </h2>

      <p>
        Code Analyzer helps you understand complex snippets of code or
        not-so-complex-but-hard-to-read ones written by noobs like me. Input the
        code in the box, submit, and you will get a response giving you a brief
        summary and a structured break down of the code.
      </p>

      <CodeAnalyzerForm />
    </main>
  );
}
