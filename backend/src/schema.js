export const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    quantitySold: Int!
    createdAt: String!
    updatedAt: String!
  }

  type TopProduct {
    id: ID!
    name: String!
    description: String!
    price: Float!
    quantitySold: Int!
    rank: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    getTopSellingProducts(limit: Int!): [TopProduct!]!
  }

  type Mutation {
    createUser(username: String!, email: String!): User!
    updateUser(id: ID!, username: String, email: String): User!
    deleteUser(id: ID!): Boolean!
  }
`; 