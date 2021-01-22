import React, { useState } from 'react';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Error } from '../components/atoms/Error';
import { Title } from '../components/atoms/Title';
import { useLogInMutation } from '../generated/graphql';
import { mapError } from '../utils/funcs/mapError';
import { Form } from '../components/atoms/Form';
import { Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useRouter } from '../utils/hooks/useRouter';

interface SignInProps {}

const SignIn: React.FC<SignInProps> = ({}) => {
  const initalState = {
    email: '',
    password: '',
  };
  const [form, setForm] = useState(initalState);
  const [error, setError] = useState('');

  const [login, { loading }] = useLogInMutation();
  
  const apolloClient = useApolloClient();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login({ variables: form });
    if (!response.data?.login.errors) {
      setForm(initalState);
      await apolloClient.resetStore();
      router.push('/');
    } else {
      setError(mapError(response.data?.login.errors));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Form onSubmit={handleSignIn}>
      <Title>Sign In!</Title>
      {error ? <Error>{error}</Error> : null}
      <Input
        type='text'
        placeholder='Email...'
        name='email'
        value={form.email}
        onChange={handleChange}
      />
      <Input
        type='password'
        placeholder='Password...'
        name='password'
        value={form.password}
        onChange={handleChange}
      />
      <Button>Sign in!</Button>
      {loading ? <p>Loading...</p> : null}
      <Link to='/sign-up'>Create an account</Link>
    </Form>
  );
};

export default SignIn;
