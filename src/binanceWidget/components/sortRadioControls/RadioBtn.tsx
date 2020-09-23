import React, { FC } from 'react';

import styles from './RadioBtn.module.css';

type IProps = React.InputHTMLAttributes<HTMLInputElement>;

export const RadioBtn: FC<IProps> = ({ children, id, ...rest }) => {
  return (
    <label htmlFor={id} className={styles.labelContainer}>
      <input type="radio" id={id} {...rest} className={styles.inputRadio} />
      <div className={styles.check} />
      <span className={styles.labelText}>{children}</span>
    </label>
  );
};
