import React, { ButtonHTMLAttributes, FC } from 'react';

import styles from './MarketButton.module.css';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

export const MarketButton: FC<IProps> = (props) => (
  <button
    className={`${styles.marketButton} ${props.active && styles.active}`}
    {...props}
  >
    {props.children}
  </button>
);
