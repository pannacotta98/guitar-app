import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import isDev from './../logic/util';
import { LimitedWidthBox } from './basicStyledElements';

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

const TextLogo = styled.h3`
  display: inline;
`;

const navLinkClassName = ({ isActive }: { isActive: boolean }) => (isActive ? 'selected' : '');

export function NavBar() {
  return (
    <LimitedWidthBox>
      <TextLogo>WORK IN PROGRESS{isDev() && ' [in dev env]'}</TextLogo>
      <Navigation>
        <NavigationItem>
          <NavLink to="/scales" className={navLinkClassName}>
            Scales
          </NavLink>
        </NavigationItem>
        {isDev() && (
          <>
            <NavigationItem>
              <NavLink to="/chords" className={navLinkClassName}>
                Chords
              </NavLink>
            </NavigationItem>

            <NavigationItem>
              <NavLink to="/test" className={navLinkClassName}>
                Test
              </NavLink>
            </NavigationItem>
          </>
        )}
      </Navigation>
    </LimitedWidthBox>
  );
}

