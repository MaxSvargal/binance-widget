import React from 'react';
import { mocked } from 'ts-jest/utils';

import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import { TickerWidgetLayout } from './components/TickerWidgetLayout';
import { ProductsContextProvider } from './contexts/productsContexts';
import { IProduct } from './interfaces/products';

import { getProducts } from './repos/binanceRepo';
import { BinanceSocketRepo } from './repos/binanceSocketRepo';

import products from './fixtures/products.json';
import ticker from './fixtures/ticker.json';
import { WebsocketReadyState } from '../shared/repos/WebSocketRepo';

// Mock repos instead of fetch/ws api because it's simpler, clearer and have no dependencies
jest.mock('./repos/binanceRepo');
jest.mock('./repos/binanceSocketRepo');

// We use only public interfaces
const mockedGetProducts = mocked(getProducts, true);
const mockedBinanceSocketRepo = mocked(BinanceSocketRepo, true);
const mockedOnMiniTickerShorten = mockedBinanceSocketRepo.mock.instances[0]
  .onMiniTickerShorten as jest.Mock;
const mockedOnChangeStatus = mockedBinanceSocketRepo.mock.instances[0]
  .onChangeStatus as jest.Mock;

describe('Ticker Widget', () => {
  const DEFAULT_MARKET = { asset: 'BTC' };

  const renderWidget = (products: IProduct[]) =>
    render(
      <ProductsContextProvider value={products}>
        <TickerWidgetLayout defaultMarket={DEFAULT_MARKET} />
      </ProductsContextProvider>,
    );

  const setItemLocalStorageSpy = jest.spyOn(window.localStorage, 'setItem');

  beforeEach(() => {
    mockedGetProducts.mockClear();
    mockedOnMiniTickerShorten.mockClear();

    mockedGetProducts.mockResolvedValueOnce(products);
    mockedGetProducts.mockRejectedValue('Fetch error');
    mockedOnMiniTickerShorten.mockImplementationOnce((listener) =>
      listener(ticker),
    );

    setItemLocalStorageSpy.mockClear();
  });

  it('show default market on load', () => {
    renderWidget(products);

    expect(mockedGetProducts).toHaveBeenCalledTimes(1);

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

    UserEvent.hover(screen.getByRole('tooltip', { name: /ALTS/i }));
    UserEvent.click(screen.getByRole('button', { name: /ETH/i }));

    expect(screen.getByText('DASH/ETH')).toBeInTheDocument();
    expect(screen.getByText('ENG/ETH')).toBeInTheDocument();
    expect(screen.queryByText('BNB/BTC')).not.toBeInTheDocument();
    expect(screen.queryByText('TRX/XRP')).not.toBeInTheDocument();
  });

  it('show products list on select all ALTS markets', () => {
    renderWidget(products);

    UserEvent.hover(screen.getByRole('tooltip', { name: /ALTS/i }));
    UserEvent.click(screen.getByRole('button', { name: /ALTS/i }));

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

  it('show default connected status', () => {
    renderWidget(products);
    UserEvent.click(screen.getByRole('button', { name: 'Connecting...' }));
  });

  it('on click on disconnect button then stop updates', () => {
    mockedOnChangeStatus.mockImplementationOnce((listener) =>
      listener(WebsocketReadyState.OPEN),
    );
    renderWidget(products);

    UserEvent.click(screen.getByRole('button', { name: 'Disconnect' }));

    expect(
      screen.getByRole('button', { name: 'Disconnecting...' }),
    ).toBeInTheDocument();
  });

  it('on click on connect button then start updates', async () => {
    mockedOnChangeStatus.mockImplementationOnce((listener) => {
      listener(WebsocketReadyState.CLOSED);
      setTimeout(() => listener(WebsocketReadyState.OPEN), 10);
    });

    renderWidget(products);

    UserEvent.click(screen.getByRole('button', { name: 'Connect' }));

    expect(
      await screen.findByRole('button', { name: 'Disconnect' }),
    ).toBeInTheDocument();
  });

  it.skip('show error message if products request is broken', () => {
    mockedGetProducts.mockClear();
    mockedGetProducts.mockRejectedValueOnce('Fetch error');
    renderWidget([]);

    console.log(mockedGetProducts);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('BNB/BTC')).not.toBeInTheDocument();
  });
});
