import React, { ButtonHTMLAttributes, FC } from 'react';

import styles from './MarketButton.module.css';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

export const MarketButton: FC<IProps> = ({ active, ...rest }) => (
  <button
    className={`${styles.marketButton} ${active && styles.active}`}
    {...rest}
  />
);
