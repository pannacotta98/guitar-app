import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  border-radius: 0.5rem;
  /* appearance: none; */

  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  /* width: 100%; */
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;

  display: inline-block;
  background-color: var(--glass-color);

  outline: none;

  /* padding: 0.4rem + 0.4rem 0.9rem */
  padding: 0.8rem 1.3rem;

  color: var(--dimmer-text-color); ;
`;

interface Props {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
}

export function Dropdown({ options, selected, setSelected }: Props) {
  return (
    <Select value={selected} onChange={(event) => setSelected(event.target.value)}>
      {options.map((name) => (
        <option key={name}>{name}</option>
      ))}
    </Select>
  );
}
