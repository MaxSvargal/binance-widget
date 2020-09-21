import { useMemo } from 'react';

import { SortBy } from '../';
import { getRatio } from '../helpers/productsFields';
import { IProduct } from '../interfaces/products';

const orderOf = <T extends string | number>(a: T, b: T): number =>
  a > b ? 1 : b > a ? -1 : 0;

const bySymbol = (a: IProduct, b: IProduct) => orderOf(a.s, b.s);
const byVolume = (a: IProduct, b: IProduct) => orderOf(a.v, b.v);
const byPrice = (a: IProduct, b: IProduct) => orderOf(a.c, b.c);
const byChange = (a: IProduct, b: IProduct) =>
  orderOf(getRatio(a.o, a.c), getRatio(b.o, b.c));

export const useProductsSort = <T extends IProduct[]>(
  values: T,
  sortBy: SortBy,
): IProduct[] =>
  useMemo(() => {
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
  }, [values, sortBy]);
