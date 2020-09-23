import React, { FC, HTMLAttributes } from 'react';

import styles from './ProductsTableCell.module.css';

export const ProductsTableCell: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => <div className={[styles.container, className].join(' ')} {...rest} />;
