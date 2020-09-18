import React, { FC } from 'react';

import { Compose } from '../shared/components/Compose';
import { TickerWidgetLayout } from './components/TickerWidgetLayout';
import {
  ProductsContextProvider,
  TickerContextProvider,
} from './contexts/productsContext';

export const TickerWidget: FC = () => (
  <Compose components={[ProductsContextProvider, TickerContextProvider]}>
    <TickerWidgetLayout />
  </Compose>
);
