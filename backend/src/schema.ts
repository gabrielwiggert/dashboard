export const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    category: String!
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
    getTopSellingProducts(limit: Int!): [TopProduct!]!
  }
`; 