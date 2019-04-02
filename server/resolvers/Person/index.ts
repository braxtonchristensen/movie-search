import { gql } from 'apollo-server-express';
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
      try {
        // Use Promise.all to run queries and parsing concurrently
        const [ detailsResponse, creditsResponse ]: [ ActorDetailsResponse, ActorCreditsResponse ] = await Promise.all([
          dataSources.personApi.getPersonDetails(id),
          dataSources.personApi.getPersonCredits(id),
        ])

        return { ...detailsResponse, ...creditsResponse };
      } catch (err) {
        throw new Error(err)
      }
    },
  },
};

export { default as dataSource } from './datasource';
