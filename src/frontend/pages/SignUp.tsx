import React, { useState } from 'react';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Error } from '../components/atoms/Error';
import { Title } from '../components/atoms/Title';
import { useSignUpMutation } from '../generated/graphql';
import { mapError } from '../utils/funcs/mapError';
import { Form } from '../components/atoms/Form';
import { Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useRouter } from '../utils/hooks/useRouter';

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = ({}) => {
  const initalState = {
    email: '',
    password: '',
    username: '',
  };
  const [form, setForm] = useState(initalState);
  const [error, setError] = useState('');

  const [signup, { loading }] = useSignUpMutation();

  const apolloClient = useApolloClient();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signup({ variables: form });
    if (!response.data?.register.errors) {
      setForm(initalState);
      await apolloClient.resetStore();
      router.push('/');
    } else {
      setError(mapError(response.data?.register.errors));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Form onSubmit={handleSignUp}>
      <Title>Sign Up!</Title>
      {error ? <Error>{error}</Error> : null}
      <Input
        type='text'
        placeholder='Email...'
        name='email'
        value={form.email}
        onChange={handleChange}
      />
      <Input
        type='text'
        placeholder='Username...'
        name='username'
        value={form.username}
        onChange={handleChange}
      />
      <Input
        type='password'
        placeholder='Password...'
        name='password'
        value={form.password}
        onChange={handleChange}
      />
      <Button>Sign Up!</Button>
      {loading ? <p>Loading...</p> : null}
      <p>
        Already have an account? <Link to='/sign-in'>Sign In!</Link>
      </p>
    </Form>
  );
};

export default SignUp;
