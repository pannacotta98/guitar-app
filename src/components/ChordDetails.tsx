import React from 'react';
import styled from 'styled-components';
import { GuitarFingering } from '../logic/chord/GuitarChord';

const DetailsContainer = styled.div`
  padding-top: 1rem;
`;

export function ChordDetails({ fingering }: { fingering: GuitarFingering }) {
  return <DetailsContainer>TODO</DetailsContainer>;
}
