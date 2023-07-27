import { Button } from "@/components/ui/button";
import React, { Ref } from "react";

const HamburgerBtn = React.forwardRef(
  (props, forwardedRef: Ref<HTMLButtonElement> | undefined) => {
    return (
      <Button
        {...props}
        ref={forwardedRef}
        variant="ghost"
        type="button"
        className="p-2 active:bg-muted lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="24px"
          aria-hidden="true"
          role="img"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </Button>
    );
  },
);

export default HamburgerBtn;