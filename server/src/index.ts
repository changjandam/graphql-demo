import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema.js';
import { resolvers } from './resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server);

console.log(`Server running at http://localhost:4000`);
