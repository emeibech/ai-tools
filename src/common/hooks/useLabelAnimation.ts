import { useEffect, useState } from 'react';
import type { FieldState, UseLabelAnimationProps } from '@/types/hooks';

const labelPositions = [
  'translate-y-0',
  'translate-y-1',
  'translate-y-2',
  'translate-y-3',
  'translate-y-4',
  'translate-y-5',
  'translate-y-6',
  'translate-y-7',
  'translate-y-8',
  'translate-y-9',
  'translate-y-10',
];

/**
 * Abstracts the animation of a label. This hook makes it possible to pick and choose
 * which label you want to animate. The animation includes going up, down, or remain
 * up depending on these input events.
 */
export default function useLabelAnimation({
  isDirty,
  isInvalid,
  initialPosition = 5,
}: UseLabelAnimationProps) {
  const [fieldState, setFieldState] = useState<FieldState>('default');

  const onFocus = () => {
    setFieldState(isInvalid ? 'focusedInvalid' : 'focusedValid');
  };

  const onBlur = () => {
    if (isInvalid) {
      setFieldState('blurredInvalid');
    } else if (isDirty) {
      setFieldState('blurredValid');
    } else {
      setFieldState('default');
    }
  };

  useEffect(() => {
    if (isDirty) {
      setFieldState(isInvalid ? 'focusedInvalid' : 'focusedValid');
    } else if (isInvalid) {
      setFieldState('blurredInvalid');
    }
  }, [isDirty, isInvalid]);

  const resetState = () => {
    setFieldState('default');
  };

  const getFieldState = (): FieldState => {
    return fieldState;
  };

  const getAnimationStyles = (): string => {
    switch (fieldState) {
      case 'focusedInvalid':
        return 'translate-y-0 -translate-x-1 scale-90 text-destructive pb-0.5';
      case 'focusedValid':
        return 'translate-y-0 -translate-x-1 scale-90 text-foreground transition-transform pb-0.5';
      case 'blurredInvalid':
        return 'translate-y-0 -translate-x-1 scale-90 text-destructive transition-transform pb-0.5';
      case 'blurredValid':
        return 'translate-y-0 -translate-x-1 scale-90 text-muted-foreground transition-transform pb-0.5';
      default:
        return `${labelPositions[initialPosition]} text-muted-foreground transition-transform`;
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
