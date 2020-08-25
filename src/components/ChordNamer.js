import React, { Component } from 'react';
import BigFretBoard from './BigFretBoard';
import styled from 'styled-components';
import _ from 'lodash';
import ChordGenerator from './../logic/ChordGenerator';

const VerticallyCentered = styled.div`
  /* transform: translate(0%, 50%); */
`;

const BigChordName = styled.h1`
  /* padding: 10px 0; */
  padding-bottom: 15px;
`;

const Container = styled.div`
  padding: 2rem;
`;

const SmallText = styled.div`
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.dimmerText};
  padding-bottom: 10px;
`;

const NormalCase = styled.span`
  text-transform: none;
`;

export default class ChordNamer extends Component {
  constructor(props) {
    super(props);

    this.namer = new ChordGenerator(); // TODO Name makes no sense
    const notes = this.namer.tuning.map((string) =>
      _.fill(Array(13), string).map((openNote, fret) => this.namer.toNoteName(openNote + fret))
    );

    console.log('notes:', notes);

    this.state = {
      fingering: _.fill(Array(6), null),
      noteNames: notes,
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
    const chordNames = this.namer.nameChord(this.state.fingering);

    return (
      <Container>
        <VerticallyCentered>
          <SmallText>Chord Namer</SmallText>
          {/* <BigChordName>
            {_.isEqual(this.state.fingering, [null, null, null, null, null, null])
              ? 'Input your notes below ↓'
              : chordNames.shift()}
          </BigChordName> */}

          {/* TODO !!! Do i need to like purify this?? its not user input... */}
          <BigChordName
            dangerouslySetInnerHTML={{
              __html: _.isEqual(this.state.fingering, [null, null, null, null, null, null])
                ? 'Input your notes below ↓'
                : chordNames.shift(),
            }}
          />

          <SmallText>
            Also known as:&nbsp;&nbsp;&nbsp;&nbsp;
            <NormalCase
              dangerouslySetInnerHTML={{
                __html: _.isEqual(this.state.fingering, [null, null, null, null, null, null])
                  ? ''
                  : chordNames.join('\xa0\xa0\xa0\xa0'),
              }}
            />
          </SmallText>
          <BigFretBoard
            activeNotes={this.state.fingering.map((fret) =>
              _.fill(Array(13), false).map((x, index) => index === fret)
            )}
            notes={this.state.noteNames}
            toggleNote={this.toggleNote}
          />
        </VerticallyCentered>
      </Container>
    );
  }
}
