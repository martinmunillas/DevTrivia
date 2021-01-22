import styled from 'styled-components';
import React from 'react';
import { Title } from '../atoms/Title';
import { parseTime } from '../../utils/funcs/parseTime';
import { Button } from '../atoms/Button';
import { useGetQuestionQuery } from '../../generated/graphql';

const Options = styled.p`
  margin: 10px 0;
  width: 100%;
  border: 1px solid #fff;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
`;

const Selected = styled(Options)`
  padding: 10px;
  border: 3px solid #519ce6;
  box-shadow: 1px 1px 21px -2px rgba(0, 0, 0, 0.69);
`;

const TimeLeft = styled.div<{ time: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => Math.min(props.time / 12, 100)}%;
  background: rgb(247, 81, 118);
  background: linear-gradient(
    90deg,
    rgba(247, 81, 118, 1) 0%,
    rgba(181, 111, 248, 1) 100%
  );
  height: 30px;
  border-radius: 50px;
`;

const Rounded = styled.div`
  width: 100%;
  border-radius: 50px;
  overflow: hidden;
  border: 5px solid #3f4768;
  position: relative;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Statement = styled.h2`
  margin: 10px 0;
  color: #fff;
  font-size: 18px;
  text-align: center;
`;

interface QuestionProps {
  next: (prev?: number) => void;
  setSelected: (aid: number) => void;
  selected: number;
  time: number;
  id: number;
  number: number[];
  skip: boolean;
}

const Question: React.FC<QuestionProps> = ({
  next,
  setSelected,
  selected,
  time,
  id,
  skip,
  number,
}) => {
  const { data, loading } = useGetQuestionQuery({
    variables: { id },
    skip,
  });

  if (loading) return <Title>Loading...</Title>;
  else if (!loading && !data?.getQuestion) return <Title>Not Found</Title>;

  return (
    <>
      <Rounded>
        <p>{parseTime(time)}</p>
        <TimeLeft time={time}></TimeLeft>
      </Rounded>
      <Title>
        Question {number[0]}/{number[1]}
      </Title>
      <Statement>{data?.getQuestion?.statement}</Statement>
      {data?.getQuestion?.answers.map((answer) =>
        answer.id === selected ? (
          <Selected key={answer.id}>{answer.message}</Selected>
        ) : (
          <Options key={answer.id} onClick={() => setSelected(answer.id)}>
            {answer.message}
          </Options>
        )
      )}
      <Button onClick={() => next(id)} disabled={!selected}>
        Next 🡪
      </Button>
    </>
  );
};

export default Question;
