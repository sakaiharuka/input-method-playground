import React from 'react'
import TextBox from './components/TextBox'
import Settings from './features/settings/Settings'

import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>Input Method Playground</h1>
      </header>
      <TextBox />
      <Settings />
    </div>
  )
}

export default App
