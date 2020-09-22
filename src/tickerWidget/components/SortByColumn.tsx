import React, { FC, useCallback, useMemo } from 'react';
import { SortBy, SortByRadioGroup } from '..';

import styles from './SortByColumn.module.css';
import { SortByColumnCell } from './SortByColumnCell';

interface IProps {
  sortBy: SortBy;
  extraColumn: SortByRadioGroup;
  onChange(value: SortBy): void;
}

const useSortCallback = (
  onChange: (by: SortBy) => void,
  sortBy: SortBy,
  [ask, desc]: [SortBy, SortBy],
) =>
  useCallback(() => onChange(sortBy === desc ? ask : desc), [
    ask,
    desc,
    onChange,
    sortBy,
  ]);

export const SortByColumn: FC<IProps> = ({ sortBy, extraColumn, onChange }) => {
  const onSortByPair = useSortCallback(onChange, sortBy, [
    SortBy.PairAsc,
    SortBy.PairDesc,
  ]);
  const onSortByPrice = useSortCallback(onChange, sortBy, [
    SortBy.PriceAsc,
    SortBy.PriceDesc,
  ]);
  const onSortByChange = useSortCallback(onChange, sortBy, [
    SortBy.ChangeAsc,
    SortBy.ChangeDesc,
  ]);
  const onSortByVolume = useSortCallback(onChange, sortBy, [
    SortBy.VolumeAsc,
    SortBy.VolumeDesc,
  ]);

  const activeExtraIsChange = useMemo(
    () => extraColumn === SortByRadioGroup.Change,
    [extraColumn],
  );

  return (
    <div className={styles.row}>
      <SortByColumnCell
        onClick={onSortByPair}
        isSortedUp={SortBy.PairAsc === sortBy}
        isSortedDown={SortBy.PairDesc === sortBy}
      >
        Pair
      </SortByColumnCell>
      <SortByColumnCell
        onClick={onSortByPrice}
        isSortedUp={SortBy.PriceAsc === sortBy}
        isSortedDown={SortBy.PriceDesc === sortBy}
      >
        Last Price
      </SortByColumnCell>
      <div style={{ flex: 0.5 }}>
        {activeExtraIsChange ? (
          <SortByColumnCell
            onClick={onSortByChange}
            isSortedUp={SortBy.ChangeAsc === sortBy}
            isSortedDown={SortBy.ChangeDesc === sortBy}
          >
            Change
          </SortByColumnCell>
        ) : (
          <SortByColumnCell
            onClick={onSortByVolume}
            isSortedUp={SortBy.VolumeAsc === sortBy}
            isSortedDown={SortBy.VolumeDesc === sortBy}
          >
            Volume
          </SortByColumnCell>
        )}
      </div>
    </div>
  );
};
