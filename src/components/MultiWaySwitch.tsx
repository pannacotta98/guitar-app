import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: inline-block;
  background-color: var(--glass-color);
  padding: 0.4rem;
  border-radius: 0.5rem;
`;

const Label = styled(motion.div)<{ selected: boolean }>`
  div {
    padding: 0.6rem 0.9rem;
  }
  display: inline-block;
  cursor: pointer;
  transition-duration: 100ms;
  &:hover {
    color: var(--main-accent);
  }
`;

const Handle = styled(motion.div)`
  border-radius: 0.4rem;
  background-color: var(--dark-background);
  color: white;
`;

interface Props {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
}

export function MultiWaySwitch({ options, selected, setSelected }: Props) {
  return (
    <Container>
      {options.map((el) => (
        <Label key={el} selected={el === selected} onClick={() => setSelected(el)}>
          {el === selected ? (
            <Handle className="handle" layoutId="selected">
              {el}
            </Handle>
          ) : (
            <div>{el}</div>
          )}
        </Label>
      ))}
    </Container>
  );
}

