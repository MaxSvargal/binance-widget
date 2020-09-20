import React, { FC } from 'react';

import { Compose } from '../shared/components/Compose';
import { TickerWidgetLayout } from './components/TickerWidgetLayout';
import {
  ProductsContextProvider,
  TickerContextProvider,
} from './contexts/productsContexts';

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

export interface IActiveMarketState {
  // shape
  asset?: string;
  group?: string;
}

export const TickerWidget: FC = () => (
  <Compose components={[ProductsContextProvider, TickerContextProvider]}>
    <TickerWidgetLayout defaultMarket={{ asset: 'BTC' }} />
  </Compose>
);

export const binanceSocketRepo = new BinanceSocketRepo();
