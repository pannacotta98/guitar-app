import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../globalState';

const Navigation = styled.ul`
  display: inline;
  list-style-type: none;
`;

const NavigationItem = styled.li`
  margin-left: 2.5rem;
  font-weight: 600;
  cursor: pointer;
  display: inline;
`;

const NavContainer = styled.nav`
  background-color: var(--main-accent);
  color: var(--contrasting-text-color);
  padding: 1.2rem;
  box-shadow: var(--main-shadow);
  position: relative;
  z-index: 10;
`;

const TextLogo = styled.h3`
  display: inline;
`;

export default function NavBar() {
  return (
    <NavContainer>
      <TextLogo>LOGO</TextLogo>
      {/* prettier-ignore */}
      <Navigation>
        <GlobalContext.Consumer>
          {(context) => <>
            {/* TODO Make sure this isn't a terrible way to do this */}
            <NavigationItem onClick={() => context.setActivePane('SCALES')}>Scales</NavigationItem>
            <NavigationItem onClick={() => context.setActivePane('CHORD_NAMER')}>Chord Namer</NavigationItem>
            <NavigationItem onClick={() => context.setActivePane('TEST')}>Test</NavigationItem>
          </>}
        </GlobalContext.Consumer>
      </Navigation>
    </NavContainer>
  );
}
