import React, { FC, useEffect } from 'react';

import { binanceSocketRepo, SortBy, SortByRadioGroup } from '../';
import { useProductsSort } from '../hooks/useProductsSort';
import { useTickerReducer } from '../hooks/useTickerReducer';
import { IProduct } from '../interfaces/products';
import { ProductsTableRow } from './ProductsTableRow';
import {
  getChangePerc,
  getLastPrice,
  getVolumeValue,
} from '../helpers/productsFields';

interface IProductsTableProps {
  values: IProduct[];
  sortBy: SortBy;
  extraColumn: SortByRadioGroup;
}

export const ProductsTable: FC<IProductsTableProps> = ({
  values,
  sortBy,
  extraColumn,
}) => {
  const products = useProductsSort(values, sortBy);
  const [tickersMap, dispatchUpdateTicker] = useTickerReducer();

  useEffect(() => {
    binanceSocketRepo.onMiniTickerShorten(dispatchUpdateTicker);
    return () => binanceSocketRepo.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {products.map((product) => (
        <ProductsTableRow
          key={product.s}
          symbol={`${product.b}/${product.q}`}
          price={getLastPrice(product, tickersMap)}
          extra={
            extraColumn === SortByRadioGroup.Change
              ? getChangePerc(product, tickersMap)
              : getVolumeValue(product, tickersMap)
          }
        />
      ))}
    </div>
  );
};
