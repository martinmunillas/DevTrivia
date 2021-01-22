import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { parseTime } from '../../utils/funcs/parseTime';
import { Title } from '../atoms/Title';

const Question = styled.p<{ correct: boolean }>`
  margin: 10px 0;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  border: 3px solid ${(props) => (props.correct ? '#25c02b' : '#dd1b1b')};
  box-shadow: 1px 1px 21px -2px rgba(0, 0, 0, 0.69);
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export interface ResultsProps {
  points: number;
  seconds: number;
  topicId: number;
  results: { correct: boolean; message: string }[];
}

const Results: React.FC<ResultsProps> = ({
  points,
  seconds,
  results,
  topicId,
}) => {
  return (
    <>
      <Link to={`/r/${topicId}`}>
        <Title>See Ranking</Title>
      </Link>
      <Flex>
        <p>Points: {points}</p>
        <p>Time: {parseTime(seconds)}</p>
      </Flex>
      {results.map((result) => (
        <Question correct={result.correct}>{result.message}</Question>
      ))}
    </>
  );
};

export default Results;
