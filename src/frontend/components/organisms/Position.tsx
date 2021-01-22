import styled from 'styled-components';
import React from 'react';
import { parseTime } from '../../utils/funcs/parseTime';

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: splace-between;
  width: 100%;
  margin: 10px 0;
  p {
    &:first-child {
      width: 15%;
    }
    &:nth-child(2) {
      width: 45%;
      overdflow: hidden;
    }
    &:nth-child(3) {
      width: 20%;
    }
    &:nth-child(4) {
      width: 20%;
    }
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
