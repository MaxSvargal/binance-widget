import { useCallback, useEffect, useState } from 'react';
import { binanceSocketRepo } from '..';
import { IProduct } from '../interfaces/products';
import { IMiniTickerShorten } from '../interfaces/ticker';

export const useTickerSymbolState = (product: IProduct): IMiniTickerShorten => {
  const [value, setValue] = useState<IMiniTickerShorten>({
    // TODO: Refactor, use model instead
    s: product.s,
    c: product.c.toString(),
    o: product.o.toString(),
    v: product.v.toString(),
  });

  const onUpdate = useCallback(
    (tickerData: IMiniTickerShorten[]) => {
      const currentTicker = tickerData.find((ticker) => ticker.s === product.s);
      if (currentTicker) setValue(currentTicker);
    },
    [product.s],
  );

  useEffect(
    () => binanceSocketRepo.onMiniTickerShorten(onUpdate),
    /* eslint react-hooks/exhaustive-deps: 0 */
    [],
  );

  return value;
};
