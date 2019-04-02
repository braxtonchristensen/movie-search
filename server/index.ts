import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer, gql } from 'apollo-server-express';
import { RedisCache } from 'apollo-server-cache-redis';
import merge from 'lodash.merge';

import {
  dataSource as MovieApi,
  typeDef as Movie,
  resolvers as movieResolvers,
} from './resolvers/Movie';
import {
  dataSource as PersonApi,
  typeDef as Person,
  resolvers as personResolvers,
} from './resolvers/Person';

dotenv.config()

const PORT = process.env.PORT || 5000;
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const REDIS_CONFIG = Object.freeze({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

/**
 * This is so we can modularizie our schema code.
 * 
 * In the current version of GraphQL, you can’t have an empty type even if you intend to extend it
 * later. So we need to make sure the Query type has at least one field — in this case we can add a
 * fake _empty field. Hopefully in future versions it will be possible to have an empty type to be
 * extended later.
 */
const Query = gql`
  type Query {
    _empty: String
  }
`;

const typeDefs = [Query, Movie, Person];
const resolvers = merge(movieResolvers, personResolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new RedisCache(REDIS_CONFIG),
  dataSources: () => {
    return {
      movieApi: new MovieApi(),
      personApi: new PersonApi(),
    };
  },
});

const app: express.Application = express();

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));