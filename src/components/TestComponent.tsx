import React from 'react';
import { LimitedWidthBox, PageBox } from './basicStyledElements';
import styled from 'styled-components';
import { CHORDS_SRC } from '../logic/chord/data';

const HoverableTableRow = styled.tr`
  &:hover {
    background-color: black;
  }
  td {
    padding: 0.5rem;
  }
`;

export function TestComponent() {
  return (
    <LimitedWidthBox>
      <h2>All known chords ({CHORDS_SRC.length})</h2>
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
    </LimitedWidthBox>
  );
}

