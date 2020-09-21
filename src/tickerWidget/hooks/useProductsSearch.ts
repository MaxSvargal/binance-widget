import { useEffect, useState } from 'react';
import { IProduct } from '../interfaces/products';

export const useProductsSearch = (
  products: IProduct[],
  search: string,
): IProduct[] => {
  const [findedProducts, setFindedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setFindedProducts(
      products.filter((product) => product.s.includes(search.toUpperCase())),
    );
    /* eslint react-hooks/exhaustive-deps: 0 */
  }, [search]);

  return findedProducts;
};
