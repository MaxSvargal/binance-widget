import React from 'react';
import { mocked } from 'ts-jest/utils';

import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import { TickerWidgetLayout } from './components/TickerWidgetLayout';
import { ProductsContextProvider } from './contexts/productsContexts';
import { IProduct } from './interfaces/products';

import { getProducts } from './repos/binanceRepo';
import { BinanceSocketRepo } from './repos/binanceSocketRepo';

jest.mock('./repos/binanceRepo');
jest.mock('./repos/binanceSocketRepo');

const mockedGetProducts = mocked(getProducts, true);
const mockedBinanceSocketRepo = mocked(BinanceSocketRepo, true);
const mockedOnMiniTickerShorten = mockedBinanceSocketRepo.mock.instances[0]
  .onMiniTickerShorten as jest.Mock;

const DEFAULT_MARKET = { asset: 'BTC' };

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
    s: 'UMABTC',
    st: 'TRADING',
    b: 'UMA',
    q: 'BTC',
    ba: '',
    qa: '฿',
    i: 0.001,
    ts: 0.000001,
    an: 'UMA',
    qn: 'Bitcoin',
    o: 0.001543,
    h: 0.001627,
    l: 0.000823,
    c: 1.001389,
    v: 95411.25,
    qv: 140.79671292,
    y: 0,
    as: 95411.25,
    pm: 'BTC',
    pn: 'BTC',
    cs: null,
    tags: ['defi', 'mining-zone'],
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

const tickerData = [
  {
    e: '24hrMiniTicker',
    E: 1600619759229,
    s: 'BNBBTC',
    c: '0.03400200',
    o: '0.03478600',
    h: '0.03495000',
    l: '0.03388300',
    v: '250983.25500000',
    q: '8684.11973573',
  },
  {
    e: '24hrMiniTicker',
    E: 1600619759321,
    s: 'UMABTC',
    c: '0.00001136',
    o: '0.00001051',
    h: '0.00001435',
    l: '0.00001051',
    v: '24772060.00000000',
    q: '304.35494788',
  },
];

const renderWidget = (products: IProduct[]) =>
  render(
    <ProductsContextProvider value={products}>
      <TickerWidgetLayout defaultMarket={DEFAULT_MARKET} />
    </ProductsContextProvider>,
  );

describe('TickerWidget', () => {
  // window.fetch = fetchMock;

  beforeEach(() => {
    mockedGetProducts.mockReset();
    mockedOnMiniTickerShorten.mockReset();

    mockedGetProducts.mockResolvedValueOnce(products);
    mockedOnMiniTickerShorten.mockImplementationOnce((listener) => {
      listener(tickerData);
      // return tickerMessage;
    });
  });

  it('show default market on load', () => {
    renderWidget(products);

    expect(mockedGetProducts).toHaveBeenCalledTimes(1);
    // expect(fetchMock.mock.calls[0][0]).toEqual('https://google.com');

    expect(screen.getByText('BNB/BTC')).toBeInTheDocument();
    expect(screen.queryByText('ENG/ETH')).not.toBeInTheDocument();
    expect(screen.queryByText('DASH/ETH')).not.toBeInTheDocument();
    expect(screen.queryByText('TRX/XRP')).not.toBeInTheDocument();
  });

  it('update products on websocket event', async () => {
    renderWidget(products);

    expect(mockedOnMiniTickerShorten).toHaveBeenCalledTimes(1);

    expect(screen.getByText('BNB/BTC')).toBeInTheDocument();
    expect(screen.getByText('0.034002')).toBeInTheDocument();
    expect(screen.getByText('UMA/BTC')).toBeInTheDocument();
    expect(screen.getByText('0.00001136')).toBeInTheDocument();
  });

  it('show products list on select one of ALTS markets', () => {
    renderWidget(products);

    const ethBtn = screen.getByRole('button', { name: /ETH/i });

    UserEvent.click(ethBtn);

    expect(screen.getByText('DASH/ETH')).toBeInTheDocument();
    expect(screen.getByText('ENG/ETH')).toBeInTheDocument();
    expect(screen.queryByText('BNB/BTC')).not.toBeInTheDocument();
    expect(screen.queryByText('TRX/XRP')).not.toBeInTheDocument();
  });

  it('show products list on select all ALTS markets', () => {
    renderWidget(products);

    const altsBtn = screen.getByRole('button', { name: /ALTS/i });

    UserEvent.click(altsBtn);

    expect(screen.queryByText('BNB/BTC')).not.toBeInTheDocument();
    expect(screen.getByText('DASH/ETH')).toBeInTheDocument();
    expect(screen.getByText('ENG/ETH')).toBeInTheDocument();
    expect(screen.getByText('TRX/XRP')).toBeInTheDocument();
  });

  it('show filtered list on search', async () => {
    renderWidget(products);

    await UserEvent.type(screen.getByRole('searchbox'), 'xrp');

    expect(screen.getByRole('searchbox')).toHaveValue('xrp');

    await screen.findByText('TRX/XRP');

    expect(screen.queryByText('DASH/ETH')).not.toBeInTheDocument();
    expect(screen.queryByText('ENG/ETH')).not.toBeInTheDocument();
    expect(screen.queryByText('BNB/BTC')).not.toBeInTheDocument();
  });

  it('on click button clear search', async () => {
    renderWidget(products);

    await UserEvent.type(screen.getByRole('searchbox'), 'xrp');

    UserEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(screen.getByText('BNB/BTC')).toBeInTheDocument();
  });

  it('on change radio button to sort products by volume', () => {
    renderWidget(products);

    const getRadioEl = (name: string) => screen.getByRole('radio', { name });

    expect(getRadioEl('Change')).toHaveProperty('checked', true);
    expect(getRadioEl('Volume')).toHaveProperty('checked', false);

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('BNB/BTC');

    UserEvent.click(screen.getByLabelText('Volume', { selector: 'input' }));

    expect(getRadioEl('Change')).toHaveProperty('checked', false);
    expect(getRadioEl('Volume')).toHaveProperty('checked', true);

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('BNB/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('UMA/BTC');
  });

  it('on change radio button to sort products by change back', () => {
    renderWidget(products);

    UserEvent.click(screen.getByLabelText('Volume', { selector: 'input' }));
    UserEvent.click(screen.getByLabelText('Change', { selector: 'input' }));

    expect(screen.getByRole('radio', { name: 'Change' })).toHaveProperty(
      'checked',
      true,
    );
  });

  it('on sort by colum by name (pair)', () => {
    renderWidget(products);

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('BNB/BTC');

    UserEvent.click(screen.getByRole('button', { name: 'Pair' })); // desc
    UserEvent.click(screen.getByRole('button', { name: 'Pair' })); // ask

    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('BNB/BTC');
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');
  });

  it('on sort by colum by price', () => {
    renderWidget(products);

    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('BNB/BTC');
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');

    UserEvent.click(screen.getByRole('button', { name: 'Last Price' }));

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('BNB/BTC');

    UserEvent.click(screen.getByRole('button', { name: 'Last Price' }));

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('BNB/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('UMA/BTC');
  });

  it('con sort by colum by change', () => {
    renderWidget(products);

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('BNB/BTC');

    UserEvent.click(screen.getByRole('button', { name: 'Change' }));

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('BNB/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('UMA/BTC');

    UserEvent.click(screen.getByRole('button', { name: 'Change' }));

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('BNB/BTC');
  });

  it('on sort by colum by volume', () => {
    renderWidget(products);

    UserEvent.click(screen.getByLabelText('Volume', { selector: 'input' }));

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('BNB/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('UMA/BTC');

    UserEvent.click(screen.getByRole('button', { name: 'Volume' }));

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('BNB/BTC');
  });
});
