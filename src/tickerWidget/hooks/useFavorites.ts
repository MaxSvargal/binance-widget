import { useCallback, useMemo } from 'react';

import { useLocalStorageState } from '../hooks/useLocalStorage';
import { IProduct } from '../interfaces/products';

export const useFavorites = (
  products: IProduct[],
): readonly [string[], IProduct[], (symbol: string) => () => void] => {
  const [favoritesSymbols, setFavoritesSymbols] = useLocalStorageState<
    string[]
  >('favorites', []);

  const favoritesProducts = useMemo<IProduct[]>(
    () => products.filter((p) => favoritesSymbols.includes(p.s)),
    [products, favoritesSymbols],
  );

  const onToggleFavorite = useCallback(
    (symbol: string) => () =>
      setFavoritesSymbols(
        favoritesSymbols.includes(symbol)
          ? favoritesSymbols.filter((s) => s !== symbol)
          : [...favoritesSymbols, symbol],
      ),
    /* eslint react-hooks/exhaustive-deps: 0 */
    [favoritesSymbols],
  );

  return [favoritesSymbols, favoritesProducts, onToggleFavorite] as const;
};
