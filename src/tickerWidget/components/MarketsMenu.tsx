import React, { FC, useCallback, useContext } from 'react';

import { productsContext } from '../contexts/productsContexts';
import { useSelectProductsByParentGroupByQoute } from '../hooks/useSelectProductsByParentGroupByQoute';
import { MarketButton } from './MarketButton';
import { MarketDropdownButton } from './MarketDropdownButton';
import { IActiveMarketState } from '..';

interface IMarketsMenuProps {
  onChange(market: IActiveMarketState): void;
  onChangeToFavorite(): void;
}

export const MarketsMenu: FC<IMarketsMenuProps> = ({
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
    <div>
      <MarketButton onClick={onChangeToFavorite}>Favorite</MarketButton>
      <MarketButton onClick={onSelectMarket('BNB')}>BNB</MarketButton>
      <MarketButton onClick={onSelectMarket('BTC')}>BTC</MarketButton>
      <MarketDropdownButton
        values={Object.keys(altsProducts)}
        onSelect={onSelectDropdownMarket}
        onSelectAll={onSelectAllDropdownMarkets}
      >
        ALTS
      </MarketDropdownButton>
      <MarketDropdownButton
        values={Object.keys(fiatProducts)}
        onSelect={onSelectDropdownMarket}
        onSelectAll={onSelectAllDropdownMarkets}
      >
        FIAT
      </MarketDropdownButton>
    </div>
  );
};
