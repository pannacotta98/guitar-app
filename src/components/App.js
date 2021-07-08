import React from 'react';
import NavBar from './NavBar';
import ChordNamer from './ChordNamer';
import TestComponent from './TestComponent';
import ScaleVisualizer from './ScaleVisualizer';
import { GlobalStateProvider } from './../globalState';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/scales">
              <ScaleVisualizer />
            </Route>
            <Route path="/test">
              <TestComponent />
            </Route>
            <Route path="/">
              <ChordNamer />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
