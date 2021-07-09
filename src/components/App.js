import React from 'react';
import { NavBar } from './NavBar';
import { ChordNamer } from './ChordNamer';
import { TestComponent } from './TestComponent';
import { ScaleVisualizer } from './ScaleVisualizer';
import { NotFound } from './NotFound';
import { GlobalStateProvider } from './../globalState';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

export function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/">
              <ChordNamer />
            </Route>
            <Route path="/scales">
              <ScaleVisualizer />
            </Route>
            <Route path="/test">
              <TestComponent />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}
