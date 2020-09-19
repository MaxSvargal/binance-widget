import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { SortBy } from '..';
import { RadioBtn } from './RadioBtn';

interface IProps {
  onChange(value: SortBy): void;
}

enum RadioGroup {
  Change = 'Change',
  Volume = 'Volume',
}

export const SortByRadio: FC<IProps> = ({ onChange }) => {
  const [checked, setChecked] = useState(RadioGroup.Change);

  const onChangeHandle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value as RadioGroup);
  }, []);

  useEffect(() => {
    switch (checked) {
      case RadioGroup.Change:
        onChange(SortBy.ChangeAsc);
        break;
      case RadioGroup.Volume:
        onChange(SortBy.VolumeAsc);
        break;
    }
  }, [onChange, checked]);

  return (
    <form>
      {Object.values(RadioGroup).map((value) => (
        <RadioBtn
          name="sortBy"
          value={value}
          id={value}
          onChange={onChangeHandle}
          checked={checked === value}
        >
          {value}
        </RadioBtn>
      ))}
    </form>
  );
};
