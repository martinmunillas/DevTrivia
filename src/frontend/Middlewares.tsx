import React from 'react';
import RequireAuth from './components/middlewares/RequireAuth';

interface MiddlewaresProps {}

const Middlewares: React.FC<MiddlewaresProps> = ({}) => {
  return (
    <>
      <RequireAuth />
    </>
  );
};

export default Middlewares;
