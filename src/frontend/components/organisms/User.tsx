import { useApolloClient } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLogOutMutation, useMeQuery } from '../../generated/graphql';

interface UserProps {}

const UserBox = styled.div`
  display: flex;
  position: absolute;
  top: 15px;
  right: 15px;

  p, a {
    margin: 0 10px;
    color: #000000;
    &:nth-child(3) {
      cursor: pointer;
    }
  }
`;

const User: React.FC<UserProps> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { loading: ll }] = useLogOutMutation();
  const apolloClient = useApolloClient();

  const handleClick = async () => {
    await logout();
    await apolloClient.resetStore();
  };

  return (
    <UserBox>
      {loading || ll ? (
        <p>Loading...</p>
      ) : data?.me ? (
        <>
          <p>{data?.me?.username}</p>
          <Link to='/'>Home</Link>
          <p onClick={handleClick}>Logout</p>
        </>
      ) : null}
    </UserBox>
  );
};

export default User;
