import React, { FC, useCallback, useContext } from 'react';

import { productsContext } from '../contexts/productsContexts';
import { useSelectProductsByParentGroupByQoute } from '../hooks/useSelectProductsByParentGroupByQoute';
import { MarketButton } from './MarketButton';
import { MarketDropdownButton } from './MarketDropdownButton';
import { IActiveMarketState } from '..';

import styles from './MarketsMenu.module.css';

interface IMarketsMenuProps {
  isActiveFavorite: boolean;
  activeMarket: IActiveMarketState;
  onChange(market: IActiveMarketState): void;
  onChangeToFavorite(): void;
}

export const MarketsMenu: FC<IMarketsMenuProps> = ({
  isActiveFavorite,
  activeMarket,
  onChange,
  onChangeToFavorite,
}) => {
  const [products] = useContext(productsContext);
  const altsProducts = useSelectProductsByParentGroupByQoute(products, 'ALTS');
  const fiatProducts = useSelectProductsByParentGroupByQoute(products, 'USDⓈ');

  const onSelectMarket = useCallback(
    (market: string) => () => {
      onChange({ asset: market });
    },
    [onChange],
  );

  const onSelectDropdownMarket = useCallback(
    (quoteAsset: string) => onChange({ asset: quoteAsset }),
    [onChange],
  );

  const onSelectAllDropdownMarkets = useCallback(
    (quoteAsset: string) => {
      onChange({ group: quoteAsset });
    },
    [onChange],
  );

  return (
    <div className={styles.container}>
      <MarketButton active={isActiveFavorite} onClick={onChangeToFavorite}>
        Favorite
      </MarketButton>
      <MarketButton
        active={!isActiveFavorite && activeMarket.asset === 'BNB'}
        onClick={onSelectMarket('BNB')}
      >
        BNB
      </MarketButton>
      <MarketButton
        active={!isActiveFavorite && activeMarket.asset === 'BTC'}
        onClick={onSelectMarket('BTC')}
      >
        BTC
      </MarketButton>
      <MarketDropdownButton
        values={Object.keys(altsProducts)}
        activeMarket={activeMarket}
        isActiveFavorite={isActiveFavorite}
        onSelect={onSelectDropdownMarket}
        onSelectAll={onSelectAllDropdownMarkets}
      >
        ALTS
      </MarketDropdownButton>
      <MarketDropdownButton
        values={Object.keys(fiatProducts)}
        activeMarket={activeMarket}
        isActiveFavorite={isActiveFavorite}
        onSelect={onSelectDropdownMarket}
        onSelectAll={onSelectAllDropdownMarkets}
      >
        FIAT
      </MarketDropdownButton>
    </div>
  );
};
