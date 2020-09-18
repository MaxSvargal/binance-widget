import { useMemo } from 'react';
import { IProduct } from '../interfaces/products';

export const useSelectParentMarkets = (products: Array<IProduct>): string[] =>
  useMemo(() => [...new Set(products.map((product) => product.pm))], [
    products,
  ]);
