import React, { FC, useCallback, useMemo, useState } from 'react';
import { IActiveMarketState } from '../interfaces/markets';
import { MarketButton } from './MarketButton';

import styles from './MarketDropdownButton.module.css';

interface IMarketDropdownButtonProps {
  activeMarket: IActiveMarketState;
  isActiveFavorite: boolean;
  children: string;
  values: string[];
  onSelect: (value: string) => void;
  onSelectAll: (value: string) => void;
}

export const MarketDropdownButton: FC<IMarketDropdownButtonProps> = ({
  activeMarket,
  isActiveFavorite,
  children,
  values,
  onSelect,
  onSelectAll,
}) => {
  const onClickHandle = useCallback((value: string) => () => onSelect(value), [
    onSelect,
  ]);

  const onSelectAllHandle = useCallback(() => onSelectAll(children), [
    children,
    onSelectAll,
  ]);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = useCallback(
    (value: boolean) => () => setShowDropdown(value),
    [],
  );

  const isActive = useMemo(
    () =>
      Boolean(
        !isActiveFavorite &&
          (activeMarket.group === children ||
            (activeMarket?.asset && values.includes(activeMarket.asset))),
      ),
    [isActiveFavorite, activeMarket, values, children],
  );

  const titleText = useMemo(
    () =>
      isActive && activeMarket.asset
        ? values.find((v) => v === activeMarket.asset)
        : children,
    [isActive],
  );

  return (
    <div
      onMouseEnter={toggleDropdown(true)}
      onMouseLeave={toggleDropdown(false)}
      className={styles.container}
    >
      <div
        role="tooltip"
        className={`${styles.title} ${isActive && styles.titleActive}`}
      >
        {titleText}
      </div>
      <div className={`${styles.dropdown} ${!showDropdown && styles.hidden}`}>
        <MarketButton
          active={isActive && activeMarket.group === children}
          variant="horizontalList"
          onClick={onSelectAllHandle}
        >
          &#9868; {children}
        </MarketButton>
        {values.map((value) => (
          <MarketButton
            key={value}
            active={isActive && activeMarket.asset === value}
            variant="horizontalList"
            onClick={onClickHandle(value)}
          >
            &#x2500; {value}
          </MarketButton>
        ))}
      </div>
    </div>
  );
};
