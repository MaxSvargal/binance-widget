import './App.css';

import React, { FC } from 'react';
import { TickerWidget } from './tickerWidget';

const App: FC = () => {
  return (
    <div className="App">
      <TickerWidget />
    </div>
  );
};

export default App;
