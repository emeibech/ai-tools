import { cn } from "@/lib/utils";

export default function SiteTitle() {
  return (
    <h1
      data-name="site-name"
      className={cn(
        "text-xl cursor-pointer font-bold rounded-md px-2 transition-colors",
        "focus-visible:outline-none ring-offset-background",
        "focus-visible:ring-ring focus-visible:ring-2",
        "focus-visible:ring-offset-2",
      )}
    >
      emeibech<span className={cn("ml-1")}>ai</span>
    </h1>
  );
}
