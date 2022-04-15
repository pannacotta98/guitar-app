import React from 'react';
import styled from 'styled-components';

export const PageBox = styled.div`
  padding: var(--left-right-page-padding);
`;

const LimitedWidthBoxOuter = styled.div`
  padding-left: var(--left-right-page-padding);
  padding-right: var(--left-right-page-padding);
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LimitedWidthBoxInner = styled.div`
  max-width: var(--page-max-width);
  flex-grow: 1;
`;
export function LimitedWidthBox({ children }: { children?: JSX.Element | JSX.Element[] }) {
  return (
    <LimitedWidthBoxOuter>
      <LimitedWidthBoxInner>{children}</LimitedWidthBoxInner>
    </LimitedWidthBoxOuter>
  );
}

