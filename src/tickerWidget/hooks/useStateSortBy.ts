import { useCallback, useState } from 'react';
import { SortBy, SortByRadioGroup } from '..';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useStateSortBy = () => {
  const [activeSortBy, setActiveSortBy] = useState(SortBy.ChangeDesc);

  const [activeSortButton, setActiveSortButton] = useState(
    SortByRadioGroup.Change,
  );

  const onChangeSort = useCallback((value: SortBy) => {
    setActiveSortBy(value);
  }, []);

  const onChangeSortButton = useCallback((value: SortByRadioGroup) => {
    setActiveSortButton(value);

    switch (value) {
      case SortByRadioGroup.Volume:
        return setActiveSortBy(SortBy.VolumeDesc);
      default:
        return setActiveSortBy(SortBy.VolumeDesc);
    }
  }, []);

  return { activeSortBy, activeSortButton, onChangeSort, onChangeSortButton };
};
