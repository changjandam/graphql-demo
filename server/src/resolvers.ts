import { Resolvers } from './generated/types.js';

export const resolvers: Resolvers = {
  Query: {
    user: async (_parent, { id }, { dataSources }) => {
      return dataSources.usersAPI.getUserById(id);
    },
    users: async (_parent, _args, { dataSources }) => {
      return dataSources.usersAPI.getUsers();
    },
  },
  Mutation: {
    createUser: async (_parent, { input }, { dataSources }) => {
      try {
        const user = await dataSources.usersAPI.createUser(input);
        return {
          code: 200,
          message: 'User created',
          success: true,
          user,
        };
      } catch (error) {
        return {
          code: error.extensions.response.status,
          message: error.extensions.response.body,
          success: false,
          user: null,
        };
      }
    },
  },
  User: {
    vehicles: async (parent, _args, { dataSources }) => {
      return dataSources.vehiclesAPI.getUserVehicles(parent.id);
    },
  },
};
