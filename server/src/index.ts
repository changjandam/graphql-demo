import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers: {},
});

startStandaloneServer(server);
