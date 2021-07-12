import React from 'react';
import { Tuning } from './logic/tuning/Tuning';

export const GlobalContext = React.createContext();

const initialTuning = Tuning.fromNotes('E2 A2 D3 G3 B3 E4');

export class GlobalStateProvider extends React.Component {
  setTuning = (newTuning) => {
    console.log('Tuning was set');
    this.setState({
      tuning: newTuning,
    });
  };

  state = {
    tuning: initialTuning,
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          state: this.state,
          setTuning: this.setTuning,
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
