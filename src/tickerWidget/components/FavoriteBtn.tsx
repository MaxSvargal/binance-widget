import React, { FC } from 'react';

interface IProps {
  active: boolean;
  onClick(): void;
}

export const FavoriteBtn: FC<IProps> = ({ active, onClick }) => (
  <button
    title="Toggle favorite"
    onClick={onClick}
    style={{
      background: 'transparent',
      border: 0,
      color: `var(--${active ? 'yellow' : 'white'})`,
      cursor: 'pointer',
    }}
  >
    {active ? <span>&#9733;</span> : <span>&#9734;</span>}
  </button>
);
