import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema.js';
import { resolvers } from './resolvers.js';
import { UsersAPI } from './data-sources/users-api.js';
import { VehiclesAPI } from './data-sources/vehicles-api.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        usersAPI: new UsersAPI({ cache }),
        vehiclesAPI: new VehiclesAPI({ cache }),
      },
    };
  },
});

console.log(`Server running at http://localhost:${url}`);
