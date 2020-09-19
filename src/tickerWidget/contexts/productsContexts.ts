import { IProduct } from '../interfaces/products';
import { makeStateContext } from '../../shared/contexts/makeStateContext';

export const [productsContext, ProductsContextProvider] = makeStateContext<
  Array<IProduct>
>([]);

export const [tickerContext, TickerContextProvider] = makeStateContext<
  Map<string, IProduct>
>(new Map());
