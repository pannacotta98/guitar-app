import React from 'react';
import Chord from './Chord';
import styled from 'styled-components';

const ChordAreaDiv = styled.div`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.darkBackground};
  /* grid-template-columns: 1fr; */
  /* height: 100vh; */
  --gutter: 2rem;

  display: grid;
  grid-gap: calc(var(--gutter) / 2);
  /* FIXME Seems like the 6 below decides the number of chords to be rendered hehe */
  grid-template-columns: repeat(6, calc(50% - var(--gutter) * 2));
  grid-template-rows: minmax(150px, 1fr);

  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: calc(0.75 * var(--gutter));
  margin-bottom: calc(-0.25 * var(--gutter));
`;

function ChordArea() {
  return (
    <ChordAreaDiv>
      <Chord chordData={[0, 1, 2, 2, 3, 'x']} />
      <Chord chordData={[0, 3, 2, 2, 2, 3]} />
      <Chord chordData={[0, 1, 2, 2, 3, 0]} />
      <Chord chordData={[0, 1, 0, 0, 3, 2]} />
    </ChordAreaDiv>
  );
}

export default ChordArea;
