import React, { ChangeEvent, FC, useCallback } from 'react';
import { SortByRadioGroup } from '..';
import { RadioBtn } from './RadioBtn';

interface IProps {
  value: SortByRadioGroup;
  onChange(value: SortByRadioGroup): void;
}

export const SortByRadio: FC<IProps> = ({ value, onChange }) => {
  const onChangeHandle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onChange(event.target.value as SortByRadioGroup),
    [onChange],
  );

  return (
    <form>
      {Object.values(SortByRadioGroup).map((radioValue) => (
        <RadioBtn
          id={radioValue}
          key={radioValue}
          value={radioValue}
          checked={value === radioValue}
          onChange={onChangeHandle}
        >
          {radioValue}
        </RadioBtn>
      ))}
    </form>
  );
};