import React from 'react';

import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import { TickerWidgetLayout } from './components/TickerWidgetLayout';
import { ProductsContextProvider } from './contexts/productsContext';
import { IProduct } from './interfaces/products';

const products: IProduct[] = [
  {
    s: 'BNBBTC',
    st: 'TRADING',
    b: 'BNB',
    q: 'BTC',
    ba: '',
    qa: '฿',
    i: 0.01,
    ts: 1e-7,
    an: 'BNB',
    qn: 'Bitcoin',
    o: 0.0026603,
    h: 0.0026816,
    l: 0.00242,
    c: 0.0025694,
    v: 2183898.71,
    qv: 5519.73442977,
    y: 0,
    as: 2183898.71,
    pm: 'BTC',
    pn: 'BTC',
    cs: 152665937,
    tags: [],
    etf: false,
  },
  {
    s: 'DASHETH',
    st: 'TRADING',
    b: 'DASH',
    q: 'ETH',
    ba: '',
    qa: 'Ξ',
    i: 0.001,
    ts: 0.00001,
    an: 'Dash',
    qn: 'Ethereum',
    o: 0.2011,
    h: 0.20346,
    l: 0.19784,
    c: 0.19907,
    v: 738.023,
    qv: 148.09434855,
    y: 0,
    as: 738.023,
    pm: 'ALTS',
    pn: 'ALTS',
    cs: 9708089,
    tags: [],
    etf: false,
  },
  {
    s: 'ENGETH',
    st: 'TRADING',
    b: 'ENG',
    q: 'ETH',
    ba: '',
    qa: 'Ξ',
    i: 1,
    ts: 1e-7,
    an: 'Enigma',
    qn: 'Ethereum',
    o: 0.0020726,
    h: 0.0021104,
    l: 0.0017611,
    c: 0.0017951,
    v: 258026,
    qv: 481.247821,
    y: 0,
    as: 258026,
    pm: 'ALTS',
    pn: 'ALTS',
    cs: 74836171,
    tags: ['mining-zone'],
    etf: false,
  },
  {
    s: 'TRXXRP',
    st: 'TRADING',
    b: 'TRX',
    q: 'XRP',
    ba: '',
    qa: '',
    i: 0.1,
    ts: 0.00001,
    an: 'TRON',
    qn: 'Ripple',
    o: 0.11988,
    h: 0.12277,
    l: 0.10899,
    c: 0.11181,
    v: 6904878,
    qv: 789210.637826,
    y: 0,
    as: 6904878,
    pm: 'ALTS',
    pn: 'ALTS',
    cs: 71659657369,
    tags: ['mining-zone'],
    etf: false,
  },
];

const renderMarketsMenu = (products: IProduct[]) =>
  render(
    <ProductsContextProvider value={products}>
      <TickerWidgetLayout />
    </ProductsContextProvider>,
  );

describe('TickerWidget', () => {
  it('show products list on select one of ALTS markets', async () => {
    renderMarketsMenu(products);

    const ethBtn = screen.getByRole('button', { name: /ETH/i });
    expect(ethBtn).toBeInTheDocument();

    UserEvent.click(ethBtn);

    expect(screen.getByText('DASH/ETH')).toBeInTheDocument();
    expect(screen.getByText('ENG/ETH')).toBeInTheDocument();
    expect(screen.queryByText('TRX/XRP')).not.toBeInTheDocument();
  });

  it('show products list on select all ALTS markets', async () => {
    renderMarketsMenu(products);

    const altsBtn = screen.getByRole('button', { name: /ALTS/i });
    expect(altsBtn).toBeInTheDocument();

    UserEvent.click(altsBtn);

    expect(screen.getByText('DASH/ETH')).toBeInTheDocument();
    expect(screen.getByText('ENG/ETH')).toBeInTheDocument();
    expect(screen.getByText('TRX/XRP')).toBeInTheDocument();
  });
});