import React, { FC } from 'react';

import styles from './FavoriteBtn.module.css';

interface IProps {
  active: boolean;
  onClick(): void;
}

export const FavoriteBtn: FC<IProps> = ({ active, onClick }) => (
  <button
    title="Toggle favorite"
    onClick={onClick}
    className={`${styles.button} ${active && styles.active}`}
  >
    {active ? <span>&#9733;</span> : <span>&#9734;</span>}
  </button>
);
