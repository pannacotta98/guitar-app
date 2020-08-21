import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #5c326b;
  color: white;
  padding: 1.2rem;
  box-shadow: var(--main-shadow);
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
