import { useState } from "react";

type FieldState = "blurred" | "focused" | "dirty";

/**
 * Abstracts the animation of a label. This hook makes it possible to pick and choose
 * which label you want to animate. The animation includes going up, down, or remain
 * up depending on these input events: onFocus, onBlur, onChange.
 * @param {boolean} isDirty - The property from getFieldState method
 */
export default function useLabelAnimation(isDirty: boolean) {
  const [fieldState, setFieldState] = useState<FieldState>("blurred");

  function floatUp() {
    if (!isDirty) setFieldState("focused");
  }

  function floatDown() {
    if (!isDirty) setFieldState("blurred");
  }

  function remainUp() {
    setFieldState("dirty");
  }

  function resetState() {
    setFieldState("blurred");
  }

  function getFieldState(): FieldState {
    return fieldState;
  }

  function getStyle(): string {
    if (fieldState === "blurred") {
      return "translate-y-5 -translate-x-[3px] text-muted-foreground";
    }

    return "translate-y-0 -translate-x-0";
  }

  return {
    floatUp,
    floatDown,
    remainUp,
    resetState,
    getFieldState,
    getStyle,
  };
}
