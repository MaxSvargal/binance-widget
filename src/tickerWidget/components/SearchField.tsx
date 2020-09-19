import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from '../../shared/hooks/useDebounce';

interface ISearchFieldProps {
  value: string;
  onChange(value: string): void;
}

export const SearchField: FC<ISearchFieldProps> = ({ value, onChange }) => {
  const [innerValue, setInnerValue] = useState(value);
  const debouncedValue = useDebounce(innerValue, 200);

  useEffect(() => {
    onChange(innerValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, debouncedValue]);

  const onChangeHandle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInnerValue(event.target.value);
  }, []);

  const onClickClear = useCallback(() => setInnerValue(''), [setInnerValue]);

  return (
    <div>
      <input
        type="search"
        name="searchbox"
        onChange={onChangeHandle}
        value={innerValue}
      />
      <button onClick={onClickClear}>Clear</button>
    </div>
  );
};
