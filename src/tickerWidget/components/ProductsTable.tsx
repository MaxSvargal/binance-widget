import React, { FC, useMemo } from 'react';
import { SortBy, SortByRadioGroup } from '..';

import { IProduct } from '../interfaces/products';

interface IProductsTableProps {
  values: IProduct[];
  sortBy: SortBy;
  extraColumn: SortByRadioGroup;
}

const getPerc = (x: number, y: number): number => ((y - x) / x) * 100;

const orderOf = <T extends string | number>(a: T, b: T): number =>
  a > b ? 1 : b > a ? -1 : 0;

const bySymbol = (a: IProduct, b: IProduct) => orderOf(a.s, b.s);
const byVolume = (a: IProduct, b: IProduct) => orderOf(a.v, b.v);
const byPrice = (a: IProduct, b: IProduct) => orderOf(a.c, b.c);
const byChange = (a: IProduct, b: IProduct) =>
  orderOf(getPerc(a.o, a.c), getPerc(b.o, b.c));

export const ProductsTable: FC<IProductsTableProps> = ({
  values,
  sortBy,
  extraColumn,
}) => {
  const products = useMemo<IProduct[]>(() => {
    switch (sortBy) {
      case SortBy.PriceAsc:
        return values.sort(byPrice);
      case SortBy.PriceDesc:
        return values.sort(byPrice).reverse();
      case SortBy.VolumeAsc:
        return values.sort(byVolume);
      case SortBy.VolumeDesc:
        return values.sort(byVolume).reverse();
      case SortBy.ChangeAsc:
        return values.sort(byChange);
      case SortBy.ChangeDesc:
        return values.sort(byChange).reverse();
      case SortBy.PairDesc:
        return values.sort(bySymbol);
      default:
        return values.sort(bySymbol).reverse();
    }
  }, [sortBy, values]);

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
