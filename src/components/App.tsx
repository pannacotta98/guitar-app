import React from 'react';
import { NavBar } from './NavBar';
import { ChordNamer } from './ChordNamer';
import { TestComponent } from './TestComponent';
import { ScaleVisualizer } from './ScaleVisualizer';
import { NotFound } from './NotFound';
import { GlobalStateProvider } from '../globalState';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { Settings } from './Settings';

export function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/chords" element={<ChordNamer />} />
            <Route path="/scales" element={<ScaleVisualizer />} />
            <Route path="/test" element={<TestComponent />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}
