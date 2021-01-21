import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface TopicCardProps {
  id: number;
  name: string;
}

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  background: transparent;
  border: 5px solid #21486a;
  border-radius: 20px;
  padding: 20px;
  margin: 10px 0;
  font-size: 20px;
  width: 100%;

  a {
    font-size: 16px;
    margin-left: 10px;
  }
`;

const TopicCard: React.FC<TopicCardProps> = ({ id, name }) => {
  return (
    <Box>
      <p>{name}</p>
      <div>
        <Link to={`/t/${id}`}>Make an attempt</Link>
        <Link to={`/r/${id}`}>Ranking</Link>
      </div>
    </Box>
  );
};

export default TopicCard;
