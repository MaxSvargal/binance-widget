import { useContext } from 'react';
// import useMappedState from '../../shared/hooks/useMappedState';
// import { productsContext } from '../contexts/productsContexts';
// import { IProduct } from '../interfaces/products';

// const selectProductsByParent = (
//   products: Array<IProduct>,
//   market: string,
// ): IProduct[] => products.filter((product) => product.pm === market);

// export const useProducts = () => {
//   const [products] = useContext(productsContext);
//   const [state, setState, []] = useMappedState(products, [
//     selectProductsByParent,
//   ]);
// };

// interface IProductsState {
//   BNB: IProduct[];
//   BTC: IProduct[];
//   ALTS: {
//     ETH: IProduct[];
//     XRP: IProduct[];
//   };
//   FIAT: {
//     USDT: IProduct[];
//   };
// }
