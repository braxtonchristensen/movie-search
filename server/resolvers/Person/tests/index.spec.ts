import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import {
  GET_PERSON,
  creditsResponseRaw,
  detailsResponseRaw,
} from './data';
import {
  typeDef as Person,
  resolvers as personResolvers,
  dataSource as PersonApi,
} from '../';

const Query = gql`
  type Query {
    _empty: String
  }
`;

const personApi = new PersonApi();

const server = new ApolloServer({
  typeDefs: [Query, Person],
  resolvers: personResolvers,
  dataSources: () => ({ personApi }),
});

const { query } = createTestClient(server);

describe('personResolvers', () => {
  describe('person', () => {
    it('should trim out data we did not ask for', async () => {
      personApi.getPersonDetails = jest.fn(() => Promise.resolve(detailsResponseRaw));
      personApi.getPersonCredits = jest.fn(() => Promise.resolve(creditsResponseRaw));

      const { data } = await query({ query: GET_PERSON });
      
      if (!data) {
        return;
      }

      expect(data.person).toHaveProperty('name');
      expect(data.person).not.toHaveProperty('id');
      expect(data.person).not.toHaveProperty('biography');
    });

    it('should be able to get data from both composed queries', async () => {
      personApi.getPersonDetails = jest.fn(() => Promise.resolve(detailsResponseRaw));
      personApi.getPersonCredits = jest.fn(() => Promise.resolve(creditsResponseRaw));

      const { data } = await query({ query: GET_PERSON });
      
      if (!data) {
        return;
      }

      expect(data.person).toHaveProperty('cast');
      expect(data.person.cast[0]).toHaveProperty('title');
      expect(data.person.cast[0]).not.toHaveProperty('overview');
    });

    it('should accurately merge the data', async () => {
      personApi.getPersonDetails = jest.fn(() => Promise.resolve(detailsResponseRaw));
      personApi.getPersonCredits = jest.fn(() => Promise.resolve(creditsResponseRaw));

      const { data } = await query({ query: GET_PERSON });
      
      if (!data) {
        return;
      }
    
      
      // Credits Query
      expect(data.person).toHaveProperty('cast');
      expect(data.person.cast).toHaveLength(creditsResponseRaw.cast.length);
      expect(data.person.cast[0].title).toEqual(creditsResponseRaw.cast[0].title);
      
      // Details Query
      expect(data.person.name).toBe(detailsResponseRaw.name);
    });
  });
});
