import React, { FC, useCallback } from 'react';
import { SortBy, SortByRadioGroup } from '..';

import styles from './SortByColumn.module.css';

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

  return (
    <div className={styles.row}>
      <button onClick={onSortByPair} className={styles.cell}>
        Pair
      </button>
      <button onClick={onSortByPrice} className={styles.cell}>
        Last Price
      </button>
      <button
        onClick={
          extraColumn === SortByRadioGroup.Change
            ? onSortByChange
            : onSortByVolume
        }
        className={styles.cell}
        style={{ flex: 0.5 }}
      >
        {extraColumn === SortByRadioGroup.Change ? 'Change' : 'Volume'}
      </button>
    </div>
  );
};
