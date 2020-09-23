import './App.css';

import React, { FC } from 'react';
import { BinanceWidget } from './binanceWidget';

const App: FC = () => {
  return (
    <div className="App">
      <BinanceWidget />
    </div>
  );
};

export default App;
