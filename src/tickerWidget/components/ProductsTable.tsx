import React, { FC, useContext } from 'react';

import { productsContext } from '../contexts/productsContext';
import { useSelectProductsByMarket } from '../hooks/useSelectProductsByMarket';
import { useSelectProductsByParent } from '../hooks/useSelectProductsByParent';
import { IActiveMarketState } from './TickerWidgetLayout';

interface IProductsTableProps {
  market: IActiveMarketState;
}

export const ProductsTable: FC<IProductsTableProps> = ({ market }) => {
  const [products] = useContext(productsContext);

  // const altsProducts = useSelectProductsByMarket(products, market.asset);
  // const parentProducts = useSelectProductsByParent(products, market.group);
  const values = useSelectProductsByMarket(products, market);

  console.log({ market, values });
  return (
    <div>
      {values.map((product) => (
        <div key={product.s}>
          <span>
            {product.b}/{product.q}
          </span>
        </div>
      ))}
    </div>
  );
};
