import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navigation = styled.ul`
  display: inline;
  list-style-type: none;
`;

const NavigationItem = styled.li`
  margin-left: 2.5rem;
  font-weight: 600;
  cursor: pointer;
  display: inline;

  a {
    color: inherit;
    text-decoration: none;
  }
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
      <Navigation>
        <NavigationItem>
          <Link to="/scales">Scales</Link>
        </NavigationItem>
        <NavigationItem>
          <Link to="/">Chords</Link>
        </NavigationItem>
        <NavigationItem>
          <Link to="/test">Test</Link>
        </NavigationItem>
      </Navigation>
    </NavContainer>
  );
}
