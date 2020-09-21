import React, { FC, useCallback, useState } from 'react';

interface IMarketDropdownButtonProps {
  children: string;
  values: string[];
  onSelect: (value: string) => void;
  onSelectAll: (value: string) => void;
}

export const MarketDropdownButton: FC<IMarketDropdownButtonProps> = ({
  onSelect,
  onSelectAll,
  children,
  values,
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

  return (
    <div
      onMouseEnter={toggleDropdown(true)}
      onMouseLeave={toggleDropdown(false)}
    >
      <div role="tooltip">{children}</div>
      <div style={{ visibility: showDropdown ? 'visible' : 'hidden' }}>
        <button onClick={onSelectAllHandle}>{children}</button>
        {values.map((value) => (
          <button key={value} onClick={onClickHandle(value)}>
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};
