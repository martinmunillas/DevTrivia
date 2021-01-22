import React from 'react';
import { Button } from '../atoms/Button';
import { Title } from '../atoms/Title';

interface InstructionsProps {
  finish: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ finish }) => {
  return (
    <>
      <Title>Congratulations, you finished finished🎉!</Title>
      <Button onClick={finish}>See results</Button>
    </>
  );
};

export default Instructions;
