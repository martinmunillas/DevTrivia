import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Result, { ResultsProps } from '../components/organisms/Results';

import { Title } from '../components/atoms/Title';
import Congrats from '../components/organisms/Congrats';
import Instructions from '../components/organisms/Instructions';
import Question from '../components/organisms/Question';
import {
  useGenerateTriviaQuery,
  useSendResultsMutation,
} from '../generated/graphql';
import { useRouter } from '../utils/hooks/useRouter';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface TriviaProps {}

const Trivia: React.FC<TriviaProps> = ({}) => {
  const router = useRouter();

  const [page, setPage] = useState<number>(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState<number>(-1);
  const [time, setTime] = useState(20 * 60);
  const [results, setResults] = useState({});

  const { data, loading } = useGenerateTriviaQuery({
    variables: { topicId: parseInt(router.params.topicId!) },
  });

  const [send, { loading: ll }] = useSendResultsMutation();

  let interval: NodeJS.Timeout;

  useEffect(() => {
    if (page > 0) {
      interval = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
    return () => clearTimeout(interval);
  }, [page, time]);

  const next = (prev?: number) => {
    if (prev)
      setAnswers({
        ...answers,
        [prev]: selected,
      });

    setPage(page + 1);
    setSelected(0);
  };

  const finish = async () => {
    const variables = {
      answers: Object.values(answers) as number[],
      questions: Object.keys(answers).map((a) => parseInt(a)) as number[],
      seconds: 1200 - time,
      topicId: parseInt(router.params.topicId!),
    };
    try {
      const response = await send({
        variables,
      });
      setResults(response.data?.sendResults || {});
      console.log(response);
      next();
    } catch (error) {
      console.log(error);
    }
  };

  const questionArray = (q: any[]) => {
    const arr: number[] = [];
    q.forEach((w) => arr.push(w.id));
    return arr;
  };

  if (loading || ll) return <Title>Loading...</Title>;

  const questions = questionArray(data!.generateTrivia.questions!);
  const isLastPage = page === questions.length + 2;
  const isFirstPage = page === 0;
  const isCongratsPage = page === questions.length + 1;

  if (!isFirstPage && !isLastPage && !isCongratsPage) {
    if (!loading && !data?.generateTrivia.questions?.length)
      return <Title>Not Found</Title>;
  }

  if (isFirstPage)
    return (
      <Box>
        <Instructions next={next} />
      </Box>
    );
  else if (isCongratsPage)
    return (
      <Box>
        <Congrats finish={finish} />
      </Box>
    );
  else if (isLastPage)
    return (
      <Box>
        <Result
          {...(results as ResultsProps)}
          topicId={parseInt(router.params.topicId!)}
        />
      </Box>
    );
  else
    return (
      <Box>
        <Question
          next={next}
          selected={selected}
          setSelected={setSelected}
          id={questions[page - 1]}
          skip={isFirstPage || isLastPage || isCongratsPage}
          time={time}
          number={[page, questions.length]}
        />
      </Box>
    );
};

export default Trivia;
