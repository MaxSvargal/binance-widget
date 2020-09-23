import React, { FC } from 'react';

import { ProductsTableCell } from './ProductsTableCell';

import styles from './ProductsTableCellChange.module.css';

interface IProps {
  children: number;
}

export const ProductsTableCellChange: FC<IProps> = ({ children: value }) => (
  <ProductsTableCell className={`${value > 0 ? styles.green : styles.orange}`}>
    {value > 0 && '+'}
    {value.toFixed(2)}%
  </ProductsTableCell>
);
