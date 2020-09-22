import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useDebouncedCallback } from '../../shared/hooks/useDebouncedCallback';

import styles from './SearchField.module.css';

interface ISearchFieldProps {
  value: string;
  onChange(value: string): void;
}

export const SearchField: FC<ISearchFieldProps> = ({ value, onChange }) => {
  const [currentInput, setCurrentInput] = useState(value);
  useEffect(() => setCurrentInput(value), [value]);

  const onChangeHandleDebounced = useDebouncedCallback<[string]>((value) => {
    onChange(value);
  }, 500);

  const onChangeHandle = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setCurrentInput(value);
      onChangeHandleDebounced(value);
    },
    [],
  );

  const onClickClear = useCallback(() => onChange(''), [onChange]);

  return (
    <div className={styles.container}>
      <input
        type="search"
        name="searchbox"
        onChange={onChangeHandle}
        placeholder={'Type to search...'}
        value={currentInput}
        className={styles.input}
      />
      {currentInput !== '' && (
        <button
          onClick={onClickClear}
          className={styles.clearBtn}
          title="Clear search results"
        />
      )}
    </div>
  );
};
