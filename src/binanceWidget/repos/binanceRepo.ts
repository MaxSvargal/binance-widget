import { IProduct } from '../interfaces/products';

const BINANCE_API_PATH = 'https://www.binance.com/exchange-api/v1';

const getPath = (path: string) => `${BINANCE_API_PATH}${path}`;

export const getProducts = (): Promise<IProduct[]> =>
  fetch(getPath('/public/asset-service/product/get-products'))
    .then((resp) => resp.json())
    .then((json) => json.data);
