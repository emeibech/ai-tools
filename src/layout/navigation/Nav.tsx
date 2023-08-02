import { cn } from "@/lib/utils";

export default function Nav() {
  const list = [
    "Code Analyzer",
    "Coding Assistant",
    "Eli5",
    "Lore Generator",
    "Tone Changer",
    "General Assistant",
  ];
  const listItems = list.map((item) => (
    <li
      key={item}
      className={cn("px-4 py-2 rounded text-sm", "hover:bg-secondary")}
    >
      {item}
    </li>
  ));

  return (
    <nav className={cn("min-h-screen mt-12", "lg:px-6 lg:mt-40")}>
      <ul className={cn("flex flex-col gap-1 cursor-pointer", "lg:gap-2")}>
        {listItems}
      </ul>
    </nav>
  );
}
