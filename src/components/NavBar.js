import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: ${(props) => props.theme.colors.mainAccent};
  color: ${(props) => props.theme.colors.contrastingText};
  padding: 1.2rem;
  box-shadow: ${(props) => props.theme.shadows.main};
  position: relative;
  z-index: 10;
`;

export default function NavBar() {
  return (
    <NavContainer>
      <h3>LOGO</h3>
    </NavContainer>
  );
}
