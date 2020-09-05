import React from 'react';
import IntervalUtilities from './logic/IntervalUtilities';

export const GlobalContext = React.createContext();

const initialTuning = 'E2 A2 D3 G3 B3 E4'
  .split(' ')
  .map((note) => IntervalUtilities.toNoteNumber(note));

export class GlobalStateProvider extends React.Component {
  /**
   * Calculate notes in internal number representation in all positions of fretboard
   * @param {number[]} tuning
   */
  noteNumbersOnFretboardFromTuning = (tuning) => {
    return tuning.map((openString) =>
      Array(24 + 1)
        .fill(false)
        .map((x, fret) => IntervalUtilities.normalizeNote(openString + fret))
    );
  };

  noteNamesOnFretboardFromTuning = (tuning) => {
    return tuning.map((string) =>
      Array(24 + 1)
        .fill(string)
        .map((openNote, fret) => IntervalUtilities.toNoteName(openNote + fret))
    );
  };

  setTuning = (newTuning) => {
    console.log('Tuning was set');
    this.setState({
      tuning: newTuning,
      noteNumbersOnFretboard: this.noteNumbersOnFretboardFromTuning(newTuning),
      noteNamesOnFretboard: this.noteNamesOnFretboardFromTuning(newTuning),
    });
  };

  state = {
    // Tuning related things
    tuning: initialTuning,
    noteNumbersOnFretboard: this.noteNumbersOnFretboardFromTuning(initialTuning),
    noteNamesOnFretboard: this.noteNamesOnFretboardFromTuning(initialTuning),
    // Application state
    activePane: 'SCALES',
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          state: this.state,
          setTuning: this.setTuning,
          setActivePane: (pane) => this.setState({ activePane: pane }),
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
