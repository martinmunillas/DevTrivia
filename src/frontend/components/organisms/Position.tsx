import styled from 'styled-components';
import React from 'react';

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: 0 10px;
  }
`;

interface PositionProps {
  user: {
    username: string;
  };
  points: number | string;
  pos: number;
  seconds: number | string;
}

const Position: React.FC<PositionProps> = ({ user, points, seconds, pos }) => {
  const parseTime = (s: number) => {
    let sec = 0;
    let min = 0;
    sec = s % 60;
    min = parseInt((s / 60).toString());
    return min + 'm' + sec + 's';
  };

  return (
    <Style>
      <p>{pos ? pos : ''}</p>
      <p>{user.username}</p>
      <p>{points}</p>
      <p>{typeof seconds === 'number' ? parseTime(seconds) : seconds}</p>
    </Style>
  );
};

export default Position;
