import React, { useState } from 'react';
import { Title } from '../components/atoms/Title';
import Question from '../components/organisms/Question';
import { useGenerateTriviaQuery } from '../generated/graphql';
import { useRouter } from '../utils/hooks/useRouter';

interface TriviaProps {}

const Trivia: React.FC<TriviaProps> = ({}) => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const { data, loading } = useGenerateTriviaQuery({
    variables: { topicId: parseInt(router.params.topicId!) },
  });

  const next = () => {
    setPage(page + 1);
  };

  if (loading) return <Title>Loading...</Title>;
  else if (!loading && !data?.generateTrivia.questions)
    return <Title>Not Found</Title>;

  return (
    <Question
      questions={data.generateTrivia.questions}
      page={page}
      next={next}
    />
  );
};

export default Trivia;
