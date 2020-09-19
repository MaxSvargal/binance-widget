import React, { FC } from 'react';

import { SortBy, SortByRadioGroup } from '../';
import { getPerc, useProductsSort } from '../hooks/useProductsSort';
import { IProduct } from '../interfaces/products';

interface IProductsTableProps {
  values: IProduct[];
  sortBy: SortBy;
  extraColumn: SortByRadioGroup;
}

export const ProductsTable: FC<IProductsTableProps> = ({
  values,
  sortBy,
  extraColumn,
}) => {
  const products = useProductsSort(values, sortBy);

  return (
    <div>
      {products.map((product) => (
        <div
          key={product.s}
          role="row"
          style={{ display: 'flex', padding: '1rem' }}
        >
          <div role="cell">
            {product.b}/{product.q}
          </div>
          <div style={{ padding: '0 1rem' }}>{product.c}</div>
          <div>
            {/* SOrting is not working, make a model anyway */}
            {extraColumn === SortByRadioGroup.Change
              ? getPerc(product.o, product.c).toFixed(2)
              : product.v}
          </div>
        </div>
      ))}
    </div>
  );
};
