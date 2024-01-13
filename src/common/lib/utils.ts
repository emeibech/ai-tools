import { nanoid } from '@reduxjs/toolkit';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Message } from '@/types/features';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function generateKeys(list: unknown[]): string[] {
  return list.map(() => nanoid());
}

export function scrollToBottom(behavior: ScrollBehavior = 'smooth'): void {
  requestAnimationFrame(() => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: behavior,
    });
  });
}

export function scrollWindowTo({
  top,
  left = 0,
  behavior = 'instant' as ScrollBehavior,
}: ScrollToOptions): void {
  requestAnimationFrame(() => {
    window.scrollTo({
      left,
      top,
      behavior,
    });
  });
}

export function getCatchError(error: unknown) {
  if (error instanceof Error) {
    return error.message.includes('NetworkError')
      ? 'Server is unavailable at the moment. Please try again later.'
      : error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    return `${error.message}`;
  } else {
    return `${error}`;
  }
}

export function removeIds(messages: Message[]) {
  const noIds = messages.map(({ role, content }) => ({ role, content }));
  return noIds;
}
