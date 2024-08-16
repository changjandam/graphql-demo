import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    vehicles: [Vehicle]!
  }

  enum VehicleType {
    CAR
    SCOOTER
  }

  type Vehicle {
    id: ID!
    type: VehicleType!
    model: String!
    user_id: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
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