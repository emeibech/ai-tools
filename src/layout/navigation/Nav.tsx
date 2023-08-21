import { cn } from "@/common/lib/utils";
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

function generateKeys(list: string[]) {
  return list.map(() => nanoid());
}

function formatPath(path: string) {
  return path.toLowerCase().replace(/\s/g, "");
}

export default function Nav() {
  const list = [
    "Code Analyzer",
    "Coding Assistant",
    "Eli5",
    "Story Generator",
    "Tone Changer",
    "General Assistant",
  ];
  const keys = generateKeys(list);

  const listItems = list.map((item, index) => (
    <li
      key={keys[index]}
      className={cn("flex flex-col gap-1 cursor-pointer", "lg:gap-2")}
    >
      <Link
        className={cn("px-4 py-2 rounded text-sm", "hover:bg-secondary")}
        to={formatPath(item)}
      >
        {item}
      </Link>
    </li>
  ));

  return (
    <nav className={cn("min-h-screen mt-12", "lg:px-6 lg:mt-20")}>
      <ul>{listItems}</ul>
    </nav>
  );
}
