import React, { FC } from 'react';
import { SortBy } from '..';

interface IProps {
  sortBy: SortBy;
}

export const SortByColumn: FC<IProps> = ({ sortBy }) => (
  <div>
    <div>
      <div role="row">Pair</div>
      <div role="row">Last Price</div>
      <div role="row">{sortBy === SortBy.ChangeAsc ? 'Change' : 'Volume'}</div>
    </div>
    {[].map(() => (
      <div>
        <div>foo</div>
        <div>foo</div>
        <div>foo</div>
      </div>
    ))}
  </div>
);
