import React from 'react';
import styled from 'styled-components';
import { Button } from '../atoms/Button';
import { Title } from '../atoms/Title';

interface InstructionsProps {
  next: () => void;
}

const Li = styled.li`
  margin: 10px 0;
`;
const Instructions: React.FC<InstructionsProps> = ({ next }) => {
  return (
    <>
      <Title>Instructions</Title>
      <ul>
        <Li>You'll have 20 minutes max</Li>
        <Li>There will be 20 questions</Li>
        <Li>You will only see your mistakes when you finish</Li>
        <Li>You can re-attempt as many times as you want</Li>
      </ul>
      <Button onClick={() => next()}>Next 🡪</Button>
    </>
  );
};

export default Instructions;
