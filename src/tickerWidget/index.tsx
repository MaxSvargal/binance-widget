import React, { FC } from 'react';

import { Compose } from '../shared/components/Compose';
import { TickerWidgetLayout } from './components/TickerWidgetLayout';
import {
  ProductsContextProvider,
  TickerContextProvider,
} from './contexts/productsContexts';

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
