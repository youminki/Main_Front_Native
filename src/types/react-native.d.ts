declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

declare module '*.gif' {
  const content: any;
  export default content;
}

declare module '*.webp' {
  const content: any;
  export default content;
}

declare module 'date-fns' {
  export function addDays(date: Date, amount: number): Date;
  export function isSameDay(dateLeft: Date, dateRight: Date): boolean;
  export function isBefore(date: Date, dateToCompare: Date): boolean;
  export function format(date: Date, formatStr: string): string;
  export function addMonths(date: Date, amount: number): Date;
}

declare module 'styled-reset' {
  export const reset: any;
}

declare global {
  interface Window {
    PaypleCpayAuthCheck: any;
    PCD_PAY_CALLBACK: any;
  }

  function alert(message: string): void;
}
