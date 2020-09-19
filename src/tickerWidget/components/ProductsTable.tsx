import React, { FC } from 'react';

import { IProduct } from '../interfaces/products';

interface IProductsTableProps {
  values: IProduct[];
}

export const ProductsTable: FC<IProductsTableProps> = ({ values }) => (
  <div>
    {values.map((product) => (
      <div key={product.s}>
        <span>
          {product.b}/{product.q}
        </span>
      </div>
    ))}
  </div>
);
