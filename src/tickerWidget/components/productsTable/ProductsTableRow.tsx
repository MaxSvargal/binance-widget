import React, { FC, HTMLAttributes } from 'react';

import { SortByRadioGroup } from '../..';
import { useTickerSymbolState } from '../../hooks/useTickerSymbolState';
import { IProduct } from '../../interfaces/products';

import { ProductsTableCell } from './ProductsTableCell';
import { ProductsTableCellChange } from './ProductsTableCellChange';
import { ProductsTableCellSymbol } from './ProductsTableCellSymbol';

import {
  getRatioOfStrings,
  numberPrettify,
} from '../../../shared/helpers/numbers';

import styles from './ProductsTableRow.module.css';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  product: IProduct;
  isFavorite: boolean;
  extraColumn: SortByRadioGroup;
  onToggleFavorite(): void;
}

export const ProductsTableRow: FC<IProps> = ({
  product,
  extraColumn,
  isFavorite,
  onToggleFavorite,
  ...rest
}) => {
  const ticker = useTickerSymbolState(product);

  return (
    <div role="row" className={styles.container} {...rest}>
      <ProductsTableCellSymbol
        isFavorite={isFavorite}
        onFavorite={onToggleFavorite}
      >
        {product.b}/{product.q}
      </ProductsTableCellSymbol>

      <ProductsTableCell>
        {numberPrettify(parseFloat(ticker.c))}
      </ProductsTableCell>

      <div style={{ flex: 0.5 }}>
        {extraColumn === SortByRadioGroup.Change ? (
          <ProductsTableCellChange>
            {getRatioOfStrings(ticker.o, ticker.c)}
          </ProductsTableCellChange>
        ) : (
          <ProductsTableCell>{parseInt(ticker.v).toString()}</ProductsTableCell>
        )}
      </div>
    </div>
  );
};
