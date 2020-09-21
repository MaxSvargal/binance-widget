import { useEffect } from 'react';
import { binanceSocketRepo } from '..';
import { IState, useTickerReducer } from './useTickerReducer';

export const useTicker = (): IState => {
  const [tickersMap, dispatchUpdateTicker] = useTickerReducer();

  useEffect(() => {
    binanceSocketRepo.onMiniTickerShorten(dispatchUpdateTicker);
    return () => binanceSocketRepo.close();
    /* eslint react-hooks/exhaustive-deps: 0 */
  }, []);

  return tickersMap;
};
