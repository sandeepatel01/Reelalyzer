import { IconProps } from "@radix-ui/react-icons/dist/types";
import * as React from "react";

export const Icons = {
  analytics: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  ),
  sentiment: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),

  optimize: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v4m0 8v4m8-8h-4m-8 0H4m2.93-6.93l2.83 2.83m6.36 6.36l2.83 2.83m0-11.31l-2.83 2.83m-6.36 6.36L6.93 17.07"
      />
    </svg>
  ),

  compare: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 4H6a2 2 0 00-2 2v4m0 0l4-4m-4 4l4 4M14 20h4a2 2 0 002-2v-4m0 0l-4 4m4-4l-4-4"
      />
    </svg>
  ),

  verified: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M22 12l-2-2v-2l-2-2-2-1-2 1-2-1-2 1-2-1-2 2v2l-2 2 2 2v2l2 2 2 1 2-1 2 1 2-1 2-2v-2l2-2zM10 16l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" />
    </svg>
  ),

  briefcase: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7a2 2 0 012-2h3V4a1 1 0 011-1h4a1 1 0 011 1v1h3a2 2 0 012 2v2H3V7z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 11h18v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6z"
      />
    </svg>
  ),

  star: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l2.39 7.26H22l-5.8 4.21 2.2 7.3L12 17l-6.4 3.77 2.2-7.3L2 9.26h7.61z" />
    </svg>
  ),
};
