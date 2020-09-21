import React, { FC, useContext } from 'react';

import { IActiveMarketState, SortBy, SortByRadioGroup } from '..';
import { productsContext } from '../contexts/productsContexts';
import {
  getChangeRatio,
  getLastPrice,
  getVolumeValue,
} from '../helpers/productsFields';
import { useFavorites } from '../hooks/useFavorites';
import { useProductsSearch } from '../hooks/useProductsSearch';
import { useProductsSort } from '../hooks/useProductsSort';
import { useSelectProductsByMarket } from '../hooks/useSelectProductsByMarket';
import { useTicker } from '../hooks/useTicker';
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
    <div>
      {values.map((product) => (
        /* Split into multiple components i.e. Price, Volume and use context */
        <ProductsTableRow
          key={product.s}
          symbol={`${product.b}/${product.q}`}
          price={getLastPrice(product, tickersMap)}
          extra={
            extraColumn === SortByRadioGroup.Change
              ? getChangeRatio(product, tickersMap)
              : getVolumeValue(product, tickersMap)
          }
          showPercent={extraColumn === SortByRadioGroup.Change}
          onFavorite={onToggleFavorite(product.s)}
          isFavorite={favoritesSymbols.includes(product.s)}
        />
      ))}
    </div>
  );
};
