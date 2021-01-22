import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getTopics: Array<Topic>;
  getRanking: RankingResponse;
  getQuestion?: Maybe<Question>;
  generateTrivia: TriviaResponse;
};


export type QueryGetRankingArgs = {
  id: Scalars['Int'];
};


export type QueryGetQuestionArgs = {
  id: Scalars['Int'];
};


export type QueryGenerateTriviaArgs = {
  topicId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
  username: Scalars['String'];
  ranks?: Maybe<Position>;
};

export type Position = {
  __typename?: 'Position';
  id: Scalars['Float'];
  user: User;
  points: Scalars['Int'];
  seconds: Scalars['Int'];
  ranking: Ranking;
};

export type Ranking = {
  __typename?: 'Ranking';
  id: Scalars['Float'];
  positions: Array<Position>;
};

export type Topic = {
  __typename?: 'Topic';
  id: Scalars['Float'];
  name: Scalars['String'];
  questions: Array<Question>;
  ranking: Ranking;
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['Float'];
  topic: Topic;
  statement: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  answers: Array<Answer>;
};

export type Answer = {
  __typename?: 'Answer';
  id: Scalars['Float'];
  question: Question;
  image?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type RankingResponse = {
  __typename?: 'RankingResponse';
  errors?: Maybe<Array<FieldError>>;
  ranking?: Maybe<Ranking>;
  topic?: Maybe<Topic>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type TriviaResponse = {
  __typename?: 'TriviaResponse';
  errors?: Maybe<Array<FieldError>>;
  questions?: Maybe<Array<Question>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createTopic: TopicResponse;
  insertQuestion: TopicResponse;
  deleteQuestion: Scalars['Boolean'];
  sendResults: SendResponse;
};


export type MutationRegisterArgs = {
  options: FullUserInput;
};


export type MutationLoginArgs = {
  options: UserInput;
};


export type MutationCreateTopicArgs = {
  name: Scalars['String'];
};


export type MutationInsertQuestionArgs = {
  topicId: Scalars['Int'];
  choices: Array<Scalars['String']>;
  statement: Scalars['String'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['Int'];
};


export type MutationSendResultsArgs = {
  answers: Array<Scalars['Int']>;
  questions: Array<Scalars['Int']>;
  seconds: Scalars['Int'];
  topicId: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FullUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TopicResponse = {
  __typename?: 'TopicResponse';
  errors?: Maybe<Array<FieldError>>;
  topic?: Maybe<Topic>;
};

export type SendResponse = {
  __typename?: 'SendResponse';
  errors?: Maybe<Array<FieldError>>;
  points: Scalars['Int'];
  seconds: Scalars['Int'];
  results?: Maybe<Array<Result>>;
};

export type Result = {
  __typename?: 'Result';
  correct: Scalars['Boolean'];
  message: Scalars['String'];
};

export type GenerateTriviaQueryVariables = Exact<{
  topicId: Scalars['Int'];
}>;


export type GenerateTriviaQuery = (
  { __typename?: 'Query' }
  & { generateTrivia: (
    { __typename?: 'TriviaResponse' }
    & { questions?: Maybe<Array<(
      { __typename?: 'Question' }
      & Pick<Question, 'id'>
    )>> }
  ) }
);

export type GetQuestionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetQuestionQuery = (
  { __typename?: 'Query' }
  & { getQuestion?: Maybe<(
    { __typename?: 'Question' }
    & Pick<Question, 'id' | 'statement'>
    & { answers: Array<(
      { __typename?: 'Answer' }
      & Pick<Answer, 'id' | 'message'>
    )> }
  )> }
);

export type GetRankingQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetRankingQuery = (
  { __typename?: 'Query' }
  & { getRanking: (
    { __typename?: 'RankingResponse' }
    & { topic?: Maybe<(
      { __typename?: 'Topic' }
      & Pick<Topic, 'name'>
    )>, ranking?: Maybe<(
      { __typename?: 'Ranking' }
      & { positions: Array<(
        { __typename?: 'Position' }
        & Pick<Position, 'id' | 'points' | 'seconds'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'username'>
        ) }
      )> }
    )> }
  ) }
);

export type GetTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopicsQuery = (
  { __typename?: 'Query' }
  & { getTopics: Array<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id' | 'name'>
  )> }
);

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )> }
);

export type SendResultsMutationVariables = Exact<{
  topicId: Scalars['Int'];
  questions: Array<Scalars['Int']> | Scalars['Int'];
  answers: Array<Scalars['Int']> | Scalars['Int'];
  seconds: Scalars['Int'];
}>;


export type SendResultsMutation = (
  { __typename?: 'Mutation' }
  & { sendResults: (
    { __typename?: 'SendResponse' }
    & Pick<SendResponse, 'seconds' | 'points'>
    & { results?: Maybe<Array<(
      { __typename?: 'Result' }
      & Pick<Result, 'correct' | 'message'>
    )>> }
  ) }
);

export type LogInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username?: Maybe<Scalars['String']>;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);


export const GenerateTriviaDocument = gql`
    query GenerateTrivia($topicId: Int!) {
  generateTrivia(topicId: $topicId) {
    questions {
      id
    }
  }
}
    `;

/**
 * __useGenerateTriviaQuery__
 *
 * To run a query within a React component, call `useGenerateTriviaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateTriviaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateTriviaQuery({
 *   variables: {
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useGenerateTriviaQuery(baseOptions: Apollo.QueryHookOptions<GenerateTriviaQuery, GenerateTriviaQueryVariables>) {
        return Apollo.useQuery<GenerateTriviaQuery, GenerateTriviaQueryVariables>(GenerateTriviaDocument, baseOptions);
      }
export function useGenerateTriviaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateTriviaQuery, GenerateTriviaQueryVariables>) {
          return Apollo.useLazyQuery<GenerateTriviaQuery, GenerateTriviaQueryVariables>(GenerateTriviaDocument, baseOptions);
        }
export type GenerateTriviaQueryHookResult = ReturnType<typeof useGenerateTriviaQuery>;
export type GenerateTriviaLazyQueryHookResult = ReturnType<typeof useGenerateTriviaLazyQuery>;
export type GenerateTriviaQueryResult = Apollo.QueryResult<GenerateTriviaQuery, GenerateTriviaQueryVariables>;
export const GetQuestionDocument = gql`
    query GetQuestion($id: Int!) {
  getQuestion(id: $id) {
    id
    statement
    answers {
      id
      message
    }
  }
}
    `;

/**
 * __useGetQuestionQuery__
 *
 * To run a query within a React component, call `useGetQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetQuestionQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionQuery, GetQuestionQueryVariables>) {
        return Apollo.useQuery<GetQuestionQuery, GetQuestionQueryVariables>(GetQuestionDocument, baseOptions);
      }
export function useGetQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionQuery, GetQuestionQueryVariables>) {
          return Apollo.useLazyQuery<GetQuestionQuery, GetQuestionQueryVariables>(GetQuestionDocument, baseOptions);
        }
export type GetQuestionQueryHookResult = ReturnType<typeof useGetQuestionQuery>;
export type GetQuestionLazyQueryHookResult = ReturnType<typeof useGetQuestionLazyQuery>;
export type GetQuestionQueryResult = Apollo.QueryResult<GetQuestionQuery, GetQuestionQueryVariables>;
export const GetRankingDocument = gql`
    query GetRanking($id: Int!) {
  getRanking(id: $id) {
    topic {
      name
    }
    ranking {
      positions {
        id
        points
        seconds
        user {
          username
        }
      }
    }
  }
}
    `;

/**
 * __useGetRankingQuery__
 *
 * To run a query within a React component, call `useGetRankingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRankingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRankingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRankingQuery(baseOptions: Apollo.QueryHookOptions<GetRankingQuery, GetRankingQueryVariables>) {
        return Apollo.useQuery<GetRankingQuery, GetRankingQueryVariables>(GetRankingDocument, baseOptions);
      }
export function useGetRankingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRankingQuery, GetRankingQueryVariables>) {
          return Apollo.useLazyQuery<GetRankingQuery, GetRankingQueryVariables>(GetRankingDocument, baseOptions);
        }
export type GetRankingQueryHookResult = ReturnType<typeof useGetRankingQuery>;
export type GetRankingLazyQueryHookResult = ReturnType<typeof useGetRankingLazyQuery>;
export type GetRankingQueryResult = Apollo.QueryResult<GetRankingQuery, GetRankingQueryVariables>;
export const GetTopicsDocument = gql`
    query GetTopics {
  getTopics {
    id
    name
  }
}
    `;

/**
 * __useGetTopicsQuery__
 *
 * To run a query within a React component, call `useGetTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopicsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopicsQuery, GetTopicsQueryVariables>) {
        return Apollo.useQuery<GetTopicsQuery, GetTopicsQueryVariables>(GetTopicsDocument, baseOptions);
      }
export function useGetTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicsQuery, GetTopicsQueryVariables>) {
          return Apollo.useLazyQuery<GetTopicsQuery, GetTopicsQueryVariables>(GetTopicsDocument, baseOptions);
        }
export type GetTopicsQueryHookResult = ReturnType<typeof useGetTopicsQuery>;
export type GetTopicsLazyQueryHookResult = ReturnType<typeof useGetTopicsLazyQuery>;
export type GetTopicsQueryResult = Apollo.QueryResult<GetTopicsQuery, GetTopicsQueryVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logout
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, baseOptions);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SendResultsDocument = gql`
    mutation SendResults($topicId: Int!, $questions: [Int!]!, $answers: [Int!]!, $seconds: Int!) {
  sendResults(
    topicId: $topicId
    questions: $questions
    answers: $answers
    seconds: $seconds
  ) {
    seconds
    points
    results {
      correct
      message
    }
  }
}
    `;
export type SendResultsMutationFn = Apollo.MutationFunction<SendResultsMutation, SendResultsMutationVariables>;

/**
 * __useSendResultsMutation__
 *
 * To run a mutation, you first call `useSendResultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendResultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendResultsMutation, { data, loading, error }] = useSendResultsMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      questions: // value for 'questions'
 *      answers: // value for 'answers'
 *      seconds: // value for 'seconds'
 *   },
 * });
 */
export function useSendResultsMutation(baseOptions?: Apollo.MutationHookOptions<SendResultsMutation, SendResultsMutationVariables>) {
        return Apollo.useMutation<SendResultsMutation, SendResultsMutationVariables>(SendResultsDocument, baseOptions);
      }
export type SendResultsMutationHookResult = ReturnType<typeof useSendResultsMutation>;
export type SendResultsMutationResult = Apollo.MutationResult<SendResultsMutation>;
export type SendResultsMutationOptions = Apollo.BaseMutationOptions<SendResultsMutation, SendResultsMutationVariables>;
export const LogInDocument = gql`
    mutation LogIn($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, baseOptions);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($email: String!, $password: String!, $username: String) {
  register(options: {email: $email, password: $password, username: $username}) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;