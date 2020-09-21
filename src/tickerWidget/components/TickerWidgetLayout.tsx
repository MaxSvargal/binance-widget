import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { IActiveMarketState, SortBy, SortByRadioGroup } from '..';

import { productsContext } from '../contexts/productsContexts';
import { getProducts } from '../repos/binanceRepo';
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
  const [, setProducts] = useContext(productsContext);

  const [activeMarket, setActiveMarket] = useState<IActiveMarketState>(
    defaultMarket,
  );

  const [searchValue, setSearchValue] = useState('');

  const [activeSortBy, setActiveSortBy] = useState(SortBy.ChangeDesc);

  const [activeSortButton, setActiveSortButton] = useState(
    SortByRadioGroup.Change,
  );

  const onChangeSortButton = useCallback((value: SortByRadioGroup) => {
    setActiveSortButton(value);

    switch (value) {
      case SortByRadioGroup.Volume:
        return setActiveSortBy(SortBy.VolumeDesc);
      default:
        return setActiveSortBy(SortBy.VolumeDesc);
    }
  }, []);

  const onChangeMarket = useCallback(setActiveMarket, []);

  const onSearch = useCallback((value: string) => setSearchValue(value), []);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => {
        console.error({ err });
        /* setError() */
      });
  }, [setProducts]);

  const onChangeSort = useCallback((value: SortBy) => {
    setActiveSortBy(value);
  }, []);

  const [isActiveFavorite, setIsActiveFavorite] = useState(false);

  const onChangeToFavorite = useCallback(() => setIsActiveFavorite(true), []);

  useEffect(() => {
    setIsActiveFavorite(false);
  }, [activeMarket]);

  return (
    <>
      <MarketsMenu
        onChange={onChangeMarket}
        onChangeToFavorite={onChangeToFavorite}
      />
      <div>
        <SearchField value={searchValue} onChange={onSearch} />
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
    </>
  );
};
