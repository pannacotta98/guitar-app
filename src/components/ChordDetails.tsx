import React from 'react';
import styled from 'styled-components';
import { GuitarChord } from '../logic/chord/GuitarChord';

const DetailsContainer = styled.div`
  padding-top: 1rem;
`;

export function ChordDetails({ chord }: { chord?: GuitarChord }) {
  if (chord === undefined) return <p></p>;

  const notes = chord.getDetailedIntervals();

  return (
    <DetailsContainer>
      <hr></hr>
      {/* <h5>{chord.quality.fullName}</h5> */}
      {/* {chord.getAllAlternativeChordNotations().map((name) => (
        <p dangerouslySetInnerHTML={{ __html: name }}></p>
      ))} */}
      <IntervalDiagram notes={notes} />
      <hr></hr>
    </DetailsContainer>
  );
}

//======================== heeeeeeej ========================

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  height: 5rem;
`;

const IntervalLine = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  //
`;

const BarContainer = styled.div`
  flex-grow: 1;
`;
const Label = styled.div`
  width: 4rem;
`;

const Bar = styled.div<{ percentFilled: number }>`
  background-color: black;
  height: 100%;
  width: ${(p) => p.percentFilled}%;
  text-align: right;
`;

function IntervalDiagram({
  notes,
}: {
  notes: {
    intervalName: string;
    count: number;
    intervalSemitones: number;
  }[];
}) {
  return (
    <DiagramContainer>
      {notes.map((note) => (
        <IntervalLine>
          <Label>{note.intervalName}</Label>
          <BarContainer>
            <Bar percentFilled={(100 * note.count) / 6}>{note.count}</Bar>
          </BarContainer>
        </IntervalLine>
      ))}
    </DiagramContainer>
  );
}
