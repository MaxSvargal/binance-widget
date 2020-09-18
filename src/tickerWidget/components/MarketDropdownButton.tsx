import React, { FC, useCallback } from 'react';

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

  return (
    <>
      <div>{children}</div>
      <div>
        <button onClick={onSelectAllHandle}>{children}</button>
        {values.map((value) => (
          <button key={value} onClick={onClickHandle(value)}>
            {value}
          </button>
        ))}
      </div>
    </>
  );
};
