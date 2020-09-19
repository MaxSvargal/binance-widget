import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { IActiveMarketState, SortBy } from '..';

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

  const [activeSortBy, setActiveSortBy] = useState<SortBy>(SortBy.ChangeAsc);

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
    console.log('effect');
    getProducts()
      .then((p) => {
        console.log({ p });
        setProducts(p);
      })
      .catch((err) => {
        console.error({ err });
        /* setError() */
      });
  }, [setProducts]);

  // console.log({ searchValue, findedProducts });

  const onChangeSort = useCallback((value: SortBy) => {
    setActiveSortBy(value);
  }, []);

  const productsValues = searchValue === '' ? values : findedProducts;

  return (
    <>
      <MarketsMenu onChange={onChangeMarket} />
      <div>
        <SearchField onChange={onSearch} value={searchValue} />
        <SortByRadio onChange={onChangeSort} />
      </div>
      <SortByColumn sortBy={activeSortBy} />
      <ProductsTable values={productsValues} />
    </>
  );
};
