import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('App renders correctly', () => {
  const { getByText } = render(<App />);
  const perfectCoin = getByText(/BNB/i);
  expect(perfectCoin).toBeInTheDocument();
});
