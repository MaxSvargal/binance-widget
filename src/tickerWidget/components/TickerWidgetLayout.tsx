import React, { FC, useContext, useEffect, useState } from 'react';

import { productsContext } from '../contexts/productsContexts';
import { useShowFavoriteState } from '../hooks/useShowFavoriteState';
import { useStateSortBy } from '../hooks/useStateSortBy';
import { IActiveMarketState } from '../interfaces/markets';

import { getProducts } from '../repos/binanceRepo';

import { ConnectToggleBtn } from './ConnectToggleBtn';
import { MarketsMenu } from './MarketsMenu';
import { ProductsTable } from './ProductsTable';
import { SearchField } from './SearchField';
import { SortByColumn } from './SortByColumn';
import { SortByRadio } from './SortByRadio';

import styles from './TickerWidgetLayout.module.css';

interface ITickerWidgetLayoutProps {
  defaultMarket: IActiveMarketState;
}

export const TickerWidgetLayout: FC<ITickerWidgetLayoutProps> = ({
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
        <SortByRadio value={activeSortButton} onChange={onChangeSortButton} />
      </div>
      <div className={styles.productsTable}>
        <div className={styles.sortByRow}>
          <SortByColumn
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
