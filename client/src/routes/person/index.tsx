import React, { SFC, useState } from 'react';
import { Query } from "react-apollo";
import { RouteComponentProps, match, Link } from 'react-router-dom';
import gql from "graphql-tag";
import styled from 'styled-components';
import PosterLink from '../../components/poster-link'
import PosterList from '../../components/poster-list'
import Poster, { PosterSize } from '../../components/poster';

const Container  = styled.div`
  color: #FFF;
`;

const I = styled.i`
  font-size: 2rem;
  padding: 0.5em;
  color: #FFF;
`;

const Main = styled.div`
  padding: 2em;
  display: flex;
  flex-wrap: wrap;
`;

const Details = styled.div`
  width: 350px;
  flex-shrink: 0;
  padding: .5em;
`;
const Title = styled.div`
  margin: 10px;
  font-size: 2rem;
`;
  const Overview = styled.div`
  margin: 10px;
  color: #CCC;
  font-size: 1rem;
`;

interface Props extends RouteComponentProps {
  match: match<{ id: string }>;
}

const personQuery = gql`
  query Person($id: Int!) {
    person(id: $id) {
      name
      id
      biography
      profile_path
      cast {
        title
        id
        poster_path
      }
    }
  }
`;

const Person: SFC<Props> = ({ match }) => {
  const id = match.params.id;

  return (
    <Query query={ personQuery } variables={ { id: Number(id) } }>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
          <Container>
            <Link to="/">
              <I className="material-icons">
                home
              </I>
            </Link>
            <Main>              
              <Poster
                path={ data.person.profile_path }
                title={ data.person.name }
                size={ PosterSize.M }
              />
              <Details>
                <Title>{ data.person.name }</Title>
                <Overview>{ data.person.biography }</Overview>
              </Details>
            </Main>
            <PosterList>
              {
                data.person.cast.map((movie: any) =>
                  <PosterLink
                    key={ movie.id }
                    to={`/movie/${movie.id}`}
                    title={movie.name}
                    path={ movie.poster_path }
                  />
                )
              }
            </PosterList>
          </Container>
        )
      }}
    </Query>
   )
}

export default Person;