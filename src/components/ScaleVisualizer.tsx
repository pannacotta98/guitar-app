import React, { useContext, useState } from 'react';
import { BigFretBoard } from './BigFretBoard';
import { GlobalContext } from '../globalState';
import { LimitedWidthBox } from './basicStyledElements';
import { normalizeInternalNote, Note } from '../logic/note/Note';
import { Scale } from '../logic/scale/Scale';
import { MultiWaySwitch } from './MultiWaySwitch';
import { NOTE_NAMES } from '../logic/note/data';
import { Dropdown } from './Dropdown';
import styled from 'styled-components';

const OptionsContainer = styled.div`
  padding: 1.5rem 0 2rem 0;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  &:first-child {
    flex-grow: 0;
  }

  & > :last-child {
    flex-grow: 1;
  }
`;

export function ScaleVisualizer() {
  const globalContext = useContext(GlobalContext);

  const [selectedScale, setSelectedScale] = useState('Natural Minor (Aeolian)');
  const [root, setRoot] = useState(Note.fromName('C0'));

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
    <div>
      <LimitedWidthBox>
        <h1>Scales</h1>

        <OptionsContainer>
          <MultiWaySwitch
            options={NOTE_NAMES}
            selected={root.nameWithoutOctave()}
            setSelected={(s) => setRoot(Note.fromName(s + '0'))}
          />
          <Dropdown
            options={Scale.allNames()}
            selected={selectedScale}
            setSelected={setSelectedScale}
          />
        </OptionsContainer>
      </LimitedWidthBox>

      <BigFretBoard
        activeNotes={activeNotes}
        toggleNote={() => {
          console.warn('Det här skulle jag ju fixa (ScaleVisualizer)');
        }}
      />
    </div>
  );
}

