import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../globalState';
import _ from 'lodash';

const Container = styled.div`
  @media (max-width: 700px) {
    /* background-color: var(--lighter-background); */
    /* padding: 1.5rem; */
    /* box-shadow: inset var(--main-shadow), inset -5px -5px 13px 0px rgba(0, 0, 0, 0.2); */
    overflow-x: scroll;
    /* background-color: red; */
  }
  padding: 0 var(--left-right-page-padding);
`;

const StyledSvg = styled.svg`
  overflow: visible;

  @media (max-width: 700px) {
    height: 250px;
    .board {
      fill: red;
    }
  }
  @media (hover: hover) {
    &:hover {
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
    /* fill: var(--main-accent); */
    transition: 0.2s;
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
    &.dots {
    }
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

const fretSpacing = 39.5;
const nutPosition = 30;
const fretPositions = _.range(0, 25).map((num) => nutPosition + fretSpacing * num);

const size = { width: 1000, height: stringPadding * 2 + stringSpacing * (6 - 1) };

const markerSize = 14;

type Props = {
  activeNotes: boolean[][];
  noteColors?: string[][];
  toggleNote: (stringIndex: number, fretIndex: number) => void;
};

export function BigFretBoard({ activeNotes, noteColors, toggleNote }: Props) {
  return (
    <Container>
      {/* TODO Fix viewBox */}
      <StyledSvg xmlns="http://www.w3.org/2000/svg" viewBox="-0 0 1000 250">
        <rect className="board" x="0" y="0" width={size.width} height={size.height} rx="16" />
        <FretMarkers />
        <FretsAndNut />
        <FretNumbers />
        {stringPositions.map((yPos, stringIndex) => (
          <React.Fragment key={stringIndex}>
            <line className="string" x1="0" y1={yPos} x2={size.width} y2={yPos} />
            {fretPositions.map((xPos, fretIndex) => (
              <ActiveNote
                activeNotes={activeNotes}
                stringIndex={stringIndex}
                noteColors={noteColors}
                fretIndex={fretIndex}
                xPos={xPos}
                yPos={yPos}
                toggleNote={toggleNote}
                key={`${xPos},${yPos}`}
              />
            ))}
          </React.Fragment>
        ))}
      </StyledSvg>
    </Container>
  );
}

function FretMarkers() {
  return (
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
      {/* Double markers at fret 12 */}
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

      <circle
        className="marker"
        cx={fretPositions[15] - fretSpacing / 2}
        cy={size.height / 2}
        r={markerSize}
      />
      <circle
        className="marker"
        cx={fretPositions[17] - fretSpacing / 2}
        cy={size.height / 2}
        r={markerSize}
      />
      <circle
        className="marker"
        cx={fretPositions[19] - fretSpacing / 2}
        cy={size.height / 2}
        r={markerSize}
      />
      <circle
        className="marker"
        cx={fretPositions[21] - fretSpacing / 2}
        cy={size.height / 2}
        r={markerSize}
      />
      {/* Double markers at fret 24 */}
      <circle
        className="marker"
        cx={fretPositions[24] - fretSpacing / 2}
        cy={size.height / 2 - 45}
        r={markerSize}
      />
      <circle
        className="marker"
        cx={fretPositions[24] - fretSpacing / 2}
        cy={size.height / 2 + 45}
        r={markerSize}
      />
    </g>
  );
}

function ActiveNote({
  activeNotes,
  noteColors,
  stringIndex,
  fretIndex,
  yPos,
  xPos,
  toggleNote,
}: {
  activeNotes: boolean[][];
  noteColors?: string[][];
  stringIndex: number;
  fretIndex: number;
  yPos: number;
  xPos: number;
  toggleNote: (stringIndex: number, fretIndex: number) => void;
}) {
  const color = noteColors ? noteColors[stringIndex][fretIndex] : 'var(--main-accent)';

  return (
    <g
      className={activeNotes[stringIndex][fretIndex] ? 'noteGroup activeNoteGroup' : 'noteGroup'}
      key={fretIndex}
      onClick={() => toggleNote(stringIndex, fretIndex)}
    >
      <rect
        opacity="0"
        x={xPos - fretSpacing}
        y={yPos - stringSpacing / 2}
        width={fretSpacing}
        height={stringSpacing}
      />
      <circle
        fill={color}
        className="note"
        cx={xPos - fretSpacing / 2}
        cy={yPos}
        r="16"
        key={fretIndex}
      />
      <text
        className="noteName"
        x={xPos - fretSpacing / 2}
        y={yPos + 1.3 /* seems to look more centered */}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <GlobalContext.Consumer>
          {(context) => context.tuning.notesOnFretBoard[stringIndex][fretIndex].nameWithoutOctave()}
        </GlobalContext.Consumer>
      </text>
    </g>
  );
}

function FretsAndNut() {
  return (
    <g>
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
    </g>
  );
}

function FretNumbers() {
  return (
    <g>
      {fretPositions.map((pos, index) => (
        <g>
          <text
            x={pos - fretSpacing / 2}
            y={size.height + 30}
            textAnchor="middle"
            className="fretNumbers"
            key={index}
          >
            {index}
          </text>
          <text
            x={pos - fretSpacing / 2}
            y={size.height + 10}
            className="fretNumbers dots"
            textAnchor="middle"
          >
            {[3, 5, 7, 9, 12, 15, 17, 19, 21, 24].includes(index) && '.'}
            {[12, 24].includes(index) && '.'}
          </text>
        </g>
      ))}
    </g>
  );
}

