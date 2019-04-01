import React, { SFC } from 'react';
import { Query } from "react-apollo";
import { RouteComponentProps, match, Link } from 'react-router-dom';
import gql from "graphql-tag";
import PosterList from '../../components/poster-list'
import PosterLink from '../../components/poster-link'
import Poster, { PosterSize } from '../../components/poster';
import { MovieDetailsResponse, MovieDetailsVariable } from '../../types/Api';
import {
  Container,
  I,
  Main,
  Details,
  Title,
  TagLine,
  Overview,
} from './Components';

class MovieDetailsQuery extends Query<MovieDetailsResponse, MovieDetailsVariable> {}

interface Props extends RouteComponentProps {
  match: match<{ id: string }>;
}

const movieQuery = gql`
  query Movie($id: Int!) {
    movie(id: $id) {
      title
      tagline
      overview
      poster_path
      backdrop_path
      release_date
      cast {
        name
        id
        profile_path
      }
    }
  }
`;

const Movie: SFC<Props> = ({ match }) => {
  const id = match.params.id;

  return (
    <MovieDetailsQuery query={ movieQuery } variables={ { id: Number(id) } }>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        if (!data) return <p>Sad No Data :(</p>;

        return (
          <Container backDrop={ data.movie.backdrop_path }>
            <Link to="/">
              <I className="material-icons">
                home
              </I>
            </Link>
            <Main>
              <div>                
                <Poster
                  title={ data.movie.title }
                  path={ data.movie.poster_path }
                  size={ PosterSize.M }
                />
              </div>
              <Details>
                <Title>{ data.movie.title }</Title>
                <TagLine>{ data.movie.release_date }</TagLine>
                <TagLine>{ data.movie.tagline }</TagLine>
                <Overview>{ data.movie.overview }</Overview>
              </Details>
            </Main>
            <TagLine>Cast</TagLine>
            <PosterList>              
              {
                data.movie.cast.map((person) =>
                  <PosterLink
                    key={ person.id }
                    to={`/people/${person.id}`}
                    title={person.name}
                    path={ person.profile_path }
                  />
                )
              }
            </PosterList>
          </Container>
          
        )
      }}
    </MovieDetailsQuery>
   )
}

export default Movie;