import { cn } from "@/common/lib/utils";

interface Props {
  className?: string;
}

export default function Footer(props: Props) {
  return (
    <footer
      className={cn(
        props.className,
        "text-xs text-muted-foreground text-center",
        "self-end",
      )}
    >
      <article>Copyright © 2023 emeibech AI.</article>
      <article>All rights reserved.</article>
    </footer>
  );
}
