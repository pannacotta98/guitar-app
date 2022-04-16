import React, { useContext, useState } from 'react';
import { BigFretBoard } from './BigFretBoard';
import styled from 'styled-components';
import _ from 'lodash';
import { GuitarChord, GuitarFingering } from '../logic/chord/GuitarChord';
import { GlobalContext } from '../globalState';
import { LimitedWidthBox } from './basicStyledElements';
// import { ChordDetails } from './ChordDetails';

const BigChordName = styled.h1`
  padding: 1rem 0;
`;

const SmallText = styled.div`
  text-transform: uppercase;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
`;

const NormalCase = styled.span`
  text-transform: none;
`;

export function ChordNamer() {
  const globalContext = useContext(GlobalContext);
  const [fingering, setFingering] = useState<GuitarFingering>([null, null, null, null, null, null]);

  function toggleNote(stringIndex: number, fretIndex: number) {
    const tempFingering: GuitarFingering = [...fingering];
    if (tempFingering[stringIndex] === fretIndex) {
      tempFingering[stringIndex] = null;
    } else {
      tempFingering[stringIndex] = fretIndex; // Only one note per string in chords
    }
    setFingering(tempFingering);
  }

  const chords = GuitarChord.allFromFingering(fingering, globalContext.tuning);

  return (
    <div>
      <LimitedWidthBox>
        <SmallText>Chord Namer</SmallText>

        <BigChordName
          dangerouslySetInnerHTML={{
            __html: _.isEqual(fingering, [null, null, null, null, null, null])
              ? 'Input your notes below ↓'
              : chords.length > 0
              ? `${chords.shift()}`
              : 'I don’t know that one... :(',
          }}
        />

        <SmallText>
          Also known as:&nbsp;&nbsp;&nbsp;&nbsp;
          <NormalCase
            dangerouslySetInnerHTML={{
              __html: _.isEqual(fingering, [null, null, null, null, null, null])
                ? ''
                : chords.join('\xa0\xa0\xa0\xa0'),
            }}
          />
        </SmallText>

        {/* <ChordDetails fingering={fingering} /> */}
      </LimitedWidthBox>
      <BigFretBoard
        activeNotes={fingering.map((fret) =>
          _.fill(Array(13), false).map((x, index) => index === fret)
        )}
        toggleNote={toggleNote}
      />
    </div>
  );
}

