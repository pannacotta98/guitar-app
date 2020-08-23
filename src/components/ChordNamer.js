import React, { Component } from 'react';
import BigFretBoard from './BigFretBoard';
import styled from 'styled-components';
import _ from 'lodash';
import ChordGenerator from './../logic/ChordGenerator';

const VerticallyCentered = styled.div`
  /* transform: translate(0%, 50%); */
`;

const Container = styled.div`
  padding: 2rem;
`;

const SmallText = styled.div`
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.dimmerText};
`;

export default class ChordNamer extends Component {
  constructor(props) {
    super(props);

    this.namer = new ChordGenerator(); // TODO Name makes no sense

    this.state = {
      fingering: _.fill(Array(6), null),
    };
  }

  toggleNote = (string, fret) => {
    const tempFingering = this.state.fingering;
    if (tempFingering[string] === fret) {
      tempFingering[string] = null;
    } else {
      tempFingering[string] = fret; // Only one note per string in chords
    }

    this.setState({ fingering: tempFingering });
  };

  render() {
    return (
      <Container>
        <VerticallyCentered>
          <SmallText>Chord Namer</SmallText>
          <h1>
            {_.isEqual(this.state.fingering, [null, null, null, null, null, null])
              ? 'Input your notes below ↓'
              : this.namer.nameChord(this.state.fingering)[0]}
          </h1>
          <SmallText>Also known as:</SmallText>
          <BigFretBoard
            notes={this.state.fingering.map((fret) =>
              _.fill(Array(13), false).map((x, index) => index === fret)
            )}
            toggleNote={this.toggleNote}
          />
        </VerticallyCentered>
      </Container>
    );
  }
}
