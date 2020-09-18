import React, { FC, useCallback, useContext, useEffect, useState } from 'react';

import { productsContext } from '../contexts/productsContext';
import { getProducts } from '../repos/binanceRepo';
import { MarketsMenu } from './MarketsMenu';
import { ProductsTable } from './ProductsTable';

const DEFAULT_MARKET = { asset: 'BTC' }; // to props

export interface IActiveMarketState {
  asset?: string;
  group?: string;
}

export const TickerWidgetLayout: FC = () => {
  const [, setProducts] = useContext(productsContext);

  const [activeMarket, setActiveMarket] = useState<IActiveMarketState>(
    DEFAULT_MARKET,
  );
  const onChangeMarket = useCallback(setActiveMarket, []);

  useEffect(() => {
    console.log('effect');
    getProducts()
      .then((p) => {
        console.log({ p });
        setProducts(p);
      })
      .catch((err) => {
        console.error({ err });
        /* setError() */
      });
  }, [setProducts]);

  return (
    <>
      <MarketsMenu onChange={onChangeMarket} />
      <ProductsTable market={activeMarket} />
    </>
  );
};
