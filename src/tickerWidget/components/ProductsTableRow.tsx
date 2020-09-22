import React, { FC, useMemo } from 'react';
import { FavoriteBtn } from './FavoriteBtn';

import styles from './ProductsTableRow.module.css';

interface IProps {
  symbol: string;
  price: string;
  extra: string;
  onFavorite(): void;
  isFavorite: boolean;
  showPercent: boolean;
}

export const ProductsTableRow: FC<IProps> = ({
  symbol,
  price,
  extra,
  isFavorite,
  showPercent,
  onFavorite,
}) => {
  const isPositive = useMemo(() => parseFloat(extra) >= 0, [extra]);
  return (
    <div key={symbol} role="row" className={styles.container}>
      <div className={styles.symbolGroup}>
        <FavoriteBtn active={isFavorite} onClick={onFavorite} />
        <div role="cell">{symbol}</div>
      </div>
      <div className={styles.price}>{price}</div>
      <div
        className={`${styles.extraGroup} ${
          styles[showPercent ? (isPositive ? 'green' : 'orange') : 'white']
        }`}
      >
        {showPercent && isPositive ? '+' : ''}
        {extra}
        {showPercent ? '%' : ''}
      </div>
    </div>
  );
};
