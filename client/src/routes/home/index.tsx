import React, { SFC, useState } from 'react';
import { Query } from "react-apollo";
import { RouteProps } from 'react-router-dom';
import gql from "graphql-tag";
import {
  Container,
  Main,
  Details,
  Title,
  Overview,
  PageNav,
} from './Components';
import PosterList from '../../components/poster-list'
import PosterLink, { PosterSize } from '../../components/poster-link'
import Search from '../../components/search'
import useDebounce from '../../hooks/debounce';
import { MovieResponse, MovieVariables } from '../../types/Api';

class MovieQuery extends Query<MovieResponse, MovieVariables> {}

const query = gql`
  query Movies($search: String, $page: Int){
    movies(search: $search, page: $page) {
      page
      hasNextPage
      hasPrevPage
      movies {
        id
        title
        poster_path
        overview
      }
    }
  }
`;

const Home: SFC<RouteProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce<string>(search, 500);
  
  return (
    <Container>
      <Main>
        <Search onChange={ e => setSearch(e.target.value) } />
        <MovieQuery query={ query } variables={{ search: debouncedSearchTerm, page }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            if (!data) return <p>Sad there is no data</p>;
              
            return (
            <>
              <PosterList>
                { data.movies.hasPrevPage &&
                  <PageNav onClick={ () => setPage(page - 1) }>
                    <i className="material-icons">
                      navigate_before
                    </i>
                  </PageNav>
                }
                {                      
                  data.movies.movies.map((movie, i) => (
                    <PosterLink
                      onMouseEnter={ () => setActiveIndex(i) }
                      onFocus={ () => setActiveIndex(i) }
                      key={movie.id}
                      to={ `/movie/${movie.id}` }
                      path={ movie.poster_path }
                      title={ movie.title }
                      size={ PosterSize.M }
                    />
                  ))
                }
                { data.movies.hasNextPage &&
                  <PageNav onClick={ () => setPage(page + 1) }>
                    <i className="material-icons">
                      navigate_next
                    </i>
                  </PageNav>
                }
              </PosterList>
              <Details>
                <Title>
                  {data.movies.movies[activeIndex].title}
                </Title>
                <Overview>
                  { data.movies.movies[activeIndex].overview }
                </Overview>
              </Details>
            </>
            );
          }}
        </MovieQuery>
      </Main>
    </Container>
   )
}

export default Home;