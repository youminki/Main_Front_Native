// ButtonWrapper.tsx
import React from 'react';
import Button02 from './Button02';

// Button02의 color prop 없이 나머지 props만 받도록 타입 설정
type ButtonPropsWithoutColor = Omit<
  React.ComponentProps<typeof Button02>,
  'color'
>;

export const YellowButton: React.FC<ButtonPropsWithoutColor> = (props) => {
  return <Button02 {...props} color='yellow' />;
};

export const BlackButton: React.FC<ButtonPropsWithoutColor> = (props) => {
  return <Button02 {...props} color='black' />;
};
