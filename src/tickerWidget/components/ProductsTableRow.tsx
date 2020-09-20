import React, { FC } from 'react';

import { IProduct } from '../interfaces/products';

interface IProps {
  value: IProduct;
  extra: string;
}

export const ProductsTableRow: FC<IProps> = ({ value, extra }) => (
  <div key={value.s} role="row" style={{ display: 'flex', padding: '1rem' }}>
    <div role="cell">
      {value.b}/{value.q}
    </div>
    <div style={{ padding: '0 1rem' }}>{value.c}</div>
    <div>{extra}</div>
  </div>
);
