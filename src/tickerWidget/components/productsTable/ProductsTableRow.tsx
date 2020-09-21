import React, { FC } from 'react';

interface IProps {
  symbol: string;
  price: string;
  extra: string;
  onFavorite(): void;
}

export const ProductsTableRow: FC<IProps> = ({
  symbol,
  price,
  extra,
  onFavorite,
}) => (
  <div key={symbol} role="row" style={{ display: 'flex', padding: '1rem' }}>
    <button title="Toggle favorite" onClick={onFavorite}>
      Toggle favorite
    </button>
    <div role="cell">{symbol}</div>
    <div style={{ padding: '0 1rem' }}>{price}</div>
    <div>{extra}</div>
  </div>
);
