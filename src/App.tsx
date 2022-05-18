import React from 'react';

import TextBox from './components/TextBox';

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>Input Method Playground</h1>
      </header>
      <TextBox />
    </div>
  );
}

export default App;
