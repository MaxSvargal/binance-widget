import React, { ButtonHTMLAttributes, FC } from 'react';

import styles from './MarketButton.module.css';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  variant?: 'default' | 'horizontalList';
}

export const MarketButton: FC<IProps> = ({ active, variant, ...rest }) => (
  <button
    className={`${styles.marketButton} ${active && styles.active} ${
      variant === 'horizontalList' && styles.horizontalList
    }`}
    {...rest}
  />
);
