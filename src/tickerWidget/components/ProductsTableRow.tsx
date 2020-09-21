import React, { FC, useMemo } from 'react';
import { FavoriteBtn } from './FavoriteBtn';

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
    <div key={symbol} role="row" style={{ display: 'flex', padding: '1rem' }}>
      <FavoriteBtn active={isFavorite} onClick={onFavorite} />
      <div role="cell">{symbol}</div>
      <div style={{ padding: '0 1rem' }}>{price}</div>
      <div
        style={{
          color: `var(--${
            showPercent ? (isPositive ? 'green' : 'orange') : 'white'
          })`,
        }}
      >
        {showPercent && isPositive ? '+' : ''}
        {extra}
        {showPercent ? '%' : ''}
      </div>
    </div>
  );
};
