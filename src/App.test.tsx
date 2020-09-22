import fetch from 'jest-fetch-mock';
import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('App renders correctly', () => {
  fetch.mockResponseOnce(() => Promise.resolve(JSON.stringify({})));
  const { getByText } = render(<App />);
  const perfectCoin = getByText(/BNB/i);
  expect(perfectCoin).toBeInTheDocument();
});
