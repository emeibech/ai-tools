import * as z from 'zod';
import type { RefObject } from 'react';
import type { RequestStatus } from './features';

// useAutoScroll
export interface AutoScrollArgs {
  status: RequestStatus;
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
  initialPosition?: number;
}

// useLabelAnimation
export type FieldState =
  | 'default'
  | 'focusedValid'
  | 'focusedInvalid'
  | 'blurredValid'
  | 'blurredInvalid';

// useSetLocalStorageData
export type UserStatus = 'guest' | 'user';
