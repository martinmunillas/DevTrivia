import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import GlobalStyle from './styles/globalStyles';
import Middlewares from './Middlewares';
import Home from './pages/Home';
import { Phone } from './components/atoms/Phone';
import { Flex } from './components/atoms/Flex';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Ranking from './pages/Ranking';
import Trivia from './pages/Trivia';
import User from './components/organisms/User';
import { Scroller } from './components/atoms/Scroller';

const history = createBrowserHistory();

export const client = new ApolloClient({
  uri: '/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <Flex>
      <Phone>
        <ApolloProvider client={client}>
          <Router history={history}>
            <GlobalStyle />
            <BrowserRouter>
              <Middlewares />
              <User />
              <Scroller>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/sign-in' component={SignIn} />
                  <Route exact path='/sign-up' component={SignUp} />
                  <Route exact path='/r/:topicId' component={Ranking} />
                  <Route exact path='/t/:topicId' component={Trivia} />
                </Switch>
              </Scroller>
            </BrowserRouter>
          </Router>
        </ApolloProvider>
      </Phone>
    </Flex>
  );
};

export default App;
