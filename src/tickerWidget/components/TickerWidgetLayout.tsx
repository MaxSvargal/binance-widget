import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { IActiveMarketState, SortBy, SortByRadioGroup } from '..';

import { productsContext } from '../contexts/productsContexts';
import { useSelectProductsByMarket } from '../hooks/useSelectProductsByMarket';
import { IProduct } from '../interfaces/products';
import { getProducts } from '../repos/binanceRepo';
import { MarketsMenu } from './MarketsMenu';
import { ProductsTable } from './ProductsTable';
import { SearchField } from './SearchField';
import { SortByColumn } from './SortByColumn';
import { SortByRadio } from './SortByRadio';

interface ITickerWidgetLayoutProps {
  defaultMarket: IActiveMarketState;
}

export const TickerWidgetLayout: FC<ITickerWidgetLayoutProps> = ({
  defaultMarket,
}) => {
  const [products, setProducts] = useContext(productsContext);

  const [activeMarket, setActiveMarket] = useState<IActiveMarketState>(
    defaultMarket,
  );

  const values = useSelectProductsByMarket(products, activeMarket);

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

  const [findedProducts, setFindedProducts] = useState<IProduct[]>([]);

  const onChangeMarket = useCallback(setActiveMarket, []);

  const onSearch = useCallback((value: string) => setSearchValue(value), []);

  useEffect(() => {
    setFindedProducts(
      // TODO: Take out
      products.filter((product) =>
        product.s.includes(searchValue.toUpperCase()),
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

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

  const productsValues = searchValue === '' ? values : findedProducts;

  return (
    <>
      <MarketsMenu onChange={onChangeMarket} />
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
        values={productsValues}
        sortBy={activeSortBy}
        extraColumn={activeSortButton}
      />
    </>
  );
};
