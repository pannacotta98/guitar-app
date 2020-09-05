import React, { Component } from 'react';
import BigFretBoard from './BigFretBoard';
import { GlobalContext } from './../globalState';

export default class ScaleVisualizer extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);

    this.state = {
      selectedScale: 'Major',
    };
  }

  render() {
    console.log(this.context.state.tuning);

    // const fingering = Array(6).fill(Array(13).fill(true));
    const notesInScale = [4, 11];
    const activeNotes = this.context.state.noteNumbersOnFretboard.map((string) =>
      string.map((noteNumber) => notesInScale.includes(noteNumber))
    );

    return (
      <div>
        <h1>HEHEJHEj SCALE VIsss</h1>
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
