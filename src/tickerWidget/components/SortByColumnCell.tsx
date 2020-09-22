import React, { ButtonHTMLAttributes, FC } from 'react';

import styles from './SortByColumnCell.module.css';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSortedUp: boolean;
  isSortedDown: boolean;
}

export const SortByColumnCell: FC<IProps> = ({
  isSortedUp,
  isSortedDown,
  ...rest
}) => (
  <div className={styles.container}>
    <button
      className={`${styles.button} ${isSortedUp && styles.isUp} ${
        isSortedDown && styles.isDown
      }`}
      {...rest}
    />
  </div>
);
