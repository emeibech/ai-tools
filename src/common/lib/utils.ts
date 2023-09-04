import { nanoid } from "@reduxjs/toolkit";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateKeys(list: string[]) {
  return list.map(() => nanoid());
}
