import { useMemo } from 'react';
import { IActiveMarketState } from '..';
import { IProduct } from '../interfaces/products';

export const useSelectProductsByMarket = (
  products: Array<IProduct>,
  market: IActiveMarketState,
): IProduct[] =>
  useMemo(
    () =>
      products.filter(
        market.asset
          ? (product) => product.q === market.asset
          : (product) => product.pm === market.group,
      ),
    [market, products],
  );
