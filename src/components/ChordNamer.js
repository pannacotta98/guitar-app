import React, { Component } from 'react';
import BigFretBoard from './BigFretBoard';
import styled from 'styled-components';
import _ from 'lodash';
import IntervalUtilities from './../logic/IntervalUtilities';
import ChordGenerator from './../logic/ChordGenerator';

const VerticallyCentered = styled.div`
  /* transform: translate(0%, 50%); */
`;

const BigChordName = styled.h1`
  padding: 1rem 0;
  /* transition: 1s; */
  /* padding-bottom: 15px; */
`;

const Container = styled.div`
  /* padding: 2rem; */
`;

const OuterTextContainer = styled.div`
  height: 35vh;
  position: relative;
`;

const TextContainer = styled.div`
  padding: 2rem 2rem;
  position: absolute;
  bottom: 0;
`;

const SmallText = styled.div`
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 500;
  /* color: var(--dimmer-text-color); */
  /* padding-bottom: 10px; */
`;

const NormalCase = styled.span`
  text-transform: none;
`;

export default class ChordNamer extends Component {
  constructor(props) {
    super(props);

    this.namer = new ChordGenerator(); // TODO Name makes no sense
    const notes = this.namer.tuning.map((string) =>
      _.fill(Array(13), string).map((openNote, fret) =>
        IntervalUtilities.toNoteName(openNote + fret)
      )
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
          <OuterTextContainer>
            <TextContainer>
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
                    : chordNames.length > 0
                    ? chordNames.shift()
                    : 'I don’t know that one... :(',
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
            </TextContainer>
          </OuterTextContainer>
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
