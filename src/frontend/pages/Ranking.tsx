import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Title } from '../components/atoms/Title';
import Position from '../components/organisms/Position';
import { useGetRankingQuery } from '../generated/graphql';
import { useRouter } from '../utils/hooks/useRouter';

interface RankingProps {}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Ranking: React.FC<RankingProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useGetRankingQuery({
    variables: { id: parseInt(router.params.topicId!) },
  });
  if (loading) return <Title>Loading...</Title>;
  else if (!loading && !data?.getRanking.topic) return <Title>Not Found</Title>;

  return (
    <Box>
      <Link to='/'>🡨 Home</Link>
      <Title>{data?.getRanking.topic?.name}</Title>
      <Position
        user={{ username: 'Username' }}
        points='Points'
        seconds='Time'
        pos={0}
      />

      {data?.getRanking.ranking?.positions.map((position, i) => (
        <Position {...position} key={position.id} pos={i + 1} />
      ))}
    </Box>
  );
};

export default Ranking;
