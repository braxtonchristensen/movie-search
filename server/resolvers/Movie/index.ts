import { gql } from 'apollo-server-express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { init as redisInit, get, set, cleanup } from '../../utils/redis';
dotenv.config();

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_QS = `?api_key=${process.env.TMDB_API_KEY}`;

const tmbdSearchApi = (search: string, page = 1) =>
  `${BASE_URL}search/movie${API_QS}&query=${encodeURI(search)}&include_adult=false&page=${page}&language=en-US`
const tmbdMovieApi = (id: number) => `${BASE_URL}movie/${id}${API_QS}`
const tmbdMovieCreditsApi = (id: number) => `${BASE_URL}movie/${id}/credits${API_QS}`
const tmbdPopularApi = (page = 1) =>
  `${BASE_URL}movie/popular${API_QS}&page=${page}`

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
    ) => {
      try {
        const response = search
          ? await (
              await fetch(tmbdSearchApi(search, page))
            ).json()
          : await (
              await fetch(tmbdPopularApi(page))
            ).json();;
        
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
      { id }: { id: number }
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
        
        const [ detailsResponse, creditsResponse ] = await Promise.all([
          await (
            await fetch(tmbdMovieApi(id))
          ).json(),
          await (
            await fetch(tmbdMovieCreditsApi(id))
          ).json(),
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