import { useCallback, useEffect, useState } from 'react';
import { IActiveMarketState } from '../interfaces/markets';

export const useShowFavoriteState = (
  activeMarket: IActiveMarketState,
): readonly [boolean, () => void] => {
  const [isActiveFavorite, setIsActiveFavorite] = useState(false);

  const onChangeToFavorite = useCallback(() => setIsActiveFavorite(true), []);

  useEffect(() => {
    setIsActiveFavorite(false);
  }, [activeMarket]);

  return [isActiveFavorite, onChangeToFavorite] as const;
};
