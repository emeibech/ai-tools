import { cn } from "@/common/lib/utils";
import { ReactNode } from "react";

interface Props {
  className?: string;
  ariaLabel?: string;
  role?: string;
  children?: ReactNode;
}

export default function InfoCluster(props: Props) {
  const { className, ariaLabel, role } = props;
  return (
    <div
      className={cn(
        `${className}`,
        "flex flex-col mx-auto max-w-[640px] gap-2",
        "2xl:min-h-[180px]",
      )}
      aria-label={ariaLabel}
      role={role}
    >
      {props.children}
    </div>
  );
}
