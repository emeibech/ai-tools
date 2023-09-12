import { nanoid } from '@reduxjs/toolkit';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function generateKeys(list: unknown[]): string[] {
  return list.map(() => nanoid());
}

export function convertEntitiesToCharacters(html: string): string | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.documentElement.textContent;
}

export function scrollToBottom(): void {
  window.scrollTo({
    left: 0,
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}

export const mockStreamingApi = (
  mockData: unknown[],
  maxDelay: number = 100,
) => {
  return new ReadableStream({
    start(controller) {
      let index = 0;

      const pushData = () => {
        if (index < mockData.length) {
          controller.enqueue(mockData[index]);
          index++;
          setTimeout(pushData, Math.floor(Math.random() * maxDelay));
        } else {
          controller.close();
        }
      };

      pushData();
    },
  });
};
