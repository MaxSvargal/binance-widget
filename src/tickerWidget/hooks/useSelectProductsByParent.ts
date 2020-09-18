import { useMemo } from 'react';
import { IProduct } from '../interfaces/products';

export const useSelectProductsByParent = (
  products: Array<IProduct>,
  market: string,
): IProduct[] =>
  useMemo(() => products.filter((product) => product.pm === market), [
    market,
    products,
  ]);
