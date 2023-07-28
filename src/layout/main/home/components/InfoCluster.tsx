import { cn } from "@/lib/utils";
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
        "p-4 flex flex-col justify-between mx-auto max-w-[640px] gap-2",
        "2xl:max-w-[480px] 2xl:min-w-[480px] 2xl:min-h-[160px] 2xl:mx-0 2xl:gap-0",
      )}
      aria-label={ariaLabel}
      role={role}
    >
      {props.children}
    </div>
  );
}
