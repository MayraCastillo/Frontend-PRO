import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

import MiComponente from './components/MiComponente'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        
        
      </header>

      <div className="componentes">
          <MiComponente />
        </div>
    </div>
    
  );
}

export default App;
