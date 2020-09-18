import React, { ButtonHTMLAttributes, FC } from 'react';

export const MarketButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props,
) => <button {...props}>{props.children}</button>;
