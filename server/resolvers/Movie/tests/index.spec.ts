import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import {
  GET_POPULAR,
  SEARCH_MOVIES,
  popularPageTwoRaw,
  searchPageTwoRaw,
  creditsResponseRaw,
  detailsResponseRaw,
  GET_MOVIE,
} from './data';
import {
  typeDef as Movie,
  resolvers as movieResolvers,
  dataSource as MovieApi,
} from '../';

const Query = gql`
  type Query {
    _empty: String
  }
`;

const movieApi = new MovieApi();

const server = new ApolloServer({
  typeDefs: [Query, Movie],
  resolvers: movieResolvers,
  dataSources: () => ({ movieApi }),
});

const { query } = createTestClient(server);

describe('movieResolvers', () => {
  describe('movies', () => {
    describe('popular', () => {
      describe('data', () => {
        it('should return the same number of movies as the raw data', async () => {
          // mock the dataSource's underlying fetch methods
          movieApi.getPopularMovies = jest.fn(() =>
            Promise.resolve(popularPageTwoRaw));
  
          const { data } = await query({ query: GET_POPULAR });
          
          if (!data) {
            return;
          }
  
          expect(data.movies.movies).toHaveLength(popularPageTwoRaw.results.length)
        });
  
        it('should maintain the order the api returned', async () => {
          movieApi.getPopularMovies = jest.fn(() =>
            Promise.resolve(popularPageTwoRaw));
  
          const { data } = await query({ query: GET_POPULAR });
          
          if (!data) {
            return;
          }
          const rawLength = popularPageTwoRaw.results.length;
          const resultsLength = data.movies.movies.length;
  
          expect(data.movies.movies[0].title).toBe(popularPageTwoRaw.results[0].title)
          expect(data.movies.movies[resultsLength - 1].title)
            .toBe(popularPageTwoRaw.results[rawLength - 1].title)
        });
  
        it('should trim out data we did not ask for', async () => {
          movieApi.getPopularMovies = jest.fn(() =>
            Promise.resolve(popularPageTwoRaw));
  
          const { data } = await query({ query: GET_POPULAR });
          
          if (!data) {
            return;
          }
  
          expect(data.movies.movies[0]).toHaveProperty('title');
          expect(data.movies.movies[0]).not.toHaveProperty('popularity');
          expect(data.movies.movies[0]).not.toHaveProperty('id');
        });
      });
  
      describe('pagination', () => {
        it('should calculate if there is a prevPage', async () => {
          movieApi.getPopularMovies = jest.fn(() =>
            Promise.resolve(popularPageTwoRaw));
  
          const { data } = await query({ query: GET_POPULAR });
          
          if (!data) {
            return;
          }
  
          expect(data.movies.hasPrevPage).toBeTruthy()
          expect(data.movies.hasNextPage).toBeTruthy()
        });
  
        it('should calculate if there is a nextPage', async () => {
          movieApi.getPopularMovies = jest.fn(() =>
            Promise.resolve(popularPageTwoRaw));
  
          const { data } = await query({ query: GET_POPULAR });
    
          if (!data) {
            return;
          }
  
          expect(data.movies.hasPrevPage).toBeTruthy()
          expect(data.movies.hasNextPage).toBeTruthy()
        });
  
        it('should calculate if there is not a prevPage', async () => {
          movieApi.getPopularMovies = jest.fn(() =>
            Promise.resolve({ ...popularPageTwoRaw, page: 1 }));
  
          const { data } = await query({ query: GET_POPULAR });
            
          if (!data) {
            return;
          }
  
          expect(data.movies.hasPrevPage).toBeFalsy()
          expect(data.movies.hasNextPage).toBeTruthy()
        });
  
        it('should calculate if there is not a nextPage', async () => {
          movieApi.getPopularMovies = jest.fn(() =>
            Promise.resolve({ ...popularPageTwoRaw, page: 988 }));
  
          const { data } = await query({ query: GET_POPULAR });
    
          if (!data) {
            return;
          }
  
          expect(data.movies.hasPrevPage).toBeTruthy()
          expect(data.movies.hasNextPage).toBeFalsy()
        });
      });
    });
    
    describe('search', () => {
      describe('data', () => {
        it('should return the same number of movies as the raw data', async () => {
          movieApi.searchMovies = jest.fn(() =>
            Promise.resolve(searchPageTwoRaw));
  
          const { data } = await query({ query: SEARCH_MOVIES });
          
          if (!data) {
            return;
          }
  
          expect(data.movies.movies).toHaveLength(searchPageTwoRaw.results.length)
        });
  
        it('should maintain the order the api returned', async () => {
          movieApi.searchMovies = jest.fn(() =>
            Promise.resolve(searchPageTwoRaw));
  
          const { data } = await query({ query: SEARCH_MOVIES });
          
          if (!data) {
            return;
          }
          const rawLength = searchPageTwoRaw.results.length;
          const resultsLength = data.movies.movies.length;
  
          expect(data.movies.movies[0].title).toBe(searchPageTwoRaw.results[0].title)
          expect(data.movies.movies[resultsLength - 1].title)
            .toBe(searchPageTwoRaw.results[rawLength - 1].title)
        });
  
        it('should trim out data we did not ask for', async () => {
          movieApi.searchMovies = jest.fn(() =>
            Promise.resolve(searchPageTwoRaw));
  
          const { data } = await query({ query: SEARCH_MOVIES });
          
          if (!data) {
            return;
          }
  
          expect(data.movies.movies[0]).toHaveProperty('title');
          expect(data.movies.movies[0]).not.toHaveProperty('popularity');
          expect(data.movies.movies[0]).not.toHaveProperty('id');
        });
      });

      describe('pagination', () => {
        it('should calculate if there is a prevPage', async () => {
          movieApi.searchMovies = jest.fn(() =>
            Promise.resolve(searchPageTwoRaw));
  
          const { data } = await query({ query: SEARCH_MOVIES });
          
          if (!data) {
            return;
          }
  
          expect(data.movies.hasPrevPage).toBeTruthy()
          expect(data.movies.hasNextPage).toBeTruthy()
        });
  
        it('should calculate if there is a nextPage', async () => {
          movieApi.searchMovies = jest.fn(() =>
            Promise.resolve(searchPageTwoRaw));
  
          const { data } = await query({ query: SEARCH_MOVIES });
    
          if (!data) {
            return;
          }
  
          expect(data.movies.hasPrevPage).toBeTruthy()
          expect(data.movies.hasNextPage).toBeTruthy()
        });
  
        it('should calculate if there is not a prevPage', async () => {
          movieApi.searchMovies = jest.fn(() =>
            Promise.resolve({ ...searchPageTwoRaw, page: 1 }));
  
          const { data } = await query({ query: SEARCH_MOVIES });
            
          if (!data) {
            return;
          }
  
          expect(data.movies.hasPrevPage).toBeFalsy()
          expect(data.movies.hasNextPage).toBeTruthy()
        });
  
        it('should calculate if there is not a nextPage', async () => {
          movieApi.searchMovies = jest.fn(() =>
            Promise.resolve({ ...searchPageTwoRaw, page: 37 }));
  
          const { data } = await query({ query: SEARCH_MOVIES });
    
          if (!data) {
            return;
          }
  
          expect(data.movies.hasPrevPage).toBeTruthy()
          expect(data.movies.hasNextPage).toBeFalsy()
        });
      });
    });
  });
  
  describe('movie', () => {
    it('should trim out data we did not ask for', async () => {
      movieApi.getMovieCredits = jest.fn(() => Promise.resolve(creditsResponseRaw));
      movieApi.getMovieDetails = jest.fn(() => Promise.resolve(detailsResponseRaw));

      const { data } = await query({ query: GET_MOVIE });
      
      if (!data) {
        return;
      }

      expect(data.movie).toHaveProperty('title');
      expect(data.movie).not.toHaveProperty('id');
      expect(data.movie).not.toHaveProperty('overview');
    });

    it('should be able to get data from both composed queries', async () => {
      movieApi.getMovieCredits = jest.fn(() => Promise.resolve(creditsResponseRaw));
      movieApi.getMovieDetails = jest.fn(() => Promise.resolve(detailsResponseRaw));

      const { data } = await query({ query: GET_MOVIE });
      
      if (!data) {
        return;
      }

      expect(data.movie).toHaveProperty('title');
      expect(data.movie).toHaveProperty('cast');
      expect(data.movie.cast[0]).toHaveProperty('name');
      expect(data.movie.cast[0].name).toBe('Adam Sandler');
    });
  });
});
