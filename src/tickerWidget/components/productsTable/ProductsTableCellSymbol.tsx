import React, { FC } from 'react';

import { FavoriteBtn } from './FavoriteBtn';
import { ProductsTableCell } from './ProductsTableCell';

interface IProps {
  children: string | string[];
  isFavorite: boolean;
  onFavorite(): void;
}

export const ProductsTableCellSymbol: FC<IProps> = ({
  children,
  isFavorite,
  onFavorite,
}) => {
  return (
    <ProductsTableCell>
      <FavoriteBtn active={isFavorite} onClick={onFavorite} />
      <div role="cell">{children}</div>
    </ProductsTableCell>
  );
};
