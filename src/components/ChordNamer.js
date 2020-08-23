import React, { Component } from 'react';
import BigFretBoard from './BigFretBoard';
import styled from 'styled-components';
import _ from 'lodash';

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

    const tempNotes = [
      _.fill(Array(13), false),
      _.fill(Array(13), false),
      _.fill(Array(13), false),
      _.fill(Array(13), false),
      _.fill(Array(13), false),
      _.fill(Array(13), false),
    ];
    tempNotes[0][0] = tempNotes[1][0] = tempNotes[2][1] = true;

    this.state = {
      notes: tempNotes,
    };
  }

  toggleNote = (string, fret) => {
    const tempNotes = this.state.notes;
    if (tempNotes[string][fret]) {
      // TODO Set open string or something
    } else {
      _.fill(tempNotes[string], false); // Only one note per string in chords
    }
    tempNotes[string][fret] = !tempNotes[string][fret];

    this.setState({ notes: tempNotes });
  };

  render() {
    return (
      <Container>
        <VerticallyCentered>
          <SmallText>Chord Namer</SmallText>
          <h1>Input your notes below ↓</h1>
          <SmallText>Also known as:</SmallText>
          <BigFretBoard notes={this.state.notes} toggleNote={this.toggleNote} />
        </VerticallyCentered>
      </Container>
    );
  }
}
