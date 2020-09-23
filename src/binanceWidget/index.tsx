import React, { FC } from 'react';

import { BinanceWidgetLayout } from './components/BinanceWidgetLayout';
import { ProductsContextProvider } from './contexts/productsContexts';

import { BinanceSocketRepo } from './repos/binanceSocketRepo';

export enum SortBy {
  ChangeAsc = 'ChangeAsc',
  ChangeDesc = 'ChangeDesc',
  VolumeAsc = 'VolumeAsc',
  VolumeDesc = 'VolumeDesc',
  PairAsc = 'PairAsc',
  PairDesc = 'PairDesc',
  PriceAsc = 'PriceAsc',
  PriceDesc = 'PriceDesc',
}

export enum SortByRadioGroup {
  Change = 'Change',
  Volume = 'Volume',
}

export const BinanceWidget: FC = () => (
  <ProductsContextProvider>
    <BinanceWidgetLayout defaultMarket={{ asset: 'BTC' }} />
  </ProductsContextProvider>
);

export const binanceSocketRepo = new BinanceSocketRepo();
