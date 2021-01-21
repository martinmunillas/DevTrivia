import React from 'react';
import styled from 'styled-components';
import { useGetQuestionQuery } from '../../generated/graphql';
import { Button } from '../atoms/Button';
import { Title } from '../atoms/Title';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface QuestionProps {
  next: () => void;
  finish: () => void;
  setSelected: (qid: number, aid: number) => void;
  questions: number[];
  page: number;
  selected: number;
}

const Question: React.FC<QuestionProps> = ({
  page,
  questions,
  next,
  setSelected,
  selected,
  finish,
}) => {
  const { data, loading } = useGetQuestionQuery({
    variables: { id: questions[page - 1] },
    skip: page === 0,
  });

  if (page !== 0) {
    if (loading) return <Title>Loading...</Title>;
    else if (!loading && !data?.getQuestion) return <Title>Not Found</Title>;
  }

  const isLastPage = page === questions.length;
  const isFirstPage = page === 0;

  return isFirstPage ? (
    <Box>
      <Title>Instructions</Title>
      <p>You'll have 1.5 minutes per questions, there will be 20 questions total and </p>
      <Button onClick={isLastPage ? finish : next} disabled={!selected}>
        {isLastPage ? 'Finish' : 'Next 🡪'}
      </Button>
    </Box>
  ) : (
    <Box>
      <Title>{data?.getQuestion?.statement}</Title>
      {data?.getQuestion?.answers.map((answer) => (
        <p onClick={() => setSelected(data.getQuestion!.id, answer.id)}>
          {answer.message}
        </p>
      ))}
      <Button onClick={isLastPage ? finish : next} disabled={!selected}>
        {isLastPage ? 'Finish' : 'Next 🡪'}
      </Button>
    </Box>
  );
};

export default Question;
