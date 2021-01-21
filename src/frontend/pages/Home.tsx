import React from 'react';
import styled from 'styled-components';
import { Title } from '../components/atoms/Title';
import TopicCard from '../components/organisms/TopicCard';
import { useGetTopicsQuery } from '../generated/graphql';

interface HomeProps {}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Header = styled(Title)`
  align-self: center;
`;

const Home: React.FC<HomeProps> = ({}) => {
  const { data, loading } = useGetTopicsQuery();
  return (
    <Box>
      <Header>DevTrivia</Header>
      {loading ? <p>Loading...</p> : null}
      {!loading && data
        ? data.getTopics.map((topic) => <TopicCard {...topic} key={topic.id} />)
        : null}
    </Box>
  );
};

export default Home;
