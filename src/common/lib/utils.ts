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
