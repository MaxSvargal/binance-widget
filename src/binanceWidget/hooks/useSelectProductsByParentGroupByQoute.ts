import { useMemo } from 'react';

import { groupBy } from '../../shared/helpers/objects';
import { IProduct } from '../interfaces/products';
import { useSelectProductsByParent } from './useSelectProductsByParent';

export const useSelectProductsByParentGroupByQoute = (
  products: Array<IProduct>,
  market: string,
): Record<string, IProduct[]> => {
  const filtered = useSelectProductsByParent(products, market);
  return useMemo(() => groupBy(filtered, 'q'), [filtered]);
};
