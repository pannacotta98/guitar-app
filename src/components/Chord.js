import React from 'react';
import styled from 'styled-components';

export default class Chord extends React.Component {
  render() {
    // DONT do this; bad for performance
    const ChordDiv = styled.div`
      max-width: 230px;
      /* padding: 3rem; */
      filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.5)); /* TODO Match other shadows */
      transition: 0.1s;
      cursor: pointer;

      :hover {
        transform: scale(1.05);
      }
    `;

    // Should it be className instead?
    return (
      <ChordDiv>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -40 182 271">
          <g id="hej">
            <g id="wood">
              <rect className="cls-1" y="8.75" width="182" height="214" rx="16" />
            </g>
          </g>
          <g id="frets">
            <line className="cls-2" y1="70.75" x2="182" y2="70.75" />
            <line className="cls-2" y1="114.75" x2="182" y2="114.75" />
            <line className="cls-2" y1="158.75" x2="182" y2="158.75" />
            <line className="cls-2" y1="202.75" x2="182" y2="202.75" />
          </g>
          <g id="Layer_3" data-name="Layer 3">
            <line id="nut" className="cls-3" y1="26.75" x2="182" y2="26.75" />
          </g>
          <g id="strings">
            <g>
              <line className="cls-4" x1="14" y1="2.5" x2="14" y2="228.5" />
              <line className="cls-4" x1="44.8" y1="2.5" x2="44.8" y2="228.5" />
              <line className="cls-4" x1="75.6" y1="2.5" x2="75.6" y2="228.5" />
              <line className="cls-4" x1="106.4" y1="2.5" x2="106.4" y2="228.5" />
              <line className="cls-4" x1="137.2" y1="2.5" x2="137.2" y2="228.5" />
              <line className="cls-4" x1="168" y1="2.5" x2="168" y2="228.5" />
            </g>
          </g>
          {this.createChordDots(this.props.chordData)}
        </svg>
      </ChordDiv>
    );
  }

  createChordDots(input) {
    // The x-position of the strings
    const stringMap = [14, 44.8, 75.6, 106.4, 137.2, 168];
    // The y-position where the corresponding fret dot should be placed
    const fretMap = [70, 114, 158, 202]; // FIXME

    // TODO adjust for chords high on the neck

    return input.map((note, index) => {
      if (note === 'x' || note === 0) {
        return (
          <text x={stringMap[index]} y="-15" textAnchor="middle" fill="white" key={index}>
            {note === 0 ? 'o' : 'x'}
          </text>
        );
      } else {
        return <circle cx={stringMap[index]} cy={fretMap[note]} r="13" key={index} />;
      }
    });
  }
}
