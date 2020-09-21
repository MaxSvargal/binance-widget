import React, { FC, useCallback, useMemo, useState } from 'react';
import { IActiveMarketState } from '..';
import { MarketButton } from './MarketButton';

import styles from './MarketDropdownButton.module.css';

interface IMarketDropdownButtonProps {
  activeMarket: IActiveMarketState;
  children: string;
  values: string[];
  onSelect: (value: string) => void;
  onSelectAll: (value: string) => void;
}

export const MarketDropdownButton: FC<IMarketDropdownButtonProps> = ({
  activeMarket,
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
      activeMarket.group === children ||
      (activeMarket?.asset && values.includes(activeMarket.asset)),
    [activeMarket, values, children],
  );

  return (
    <div
      onMouseEnter={toggleDropdown(true)}
      onMouseLeave={toggleDropdown(false)}
    >
      <div
        role="tooltip"
        className={`${styles.title} ${isActive && styles.titleActive}`}
      >
        {isActive && !activeMarket.group
          ? values.find((v) => v === activeMarket.asset)
          : children}
      </div>
      <div
        className={`${styles.dropdown} ${
          styles[showDropdown ? 'visible' : 'hidden']
        }`}
      >
        <MarketButton
          active={activeMarket.group === children}
          onClick={onSelectAllHandle}
        >
          &#9868; {children}
        </MarketButton>
        {values.map((value) => (
          <MarketButton
            key={value}
            active={activeMarket.asset === value}
            onClick={onClickHandle(value)}
          >
            &#x2500; {value}
          </MarketButton>
        ))}
      </div>
    </div>
  );
};
