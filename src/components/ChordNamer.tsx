import React, { useContext, useState } from 'react';
import { BigFretBoard } from './BigFretBoard';
import styled from 'styled-components';
import _ from 'lodash';
import { GuitarChord, GuitarFingering } from '../logic/chord/GuitarChord';
import { GlobalContext } from '../globalState';
// import { ChordDetails } from './ChordDetails';

const VerticallyCentered = styled.div`
  /* transform: translate(0%, 50%); */
`;

const BigChordName = styled.h1`
  padding: 1rem 0;
`;

const Container = styled.div`
  /* padding: 2rem; */
`;

const OuterTextContainer = styled.div`
  height: 35vh;
  position: relative;
`;

const TextContainer = styled.div`
  padding: var(--left-right-page-padding);
  position: absolute;
  bottom: 0;
`;

const SmallText = styled.div`
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 500;
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
    <Container>
      <VerticallyCentered>
        <OuterTextContainer>
          <TextContainer>
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

            {/* <ChordDetails fingering={this.state.fingering} /> */}
          </TextContainer>
        </OuterTextContainer>
        <BigFretBoard
          activeNotes={fingering.map((fret) =>
            _.fill(Array(13), false).map((x, index) => index === fret)
          )}
          toggleNote={toggleNote}
        />
      </VerticallyCentered>
    </Container>
  );
}
