import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import ChordArea from './components/ChordArea';
import ChordSelection from './components/ChordSelection';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <NavBar />
      <ChordSelection />
      <ChordArea />
    </div>
  );
}

export default App;
