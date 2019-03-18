import React, { SFC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import styled from 'styled-components';
import Home from './routes/home';
import Movie from './routes/movie';
import Person from './routes/person';
import './App.css';

const Container = styled.div`
  background: ${(p: any) => `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/assets/background.jpg)`};
  background-size: cover;
  background-repeat:   no-repeat;
  background-position: center center; 
  height: 100vh;
  width: 100vw;
`;

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const Code = () => (
  <div>
    Code
  </div>
)

const Contact = () => (
  <div>
    Contact
  </div>
)

const NoMatch = () => (
  <div>
    info
  </div>
)

const App: SFC<any> = () => {
  return (
    <ApolloProvider client={ client }>        
      <Router>
        <Container>          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/people/:id" component={Person} />
            <Route exact path="/movie/:id" component={Movie} />
            <Route component={ NoMatch } />
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
