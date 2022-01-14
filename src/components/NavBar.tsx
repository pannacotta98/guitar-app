import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Navigation = styled.ul`
  display: inline;
  list-style-type: none;
`;

const NavigationItem = styled.li`
  margin-left: 2.5rem;
  font-weight: 600;
  cursor: pointer;
  display: inline;

  .selected {
    border-bottom: var(--main-accent) solid 0.15rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const NavContainer = styled.nav`
  padding: 1.2rem var(--left-right-page-padding);
  position: relative;
  z-index: 10;
`;

const TextLogo = styled.h3`
  display: inline;
`;

const navLinkClassName = ({ isActive }: { isActive: boolean }) => (isActive ? 'selected' : '');

export function NavBar() {
  return (
    <NavContainer>
      <TextLogo>LOGO</TextLogo>
      <Navigation>
        <NavigationItem>
          <NavLink to="/scales" className={navLinkClassName}>
            Scales
          </NavLink>
        </NavigationItem>

        <NavigationItem>
          <NavLink to="/" className={navLinkClassName}>
            Chords
          </NavLink>
        </NavigationItem>

        <NavigationItem>
          <NavLink to="/test" className={navLinkClassName}>
            Test
          </NavLink>
        </NavigationItem>
      </Navigation>
    </NavContainer>
  );
}
