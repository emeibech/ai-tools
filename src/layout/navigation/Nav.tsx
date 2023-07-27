import { cn } from "@/lib/utils";

export default function Nav() {
  return (
    <nav className={cn("min-h-screen mt-12", "lg:px-6 lg:mt-20")}>
      <ul className={cn("flex flex-col gap-1 cursor-pointer", "lg:gap-2")}>
        <li className={cn("px-2 py-2 rounded hover:bg-muted text-sm")}>
          Code Analyzer
        </li>
        <li className={cn("px-2 py-2 rounded hover:bg-muted text-sm")}>
          Coding Assistant
        </li>
        <li className={cn("px-2 py-2 rounded hover:bg-muted text-sm")}>ELI5</li>
        <li className={cn("px-2 py-2 rounded hover:bg-muted text-sm")}>
          Lore Generator
        </li>
        <li className={cn("px-2 py-2 rounded hover:bg-muted text-sm")}>
          Tone Changer
        </li>
        <li className={cn("px-2 py-2 rounded hover:bg-muted text-sm")}>
          General Assistant
        </li>
      </ul>
    </nav>
  );
}
