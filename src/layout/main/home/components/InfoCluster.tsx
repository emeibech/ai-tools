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
        "xl:max-w-[480px] xl:min-w-[480px] xl:min-h-[160px] xl:mx-0 xl:gap-0",
      )}
      aria-label={ariaLabel}
      role={role}
    >
      {props.children}
    </div>
  );
}
