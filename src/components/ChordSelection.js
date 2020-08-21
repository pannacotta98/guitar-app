import React, { Component } from 'react';
import styled from 'styled-components';

const ChordNameHeading = styled.h1`
  text-align: center;
  color: white;
  font-size: 3rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const MainContainer = styled.div`
  background-color: #363636;
  padding: 2rem 1rem;
  box-shadow: var(--main-shadow);
  position: relative;
`;

// TODO Use variables for main colors and shadow probably
const TestButton = styled.button`
  background-color: #464646;
  border: none;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.2rem;
  border-radius: 0.8rem;
  /* -webkit-box-shadow: 10px 10px 13px -3px rgba(0, 0, 0, 0.52);
  -moz-box-shadow: 10px 10px 13px -3px rgba(0, 0, 0, 0.52); */
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.3);
  transition: 0.1s;
  cursor: pointer;

  :hover {
    background-color: #4f4f4f;
    box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.3);
  }

  :active {
    background-color: #3f3f3f;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.3);
  }

  :focus {
    /* outline: none; */
  }
`; // TODO check the browser prefix thing; needed?

export default class ChordSelection extends Component {
  render() {
    return (
      <MainContainer>
        <ChordNameHeading>Cbm7</ChordNameHeading>
        {/* <ChordNameHeading>C{'\u266d'}m7</ChordNameHeading> */}
        {/* <ChordNameHeading>C♯m7</ChordNameHeading> */}
        <TestButton>hej</TestButton>
      </MainContainer>
    );
  }
}
