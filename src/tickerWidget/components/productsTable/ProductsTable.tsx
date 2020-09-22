import React, { FC, useContext } from 'react';

import { SortBy, SortByRadioGroup } from '../..';
import { productsContext } from '../../contexts/productsContexts';
import {
  getChangeRatio,
  getLastPrice,
  getVolumeValue,
} from '../../helpers/productsFields';
import { useFavorites } from '../../hooks/useFavorites';
import { useProductsSearch } from '../../hooks/useProductsSearch';
import { useProductsSort } from '../../hooks/useProductsSort';
import { useSelectProductsByMarket } from '../../hooks/useSelectProductsByMarket';
import { useTicker } from '../../hooks/useTicker';
import { IActiveMarketState } from '../../interfaces/markets';

import { ProductsTableCell } from './ProductsTableCell';
import { ProductsTableCellChange } from './ProductsTableCellChange';
import { ProductsTableCellSymbol } from './ProductsTableCellSymbol';

import styles from './ProductsTable.module.css';

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
  const tickersMap = useTicker();

  const [favoritesSymbols, favoritesProducts, onToggleFavorite] = useFavorites(
    products,
  );
  const marketProducts = useSelectProductsByMarket(products, activeMarket);
  const findedProducts = useProductsSearch(products, search);

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
        <div key={product.s} role="row" className={styles.container}>
          <ProductsTableCellSymbol
            isFavorite={favoritesSymbols.includes(product.s)}
            onFavorite={onToggleFavorite(product.s)}
          >
            {product.b}/{product.q}
          </ProductsTableCellSymbol>

          <ProductsTableCell>
            {getLastPrice(product, tickersMap)}
          </ProductsTableCell>

          {extraColumn === SortByRadioGroup.Change ? (
            <ProductsTableCellChange
              isPositive={parseFloat(getChangeRatio(product, tickersMap)) >= 0}
            >
              {getChangeRatio(product, tickersMap)}
            </ProductsTableCellChange>
          ) : (
            <ProductsTableCell>
              {getVolumeValue(product, tickersMap)}
            </ProductsTableCell>
          )}
        </div>
      ))}
    </>
  );
};
