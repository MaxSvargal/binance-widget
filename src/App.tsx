import './App.css';

import React, { FC } from 'react';
import { TickerWidget } from './tickerWidget';

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TickerWidget />
      </header>
    </div>
  );
};

export default App;
