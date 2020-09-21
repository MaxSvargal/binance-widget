import React, { FC, useContext, useEffect, useState } from 'react';
import { IActiveMarketState } from '..';

import { productsContext } from '../contexts/productsContexts';
import { useShowFavoriteState } from '../hooks/useShowFavoriteState';
import { useStateSortBy } from '../hooks/useStateSortBy';

import { getProducts } from '../repos/binanceRepo';

import { ConnectToggleBtn } from './ConnectToggleBtn';
import { ErrorConnection } from './ErrorConnection';
import { MarketsMenu } from './MarketsMenu';
import { ProductsTable } from './productsTable/ProductsTable';
import { SearchField } from './SearchField';
import { SortByColumn } from './SortByColumn';
import { SortByRadio } from './SortByRadio';

interface ITickerWidgetLayoutProps {
  defaultMarket: IActiveMarketState;
}

export const TickerWidgetLayout: FC<ITickerWidgetLayoutProps> = ({
  defaultMarket,
}) => {
  const [error, setError] = useState<Error | undefined>();

  const [, setProducts] = useContext(productsContext);

  useEffect(() => {
    getProducts().then(setProducts).catch(setError);
  }, [setProducts]);

  const [activeMarket, setActiveMarket] = useState<IActiveMarketState>(
    defaultMarket,
  );

  const [searchValue, setSearchValue] = useState('');

  const {
    activeSortBy,
    activeSortButton,
    onChangeSort,
    onChangeSortButton,
  } = useStateSortBy();

  const [isActiveFavorite, onChangeToFavorite] = useShowFavoriteState(
    activeMarket,
  );

  return error ? (
    <ErrorConnection />
  ) : (
    <>
      <MarketsMenu
        onChange={setActiveMarket}
        onChangeToFavorite={onChangeToFavorite}
      />
      <div>
        <SearchField value={searchValue} onChange={setSearchValue} />
        <SortByRadio value={activeSortButton} onChange={onChangeSortButton} />
      </div>
      <SortByColumn
        sortBy={activeSortBy}
        extraColumn={activeSortButton}
        onChange={onChangeSort}
      />
      <ProductsTable
        search={searchValue}
        showFavorite={isActiveFavorite}
        sortBy={activeSortBy}
        extraColumn={activeSortButton}
        activeMarket={activeMarket}
      />
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <ConnectToggleBtn />
      </div>
    </>
  );
};
