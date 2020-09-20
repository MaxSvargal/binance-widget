import React, { FC, useCallback, useEffect } from 'react';

import { binanceSocketRepo, SortBy, SortByRadioGroup } from '../';
import { getPerc, useProductsSort } from '../hooks/useProductsSort';
import { useTickerReducer } from '../hooks/useTickerReducer';
import { IProduct } from '../interfaces/products';
import { IMiniTickerShorten } from '../interfaces/ticker';
import { ProductsTableRow } from './ProductsTableRow';

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

  const getChangePerc = useCallback(
    (
      product: IProduct,
      tickersMap: Map<string, IMiniTickerShorten>,
    ): string => {
      if (tickersMap.has(product.s)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const model = tickersMap.get(product.s)!;
        // console.log({ model }, parseFloat(model.o, 10), parseInt(model.c, 10));
        return getPerc(parseFloat(model.o), parseFloat(model.c)).toFixed(2);
      } else {
        return getPerc(product.o, product.c).toFixed(2);
      }
    },
    [],
  );

  const getVolumeValue = useCallback(
    (
      product: IProduct,
      tickersMap: Map<string, IMiniTickerShorten>,
    ): string => {
      if (tickersMap.has(product.s)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const model = tickersMap.get(product.s)!;
        return model.v;
      } else {
        return product.v.toFixed(2);
      }
    },
    [],
  );

  return (
    <div>
      {products.map((product) => (
        <ProductsTableRow
          key={product.s}
          value={product}
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
