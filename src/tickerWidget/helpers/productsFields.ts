import { numberPrettify } from '../../shared/helpers/numbers';
import { IProduct } from '../interfaces/products';
import { IMiniTickerShorten } from '../interfaces/ticker';

// move to components

export const getRatio = (x: number, y: number): number => ((y - x) / x) * 100;

export const getProductField = (
  left: (product: IProduct) => string,
  right: (ticker: IMiniTickerShorten) => string,
) => (
  product: IProduct,
  tickersMap: Map<string, IMiniTickerShorten>,
): string => {
  if (tickersMap.has(product.s)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const model = tickersMap.get(product.s)!;
    return right(model);
  } else {
    return left(product);
  }
};

export const getChangeRatio = getProductField(
  (product) => getRatio(product.o, product.c).toFixed(2),
  (ticker) => getRatio(parseFloat(ticker.o), parseFloat(ticker.c)).toFixed(2),
);

export const getVolumeValue = getProductField(
  (product) => product.v.toFixed(0),
  (ticker) => parseInt(ticker.v).toString(),
);

export const getLastPrice = getProductField(
  (product) => numberPrettify(product.c),
  (ticker) => numberPrettify(parseFloat(ticker.c)),
);
