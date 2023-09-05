import { RefObject, useRef } from "react";

export default function useTextareaAutoresize(
  ref: RefObject<HTMLTextAreaElement>,
) {
  const maxHeight = useRef(200);

  function adjustTextareaHeight() {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;

      if (ref.current.scrollHeight > maxHeight.current) {
        ref.current.style.overflowY = "auto";
        ref.current.style.height = `${maxHeight}px`;
      } else {
        ref.current.style.overflowY = "hidden";
      }
    }
  }

  function resetTextareaHeight() {
    if (ref.current) ref.current.style.height = "auto";
  }

  function setMaxHeight(height: number) {
    maxHeight.current = height;
  }

  function getMaxHeight() {
    return maxHeight.current;
  }

  function getTaiwindClasses() {
    return "overflow-y-auto h-[auto]";
  }

  return {
    adjustTextareaHeight,
    resetTextareaHeight,
    setMaxHeight,
    getMaxHeight,
    getTaiwindClasses,
  };
}
