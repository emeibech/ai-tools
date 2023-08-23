import { useEffect, useState } from "react";

export type FieldState =
  | "default"
  | "focusedValid"
  | "focusedInvalid"
  | "blurredValid"
  | "blurredInvalid";

interface useLabelAnimationProps {
  isDirty: boolean;
  isInvalid: boolean;
}

/**
 * Abstracts the animation of a label. This hook makes it possible to pick and choose
 * which label you want to animate. The animation includes going up, down, or remain
 * up depending on these input events.
 */
export default function useLabelAnimation({
  isDirty,
  isInvalid,
}: useLabelAnimationProps) {
  const [fieldState, setFieldState] = useState<FieldState>("default");

  const onFocus = () => {
    setFieldState(isInvalid ? "focusedInvalid" : "focusedValid");
  };

  const onBlur = () => {
    if (isInvalid) {
      setFieldState("blurredInvalid");
    } else if (isDirty) {
      setFieldState("blurredValid");
    } else {
      setFieldState("default");
    }
  };

  useEffect(() => {
    if (isDirty) {
      setFieldState(isInvalid ? "focusedInvalid" : "focusedValid");
    } else if (isInvalid) {
      setFieldState("blurredInvalid");
    }
  }, [isDirty, isInvalid]);

  const resetState = () => {
    setFieldState("default");
  };

  const getFieldState = (): FieldState => {
    return fieldState;
  };

  const getAnimationStyles = (): string => {
    switch (fieldState) {
      case "focusedInvalid":
        return "translate-y-0 -translate-x-1 scale-90 text-destructive";
      case "focusedValid":
        return "translate-y-0 -translate-x-1 scale-90 text-foreground transition-transform";
      case "blurredInvalid":
        return "translate-y-0 -translate-x-1 scale-90 text-destructive transition-transform";
      case "blurredValid":
        return "translate-y-0 -translate-x-1 scale-90 text-muted-foreground transition-transform";
      default:
        return "translate-y-5 text-muted-foreground transition-transform";
    }
  };

  return {
    onFocus,
    onBlur,
    resetState,
    getFieldState,
    getAnimationStyles,
  };
}
