import React, { FC } from 'react';

interface IProps {
  symbol: string;
  price: string;
  extra: string;
}

export const ProductsTableRow: FC<IProps> = ({ symbol, price, extra }) => (
  <div key={symbol} role="row" style={{ display: 'flex', padding: '1rem' }}>
    <div role="cell">{symbol}</div>
    <div style={{ padding: '0 1rem' }}>{price}</div>
    <div>{extra}</div>
  </div>
);
