import { gql } from 'apollo-server-express';
import { init as redisInit, get, set, cleanup } from '../../utils/redis';
import { ActorDetailsResponse, ActorCreditsResponse } from '../../types/ActorResponse';

export const typeDef = gql`
  extend type Query {
    # Movie returns a single movie with details
    person(id: Int!): Person!
  }
  
  type PersonCredit {
    poster_path: String
    id: Int!
    title: String
  }
  
  type Person {
    name: String!
    id: Int!
    known_for_department: String!
    also_known_as: [String!]!
    gender: Int!
    biography: String!
    popularity: Float!
    place_of_birth: String
    profile_path: String
    deathday: String
    birthday: String
    cast: [PersonCredit!]!
    crew: [PersonCredit!]!
  }
`;

export const resolvers = {
  Query: {
    person: async(
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
        const redisKey = `PERSON:${id}`
        const cachedData = client ? await get(client, redisKey).catch(console.log) : null;
        
        if (cachedData) {
          /**
           * This might be another good data point to capture with analytics 
           */
          return Promise.resolve(JSON.parse(cachedData));
        }
        
        // Use Promise.all to run queries and parsing concurrently
        const [ detailsResponse, creditsResponse ]: [ ActorDetailsResponse, ActorCreditsResponse ] = await Promise.all([
          dataSources.personApi.getPersonDetails(id),
          dataSources.personApi.getPersonCredits(id),
        ])
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
