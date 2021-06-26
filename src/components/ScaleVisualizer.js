import React, { Component } from 'react';
import BigFretBoard from './BigFretBoard';
import { GlobalContext } from './../globalState';
import { SCALES_SRC } from '../logic/musicalData';
import IntervalUtilities from '../logic/IntervalUtilities';

export default class ScaleVisualizer extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);

    this.state = {
      selectedScale: 'Natural Minor (Aeolian)',
      rootNumber: 0, // Set at C for now
    };
  }

  render() {
    console.log(this.context.state.tuning);

    // const fingering = Array(6).fill(Array(13).fill(true));
    const notesInScale = SCALES_SRC.get(this.state.selectedScale).map((note) =>
      IntervalUtilities.normalizeNote(note + this.state.rootNumber)
    );
    const activeNotes = this.context.state.noteNumbersOnFretboard.map((string) =>
      string.map((noteNumber) => notesInScale.includes(noteNumber))
    );

    return (
      <div>
        <h1>HEHEJHEj SCALE VIsss</h1>
        {/* https://reactjs.org/docs/forms.html */}
        <select
          value={this.state.selectedScale}
          onChange={(event) => this.setState({ selectedScale: event.target.value })}
        >
          {Array.from(SCALES_SRC.keys()).map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <BigFretBoard
          activeNotes={activeNotes}
          toggleNote={() => {
            console.warn('Det här skulle jag ju fixa (ScaleVisualizer)');
          }}
        />
      </div>
    );
  }
}
