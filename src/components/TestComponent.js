import React from 'react';
import ChordGenerator from '../logic/ChordGenerator';
// import ChordIntervals from './logic/ChordIntervals';
import { CHORDS_SRC } from '../logic/musicalData';
import styled from 'styled-components';

const HoverableTableRow = styled.tr`
  &:hover {
    background-color: black;
  }
  td {
    padding: 0.5rem;
  }
`;

export default class TestComponent extends React.Component {
  componentDidMount() {
    this.generator = new ChordGenerator();

    if (false) {
      console.log('should be E major:     ', this.generator.nameChord([0, 2, 2, 1, 0, 0]));
      // console.log('should be G major:     ', g.nameChord([3, 2, 0, 0, 0, 3]));
      console.log('should be E minor:     ', this.generator.nameChord([0, 2, 2, 0, 0, 0]));
      console.log('should be E minor7:    ', this.generator.nameChord([0, 2, 2, 0, 3, 0]));
      console.log('should be F minoradd9: ', this.generator.nameChord([1, 3, 5, 1, 1, 1]));
      // console.log('should be D major:     ', g.nameChord([null, null, 0, 2, 3, 2]));
      console.log('should be D minor7:    ', this.generator.nameChord([null, null, 0, 2, 1, 1]));
      console.log('should be B sus2:      ', this.generator.nameChord([null, 2, 4, 4, 2, 2]));
      console.log('should be F lydian(?): ', this.generator.nameChord([1, 3, 3, 2, 0, 0]));
      console.log('should be G 11:        ', this.generator.nameChord([null, 10, 10, 10, 10, 10]));
      console.log('should be D / F#:      ', this.generator.nameChord([2, 0, 0, 2, 3, 2]));
    }
  }

  render() {
    return (
      <>
        <h2>All known chords</h2>
        <table>
          <tbody>
            {[...CHORDS_SRC]
              .sort((a, b) => a.weight - b.weight)
              .map((chord, index) => (
                <HoverableTableRow key={index}>
                  <td>{chord.weight}</td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: chord.abbr
                        .map((q, i) => (i === 0 ? '<b>A' + q + '</b>' : 'A' + q))
                        .join(' | '),
                    }}
                  ></td>
                  <td>{chord.fullName}</td>
                  {/* <td>{chord.scale}</td> */}
                </HoverableTableRow>
              ))}
          </tbody>
        </table>
      </>
    );
    // return (
    //   <>
    //     <h1>All known chords</h1>
    //     {[...CHORDS_SRC]
    //       .sort((a, b) => a.weight - b.weight)
    //       .map((chord, index) => (
    //         <h3
    //           key={index}
    //           dangerouslySetInnerHTML={{
    //             __html:
    //               '' +
    //               chord.weight +
    //               ' &mdash; ' +
    //               chord.abbr.map((q) => 'A' + q).join(' | ') +
    //               '<span style="color: black;"> - ' +
    //               chord.fullName +
    //               '</span>',
    //           }}
    //         />
    //       ))}
    //   </>
    // );
  }
}
