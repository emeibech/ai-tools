import { cn } from "@/lib/utils";

export default function Nav() {
  return (
    <nav className={cn("min-h-screen mt-12", "lg:px-6 lg:mt-40")}>
      <ul className={cn("flex flex-col gap-1 cursor-pointer", "lg:gap-2")}>
        <li className={cn("px-4 py-2 rounded text-sm", "hover:bg-secondary")}>
          Code Analyzer
        </li>
        <li className={cn("px-4 py-2 rounded text-sm", "hover:bg-secondary")}>
          Coding Assistant
        </li>
        <li className={cn("px-4 py-2 rounded text-sm", "hover:bg-secondary")}>
          ELI5
        </li>
        <li className={cn("px-4 py-2 rounded text-sm", "hover:bg-secondary")}>
          Lore Generator
        </li>
        <li className={cn("px-4 py-2 rounded text-sm", "hover:bg-secondary")}>
          Tone Changer
        </li>
        <li className={cn("px-4 py-2 rounded text-sm", "hover:bg-secondary")}>
          General Assistant
        </li>
      </ul>
    </nav>
  );
}
