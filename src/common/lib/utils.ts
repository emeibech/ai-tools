import { nanoid } from "@reduxjs/toolkit";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateKeys(list: unknown[]) {
  return list.map(() => nanoid());
}
