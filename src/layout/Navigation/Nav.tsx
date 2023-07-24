import { cn } from "@/lib/utils";

export default function Nav() {
  return (
    <nav className="px-4 mt-12">
      <ul className="flex flex-col gap-2 cursor-pointer">
        <li className={cn("px-2 py-1 rounded hover:bg-muted text-sm")}>
          Code Analyzer
        </li>
        <li className={cn("px-2 py-1 rounded hover:bg-muted text-sm")}>
          Coding Assistant
        </li>
        <li className={cn("px-2 py-1 rounded hover:bg-muted text-sm")}>ELI5</li>
        <li className={cn("px-2 py-1 rounded hover:bg-muted text-sm")}>
          Lore Generator
        </li>
        <li className={cn("px-2 py-1 rounded hover:bg-muted text-sm")}>
          Tone Changer
        </li>
        <li className={cn("px-2 py-1 rounded hover:bg-muted text-sm")}>
          General Assistant
        </li>
      </ul>
    </nav>
  );
}
