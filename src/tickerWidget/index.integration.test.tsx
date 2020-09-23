import React from 'react';
import { mocked } from 'ts-jest/utils';

import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import { TickerWidgetLayout } from './components/TickerWidgetLayout';
import { ProductsContextProvider } from './contexts/productsContexts';

import products from './fixtures/products.json';
import ticker from './fixtures/ticker.json';

import { IProduct } from './interfaces/products';
import { getProducts } from './repos/binanceRepo';
import { BinanceSocketRepo } from './repos/binanceSocketRepo';

// Mock repos manually because jest-websocket-mock just does not work
// jest-mock-fetch throw memory leak errors
jest.mock('./repos/binanceRepo');
jest.mock('./repos/binanceSocketRepo');

const mockedGetProducts = mocked(getProducts, true);
const mockedBinanceSocketRepo = mocked(BinanceSocketRepo, true);
const mockedOnMiniTickerShorten = mockedBinanceSocketRepo.mock.instances[0]
  .onMiniTickerShorten as jest.Mock;

const setItemLocalStorageSpy = jest.spyOn(window.localStorage, 'setItem');

describe('Ticker Widget', () => {
  const DEFAULT_MARKET = { asset: 'BTC' };

  const renderWidget = (products: IProduct[]) =>
    render(
      <ProductsContextProvider value={products}>
        <TickerWidgetLayout defaultMarket={DEFAULT_MARKET} />
      </ProductsContextProvider>,
    );

  beforeEach(() => {
    mockedGetProducts.mockClear();
    mockedGetProducts.mockResolvedValueOnce(products);

    mockedOnMiniTickerShorten.mockClear();
    mockedOnMiniTickerShorten.mockImplementation((listener) =>
      listener(ticker),
    );
    setItemLocalStorageSpy.mockClear();
  });

  it('on load show default market list', () => {
    renderWidget(products);

    expect(mockedGetProducts).toHaveBeenCalledTimes(1);

    expect(screen.getByText('BNB/BTC')).toBeInTheDocument();
    expect(screen.queryByText('ENG/ETH')).not.toBeInTheDocument();
    expect(screen.queryByText('DASH/ETH')).not.toBeInTheDocument();
    expect(screen.queryByText('TRX/XRP')).not.toBeInTheDocument();
  });

  it('on receive websocket ticker event then update products', () => {
    renderWidget(products);

    expect(screen.getByText('0.00001136')).toBeInTheDocument();
    expect(screen.getByText('+8.09%')).toBeInTheDocument();

    expect(screen.getByText('0.034002')).toBeInTheDocument();
    expect(screen.getByText('-2.25%')).toBeInTheDocument();
  });

  it('on select one of ALTS markets show products list', () => {
    renderWidget(products);

    UserEvent.hover(screen.getByRole('tooltip', { name: /ALTS/i }));
    UserEvent.click(screen.getByRole('button', { name: /ETH/i }));

    expect(screen.getByText('DASH/ETH')).toBeInTheDocument();
    expect(screen.getByText('ENG/ETH')).toBeInTheDocument();
    expect(screen.queryByText('BNB/BTC')).not.toBeInTheDocument();
    expect(screen.queryByText('TRX/XRP')).not.toBeInTheDocument();
  });

  it('on select all ALTS markets show products list', () => {
    renderWidget(products);

    UserEvent.hover(screen.getByRole('tooltip', { name: /ALTS/i }));
    UserEvent.click(screen.getByRole('button', { name: /ALTS/i }));

    expect(screen.queryByText('BNB/BTC')).not.toBeInTheDocument();
    expect(screen.getByText('DASH/ETH')).toBeInTheDocument();
    expect(screen.getByText('ENG/ETH')).toBeInTheDocument();
    expect(screen.getByText('TRX/XRP')).toBeInTheDocument();
  });

  it('on search show filtered list', async () => {
    renderWidget(products);

    await UserEvent.type(screen.getByRole('searchbox'), 'xrp');

    expect(screen.getByRole('searchbox')).toHaveValue('xrp');

    await screen.findByText('TRX/XRP');

    expect(screen.queryByText('DASH/ETH')).not.toBeInTheDocument();
    expect(screen.queryByText('ENG/ETH')).not.toBeInTheDocument();
    expect(screen.queryByText('BNB/BTC')).not.toBeInTheDocument();
  });

  it('on click clear search button', async () => {
    renderWidget(products);

    await UserEvent.type(screen.getByRole('searchbox'), 'xrp');

    UserEvent.click(screen.getByTitle('Clear search results'));

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

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('BNB/BTC');
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

  it('on init favorites restores from cache', () => {
    window.localStorage.setItem('favorites', JSON.stringify(['TRXXRP']));

    renderWidget(products);

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');

    UserEvent.click(screen.getByRole('button', { name: 'Favorite' }));

    expect(setItemLocalStorageSpy).toBeCalledTimes(1);

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('TRX/XRP');
  });

  it('on add symbol to favorite it have been cached', () => {
    window.localStorage.setItem('favorites', JSON.stringify(['TRXXRP']));

    renderWidget(products);

    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');

    const favoriteBtns = screen.getAllByTitle('Toggle favorite');

    UserEvent.click(favoriteBtns[0]);

    expect(setItemLocalStorageSpy).toBeCalledTimes(2);
    expect(setItemLocalStorageSpy).toHaveBeenNthCalledWith(
      1,
      'favorites',
      '["TRXXRP"]',
    );
    expect(setItemLocalStorageSpy).toHaveBeenNthCalledWith(
      2,
      'favorites',
      '["TRXXRP","UMABTC"]',
    );

    UserEvent.click(screen.getByRole('button', { name: 'Favorite' }));
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('UMA/BTC');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('TRX/XRP');
  });
});
