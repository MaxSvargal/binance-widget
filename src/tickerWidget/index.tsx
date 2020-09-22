import React, { FC } from 'react';

import { TickerWidgetLayout } from './components/TickerWidgetLayout';
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

export const TickerWidget: FC = () => (
  <ProductsContextProvider>
    <TickerWidgetLayout defaultMarket={{ asset: 'BTC' }} />
  </ProductsContextProvider>
);

export const binanceSocketRepo = new BinanceSocketRepo();
