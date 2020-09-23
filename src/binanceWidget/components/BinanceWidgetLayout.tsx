import React, { FC, useContext, useEffect, useState } from 'react';
import { binanceSocketRepo } from '..';

import { productsContext } from '../contexts/productsContexts';
import { useShowFavoriteState } from '../hooks/useShowFavoriteState';
import { useStateSortBy } from '../hooks/useStateSortBy';
import { IActiveMarketState } from '../interfaces/markets';

import { getProducts } from '../repos/binanceRepo';

import { ConnectToggleBtn } from './ConnectToggleBtn';
import { MarketsMenu } from './marketsMenu/MarketsMenu';
import { ProductsHeaderSortBy } from './productsHeaderSortBy/ProductsHeaderSortBy';
import { ProductsTable } from './productsTable/ProductsTable';
import { SearchField } from './search/SearchField';
import { SortRadioControls } from './sortRadioControls/SortRadioControls';

import styles from './BinanceWidgetLayout.module.css';

interface ITickerWidgetLayoutProps {
  defaultMarket: IActiveMarketState;
}

export const BinanceWidgetLayout: FC<ITickerWidgetLayoutProps> = ({
  defaultMarket,
}) => {
  const [, setProducts] = useContext(productsContext);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => {
        console.log(err);
        // setError(err) if needed
      });
  }, [setProducts]);

  // Close websocket connection on unmount main component
  useEffect(() => () => binanceSocketRepo.close(), []);

  const [activeMarket, setActiveMarket] = useState<IActiveMarketState>(
    defaultMarket,
  );

  const [isActiveFavorite, onChangeToFavorite] = useShowFavoriteState(
    activeMarket,
  );

  const [searchValue, setSearchValue] = useState('');

  const {
    activeSortBy,
    activeSortButton,
    onChangeSort,
    onChangeSortButton,
  } = useStateSortBy();

  return (
    <div className={styles.container}>
      <div className={styles.marketsMenuBox}>
        <MarketsMenu
          isActiveFavorite={isActiveFavorite}
          activeMarket={activeMarket}
          onChange={setActiveMarket}
          onChangeToFavorite={onChangeToFavorite}
        />
      </div>
      <div className={styles.searchAndSortBox}>
        <SearchField value={searchValue} onChange={setSearchValue} />
        <SortRadioControls
          value={activeSortButton}
          onChange={onChangeSortButton}
        />
      </div>
      <div className={styles.productsTable}>
        <div className={styles.sortByRow}>
          <ProductsHeaderSortBy
            sortBy={activeSortBy}
            extraColumn={activeSortButton}
            onChange={onChangeSort}
          />
        </div>
        <ProductsTable
          search={searchValue}
          showFavorite={isActiveFavorite}
          sortBy={activeSortBy}
          extraColumn={activeSortButton}
          activeMarket={activeMarket}
        />
      </div>
      <ConnectToggleBtn />
    </div>
  );
};
