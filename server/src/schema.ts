import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    vehicles: [Vehicle]!
  }

  enum VehicleType {
    CAR
    SCOOTER
  }

  type Vehicle {
    id: Int!
    type: VehicleType!
    model: String!
    user_id: Int!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserResponse!
  }

  input CreateUserInput {
    name: String!
  }

  type CreateUserResponse {
    code: Int!
    message: String!
    success: Boolean!
    user: User
  }
`;

export default typeDefs;