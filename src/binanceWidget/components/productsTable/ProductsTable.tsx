import React, { FC, useContext } from 'react';

import { SortBy, SortByRadioGroup } from '../..';
import { productsContext } from '../../contexts/productsContexts';
import { useFavorites } from '../../hooks/useFavorites';
import { useProductsSearch } from '../../hooks/useProductsSearch';
import { useProductsSort } from '../../hooks/useProductsSort';
import { useSelectProductsByMarket } from '../../hooks/useSelectProductsByMarket';
import { IActiveMarketState } from '../../interfaces/markets';
import { ProductsTableRow } from './ProductsTableRow';

export interface IProductsTableProps {
  search: string;
  sortBy: SortBy;
  extraColumn: SortByRadioGroup;
  showFavorite: boolean;
  activeMarket: IActiveMarketState;
}

export const ProductsTable: FC<IProductsTableProps> = ({
  search,
  sortBy,
  extraColumn,
  showFavorite,
  activeMarket,
}) => {
  const [products] = useContext(productsContext);

  const marketProducts = useSelectProductsByMarket(products, activeMarket);
  const findedProducts = useProductsSearch(products, search);

  const [favoritesSymbols, favoritesProducts, onToggleFavorite] = useFavorites(
    products,
  );

  const values = useProductsSort(
    search === ''
      ? showFavorite
        ? favoritesProducts
        : marketProducts
      : findedProducts,
    sortBy,
  );

  return (
    <>
      {values.map((product) => (
        <ProductsTableRow
          key={product.s}
          product={product}
          extraColumn={extraColumn}
          isFavorite={favoritesSymbols.includes(product.s)}
          onToggleFavorite={onToggleFavorite(product.s)}
        />
      ))}
    </>
  );
};
