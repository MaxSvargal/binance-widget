import React, { FC } from 'react';

import { ProductsTableCell } from './ProductsTableCell';

import styles from './ProductsTableCellChange.module.css';

interface IProps {
  children: string | string[];
  isPositive: boolean;
}

export const ProductsTableCellChange: FC<IProps> = ({
  children,
  isPositive,
}) => (
  <ProductsTableCell className={`${isPositive ? styles.green : styles.orange}`}>
    {isPositive && '+'}
    {children}%
  </ProductsTableCell>
);
