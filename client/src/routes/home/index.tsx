import React, { SFC, useState } from 'react';
import { Query } from "react-apollo";
import { RouteProps } from 'react-router-dom';
import gql from "graphql-tag";
import styled from 'styled-components';
import PosterList from '../../components/poster-list'
import PosterLink, { PosterSize } from '../../components/poster-link'
import Search from '../../components/search'
import useDebounce from '../../hooks/debounce';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Details = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1.5em;
  color: #FFF;
  text-align: left:
`;

const Title = styled.div`
  font-size: 1.5rem;
`;

const Overview = styled.div`
  font-size: 1.25rem;
  color: #CCC;
`;

const PageNav = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 513px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #FFF;
  > i {
    font-size: 5rem;
  }
`;

  let query = gql`
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
  const debouncedSearchTerm = useDebounce(search, 500);
  
  return (
    <Container>
      <Main>
        <Search onChange={ e => setSearch(e.target.value) } />
        <Query query={ query } variables={{ search: debouncedSearchTerm, page }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
              
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
                  data.movies.movies.map((movie: any, i: number) => (
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
        </Query>
      </Main>
    </Container>
   )
}

export default Home;