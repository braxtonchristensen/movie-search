import { gql } from 'apollo-server-express';
import { init as redisInit, get, set, cleanup } from '../../utils/redis';
import { MovieDetailsResponse, MovieCreditsResponse } from '../../types/MovieResponse';

export const typeDef = gql`
  extend type Query {
    # Movies returns a list of search results
    movies(search: String, page: Int): MovieConnection
    
    # Movie returns a single movie with details
    movie(id: Int!): MovieDetails!
  }
  
  type Company {
    name: String!
    id: Int!
    logo_path: String
  }
  
  type Genre {
    id: Int!
    name: String!
  }
  
  type Credit {
    credit_id: String!
    department: String!,
    gender: Int,
    id: Int!,
    job: String!,
    name: String!,
    profile_path: String
  }

  type Movie {
    title: String!
    id: Int!
    poster_path: String
    overview: String
    release_date: String!
    vote_count: Int!
    vote_average: Float!
  }
  
  type MovieDetails {
    title: String!
    overview: String
    poster_path: String
    release_date: String!
    backdrop_path: String
    tagline: String
    budget: Int!
    revenue: Int!
    runtime: Int
    popularity: Float!
    vote_count: Int!
    vote_average: Float!
    production_companies: [Company!]!
    genres: [Genre!]!
    cast: [Credit!]!
    crew: [Credit!]!
  }
  
  type MovieConnection {
    page: Int!
    hasPrevPage: Boolean!
    hasNextPage: Boolean!
    movies: [Movie!]!
  }
`;

export const resolvers = {
  Query: {
    movies: async (
      _: undefined,
      { search, page }: { search: string, page: number },
      { dataSources }: any,
    ) => {
      try {
        const response = search
          ? await dataSources.movieApi.searchMovies(search, page)
          : await dataSources.movieApi.getPopularMovies(page)

        return {
          page: response.page,
          hasNextPage: response.page < response.total_pages,
          hasPrevPage: response.page > 1,
          movies: response.results,
        };
      } catch (err) {
        throw new Error(err);
      }
    },

    movie: async(
      _: undefined,
      { id }: { id: number },
      { dataSources }: any,
    ) => {
      /**
       * Try to connect to redis if it is not available continue operations but show
       * a log that it was unable to connect. (Normally I would want to capture this
       * in some form of analytics)
       */
      const client = await redisInit().catch(console.log);

      try {
        const redisKey = `MOVIE:${id}`
        const cachedData = client ? await get(client, redisKey).catch(console.log) : null;
        
        if (cachedData) {
          /**
           * This might be another good data point to capture with analytics 
           */
          return Promise.resolve(JSON.parse(cachedData));
        }
        
        const [ detailsResponse, creditsResponse ]: [MovieDetailsResponse, MovieCreditsResponse] = await Promise.all([
          dataSources.movieApi.getMovieDetails(id),
          dataSources.movieApi.getMovieCredits(id),
        ]);

        const mergedData = { ...detailsResponse, ...creditsResponse };
        
        if (client) {
          await set(client, redisKey, JSON.stringify(mergedData)).catch(console.log);
          cleanup(client);
        }
          
        return mergedData
      } catch (err) {
        throw new Error(err)
      }
    },
  },
};

export { default as dataSource } from './datasource';