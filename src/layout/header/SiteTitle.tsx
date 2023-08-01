import { cn } from "@/lib/utils";

export default function SiteTitle() {
  return (
    <h1
      data-name="site-name"
      className={cn(
        "text-xl text-left cursor-pointer font-bold rounded-md px-2",
        "lg:text-2xl lg:px-6 lg:py-1",
      )}
    >
      emeibech<span className={cn("ml-1")}>ai</span>
    </h1>
  );
}
