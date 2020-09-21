import React, { FC } from 'react';

export const ErrorConnection: FC = () => (
  <div>
    <div>Something went wrong</div>
    <button onClick={() => window.location.reload()}>Try to reload</button>
  </div>
);
