import React from 'react';
import NavBar from './NavBar';
import ChordNamer from './ChordNamer';
import TestComponent from './TestComponent';
import ScaleVisualizer from './ScaleVisualizer';
import { GlobalStateProvider, GlobalContext } from './../globalState';

function App() {
  return (
    <GlobalStateProvider>
      <div className="App">
        <NavBar />
        {/* Main content */}
        <GlobalContext.Consumer>
          {(context) => {
            return (
              {
                SCALES: <ScaleVisualizer />,
                CHORD_NAMER: <ChordNamer />,
                TEST: <TestComponent />,
              }[context.state.activePane] || <h1>Oooops</h1>
            );
          }}
        </GlobalContext.Consumer>
      </div>
    </GlobalStateProvider>
  );
}

export default App;
