import * as z from 'zod';
import type { RefObject } from 'react';
import type { Status } from './features';

//useAutoScroll
export interface AutoScrollArgs {
  status: Status;
  scrollDir: ScrollDirection;
}

// useFormLogic
export interface UseFormLogicArgs {
  schema: {
    [key: string]: z.ZodString;
  };
  defaultValues: {
    [key: string]: string;
  };
  mode: 'all' | 'onBlur' | 'onTouched' | 'onSubmit' | 'onChange';
  refs: RefObject<HTMLElement>[];
  resetLabelState: () => void;
}

// useGetScrollDir
export type ScrollDirection = 'up' | 'down';

// useLabelAnimation
export interface UseLabelAnimationProps {
  isDirty: boolean;
  isInvalid: boolean;
}

export type FieldState =
  | 'default'
  | 'focusedValid'
  | 'focusedInvalid'
  | 'blurredValid'
  | 'blurredInvalid';
