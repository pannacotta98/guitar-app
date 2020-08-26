import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const Container = styled.div`
  @media (max-width: 600px) {
    /* background-color: var(--lighter-background); */
    /* padding: 1.5rem; */
    /* box-shadow: inset var(--main-shadow), inset -5px -5px 13px 0px rgba(0, 0, 0, 0.2); */
    overflow-x: scroll;
    /* background-color: red; */
  }
`;

// TODO dubellkolla om man faktiskt -kan- ska göra såhär hehe...
const StyledSvg = styled.svg`
  /* @media (max-width: var(--large-phone)) { */
  @media (max-width: 600px) {
    height: 250px;
    .board {
      fill: red;
    }
    /* width: 300px; */
  }

  @media (hover: hover) {
    &:hover {
      /* .note { opacity: 0.15; } */
      .activeNote {
        opacity: 1;
      }
      .marker {
        opacity: 0.5;
      }
      .fretNumbers {
        opacity: 1;
      }
    }
  }

  .note {
    fill: var(--main-accent);
    transition: 0.2s;

    /* filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4)); */
  }

  .board {
    fill: var(--fretboard-color);
  }

  .string {
    stroke: var(--string-color);
    stroke-linecap: round;
    stroke-width: 5px;
  }

  .fret {
    stroke: var(--fret-color);
    stroke-width: 5px;
  }

  .nut {
    stroke: var(--nut-color);
    stroke-width: 5px;
  }

  .marker {
    fill: none;
    stroke: var(--fret-marker-color);
    stroke-width: 3px;
    transition: 0.3s;
  }

  .fretNumbers {
    fill: var(--dimmer-text-color);
    font-weight: 600;
    font-size: 18px;
    opacity: 0.5;
    transition: 0.3s;
  }

  .noteName {
    fill: var(--contrasting-text-color);
    font-weight: 600;
    pointer-events: none;
    transition: 0.1s;
  }

  .noteGroup {
    opacity: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent; /* Remove ugly touch box */

    @media (hover: hover) {
      &:hover {
        opacity: 0.7;

        .note {
          stroke: var(--main-accent);
          stroke-width: 5px;
        }
      }
    }

    &:active {
      opacity: 1;
      .note {
        stroke-width: 1px;
      }
    }
  }

  .activeNoteGroup {
    opacity: 1;
    @media (hover: hover) {
      &:hover {
        opacity: 1;
      }
    }
  }
`;

const stringPadding = 20;
const stringSpacing = 35;
const stringPositions = _.range(6)
  .reverse() // Voicings are in the form [lowest string, ..., highest string]
  .map((num) => stringPadding + num * stringSpacing);

const fretSpacing = 65;
const nutPosition = 20;
const fretPositions = _.range(0, 13).map((num) => nutPosition + fretSpacing * num);

const size = { width: 1000, height: stringPadding * 2 + stringSpacing * (6 - 1) };

const markerSize = 14;

// Which notes are active is sent in as prop: notes as an array of strings arrays of frets nested
export default function BigFretBoard(props) {
  return (
    <Container>
      {/* TODO fixa viewBox */}
      <StyledSvg xmlns="http://www.w3.org/2000/svg" viewBox="-30 0 1000 250">
        <rect className="board" x="0" y="0" width={size.width} height={size.height} rx="16" />
        {/* <line className="nut" x1={nutPosition} y1="0" x2={nutPosition} y2={size.height} /> */}

        <g>
          <circle
            className="marker"
            cx={fretPositions[3] - fretSpacing / 2}
            cy={size.height / 2}
            r={markerSize}
          />
          <circle
            className="marker"
            cx={fretPositions[5] - fretSpacing / 2}
            cy={size.height / 2}
            r={markerSize}
          />
          <circle
            className="marker"
            cx={fretPositions[7] - fretSpacing / 2}
            cy={size.height / 2}
            r={markerSize}
          />
          <circle
            className="marker"
            cx={fretPositions[9] - fretSpacing / 2}
            cy={size.height / 2}
            r={markerSize}
          />

          <circle
            className="marker"
            cx={fretPositions[12] - fretSpacing / 2}
            cy={size.height / 2 - 45}
            r={markerSize}
          />
          <circle
            className="marker"
            cx={fretPositions[12] - fretSpacing / 2}
            cy={size.height / 2 + 45}
            r={markerSize}
          />
        </g>

        {fretPositions.map((pos, index) => (
          <line
            className={index === 0 ? 'nut' : 'fret'}
            x1={pos}
            y1="0"
            x2={pos}
            y2={size.height}
            key={index}
          />
        ))}

        {fretPositions.map((pos, index) => (
          <text
            x={pos - fretSpacing / 2}
            y={size.height + 30}
            textAnchor="middle"
            className="fretNumbers"
            key={index}
          >
            {index}
          </text>
        ))}

        {stringPositions.map((yPos, stringIndex) => (
          <React.Fragment key={stringIndex}>
            <line className="string" x1="0" y1={yPos} x2={size.width} y2={yPos} />

            {fretPositions.map((xPos, fretIndex) => (
              <g
                className={
                  props.activeNotes[stringIndex][fretIndex]
                    ? 'noteGroup activeNoteGroup'
                    : 'noteGroup'
                }
                key={fretIndex}
                onClick={() => props.toggleNote(stringIndex, fretIndex)}
              >
                <rect
                  opacity="0"
                  x={xPos - fretSpacing}
                  y={yPos - stringSpacing / 2}
                  width={fretSpacing}
                  height={stringSpacing}
                />
                <circle
                  className="note"
                  cx={xPos - fretSpacing / 2}
                  cy={yPos}
                  r="16"
                  key={fretIndex}
                />
                <text
                  className="noteName"
                  x={xPos - fretSpacing / 2}
                  y={yPos + 1 /* seems to look more center */}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {props.notes[stringIndex][fretIndex]}
                </text>
              </g>
            ))}
          </React.Fragment>
        ))}
      </StyledSvg>
    </Container>
  );
}
