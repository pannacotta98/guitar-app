import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

// TODO dubellkolla om man faktiskt -kan- ska göra såhär hehe...
const StyledSvg = styled.svg`
  width: 100%;
  
  &:hover {
    .note {
      opacity: 0.15;
    }
    
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

  .note {
    fill: ${(props) => props.theme.colors.mainAccent};
    opacity: 0;
    transition: 0.2s;
    cursor: pointer;
    /* filter: drop-shadow(${(props) => props.theme.shadows.svg}); */
    /* filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4)); */

    &:hover {
      opacity: 1;
      stroke: ${(props) => props.theme.colors.mainAccent};
      stroke-width: 5px;
    }

    &:active {
      stroke-width: 1px;
      /* transform-origin: center; */
      /* transform: scale(1.2); */
    }
  }

  .activeNote {
    opacity: 1;
  }

  .board {
    fill: ${(props) => props.theme.colors.fretboard};
  }

  .string {
    stroke: ${(props) => props.theme.colors.string};
    stroke-linecap: round;
    stroke-width: 5px;
  }

  .fret {
    stroke: ${(props) => props.theme.colors.fret};
    /* stroke-linecap: round; */
    stroke-width: 5px;
  }

  .nut {
    stroke: ${(props) => props.theme.colors.nut};
    /* stroke-linecap: round; */
    stroke-width: 5px;
  }

  .marker {
    /* fill: ${(props) => props.theme.colors.fretMarkers}; */
    fill: none;
    stroke: ${(props) => props.theme.colors.fretMarkers};
    stroke-width: 3px;
    transition: 0.3s;
  }

  .fretNumbers {
    fill: ${(props) => props.theme.colors.dimmerText};
    font-weight: 600;
    font-size: 18px;
    opacity: 0.5;
    transition: 0.3s;
  }
`;

const stringPadding = 20;
const stringSpacing = 35;
const stringPositions = _.range(6)
  .reverse()
  .map((num) => stringPadding + num * stringSpacing);

const fretSpacing = 65;
const nutPosition = 20;
const fretPositions = _.range(0, 13).map((num) => nutPosition + fretSpacing * num);

const size = { width: 1000, height: stringPadding * 2 + stringSpacing * (6 - 1) };

const markerSize = 14;

// Which notes are active is sent in as prop: notes as an array of strings arrays of frets nested
export default function BigFretBoard(props) {
  return (
    <div>
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
              <circle
                className={props.notes[stringIndex][fretIndex] ? 'note activeNote' : 'note'}
                cx={xPos - fretSpacing / 2}
                cy={yPos}
                r="16"
                key={fretIndex}
                onClick={() => props.toggleNote(stringIndex, fretIndex)}
              />
            ))}
          </React.Fragment>
        ))}
      </StyledSvg>
    </div>
  );
}
