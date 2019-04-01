import React, { SFC } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import styled from 'styled-components';
import Home from './routes/home';
import Movie from './routes/movie';
import Person from './routes/person';
import './App.css';

const Container = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/assets/background.jpg);
  overflow: scroll;
  color: #FFF;
  background-size: cover;
  background-repeat:   no-repeat;
  background-position: center center; 
  height: 100vh;
  width: 100vw;
`;

const client = new ApolloClient({
  uri: "/graphql"
});

const App: SFC<unknown> = () => {
  return (
    <ApolloProvider client={ client }>        
      <Router>
        <Container>          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/people/:id" component={Person} />
            <Route exact path="/movie/:id" component={Movie} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
