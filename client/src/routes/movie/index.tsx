import React, { SFC } from 'react';
import styled from 'styled-components';
import { Query } from "react-apollo";
import { RouteComponentProps, match, Link } from 'react-router-dom';
import gql from "graphql-tag";
import PosterList from '../../components/poster-list'
import PosterLink from '../../components/poster-link'
import Poster, { PosterSize } from '../../components/poster';

const Container = styled.div<{ backDrop: string }>`
  overflow: scroll;
  color: #FFF;
  background: ${(p: { backDrop: string }) => `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${ p.backDrop })`};
  background-size: cover;
  background-repeat:   no-repeat;
  background-position: center center; 
  height: 100vh;
  width: 100vw;
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
  const TagLine = styled.div`
  margin: 10px;
  color: #CCC;
  font-size: 1.25rem;
  `;
  const Overview = styled.div`
  margin: 10px;
  color: #CCC;
  font-size: 1rem;
`;

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
    <Query query={ movieQuery } variables={ { id: Number(id) } }>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
          <Container backDrop={ data.movie.backdrop_path }>
            <Link to="/">
              <I className="material-icons">
                home
              </I>
            </Link>
            <Main>              
              <Poster
                title={ data.movie.title }
                path={ data.movie.poster_path }
                size={ PosterSize.M }
              />
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
                data.movie.cast.map((person: any) =>
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
    </Query>
   )
}

export default Movie;