import React, { SFC } from 'react';
import { Query } from "react-apollo";
import { RouteComponentProps, match, Link } from 'react-router-dom';
import gql from "graphql-tag";
import PosterLink from '../../components/poster-link'
import PosterList from '../../components/poster-list'
import Poster, { PosterSize } from '../../components/poster';
import {
  Container,
  I,
  Main,
  Details,
  Title,
  Overview,
} from './Components';
import { ActorDetailsResponse, ActorDetailsVariable } from '../../types/Api';

class ActorDetailsQuery extends Query<ActorDetailsResponse, ActorDetailsVariable> {}

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
    <ActorDetailsQuery query={ personQuery } variables={ { id: Number(id) } }>
      {({ loading, error, data }) => {
        console.log('data: ', JSON.stringify(data));
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        if (!data) return <p>Sad no data here.</p>

        return (
          <Container>
            <Link to="/">
              <I className="material-icons">
                home
              </I>
            </Link>
            <Main>
              <div>                
                <Poster
                  path={ data.person.profile_path }
                  title={ data.person.name }
                  size={ PosterSize.M }
                />
              </div>
              <Details>
                <Title>{ data.person.name }</Title>
                <Overview>{ data.person.biography }</Overview>
              </Details>
            </Main>
            <PosterList>
              {
                data.person.cast.map((movie) =>
                  <PosterLink
                    key={ movie.id }
                    to={`/movie/${movie.id}`}
                    title={movie.title}
                    path={ movie.poster_path }
                  />
                )
              }
            </PosterList>
          </Container>
        )
      }}
    </ActorDetailsQuery>
   )
}

export default Person;