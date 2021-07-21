import React, { useContext, useState } from 'react';
import { BigFretBoard } from './BigFretBoard';
import { GlobalContext } from '../globalState';
import { PageBox } from './basicStyledElements';
import { normalizeInternalNote, Note } from '../logic/note/Note';
import { Scale } from '../logic/scale/Scale';

export function ScaleVisualizer() {
  const globalContext = useContext(GlobalContext);

  const [selectedScale, setSelectedScale] = useState('Natural Minor (Aeolian)');
  const [root] = useState(Note.fromName('C0'));

  const notesInScale = Scale.fromRootAndName(root, selectedScale)?.notes.map((note) => {
    return normalizeInternalNote(note.internalNoteNumber);
  });

  const activeNotes = globalContext.tuning.notesOnFretBoard.map((string) =>
    string.map((note) =>
      notesInScale === undefined
        ? false
        : notesInScale.includes(normalizeInternalNote(note.internalNoteNumber))
    )
  );

  return (
    <PageBox>
      <h1>HEHEJHEj SCALE VIsss ({root.nameWithoutOctave()})</h1>
      {/* https://reactjs.org/docs/forms.html */}
      <select value={selectedScale} onChange={(event) => setSelectedScale(event.target.value)}>
        {Scale.allNames().map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>
      <BigFretBoard
        activeNotes={activeNotes}
        toggleNote={() => {
          console.warn('Det här skulle jag ju fixa (ScaleVisualizer)');
        }}
      />
    </PageBox>
  );
}
