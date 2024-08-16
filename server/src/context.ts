import { UsersAPI } from './data-sources/users-api.js';
import { VehiclesAPI } from './data-sources/vehicles-api.js';

export type ContextValue = {
  dataSources: {
    usersAPI: UsersAPI;
    vehiclesAPI: VehiclesAPI;
  };
};
