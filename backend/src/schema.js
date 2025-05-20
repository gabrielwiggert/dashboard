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

  type Customer {
    id: ID!
    name: String!
    email: String!
    phone: String
    createdAt: String!
  }

  type OrderItem {
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Order {
    id: ID!
    customer: Customer!
    items: [OrderItem!]!
    totalAmount: Float!
    orderDate: String!
    status: String!
  }

  type CustomerSpending {
    totalSpent: Float!
    averageOrderValue: Float!
    lastOrderDate: String
    numberOfOrders: Int!
  }

  type CategoryRevenue {
    category: String!
    revenue: Float!
    numberOfOrders: Int!
    averageOrderValue: Float!
  }

  type SalesAnalytics {
    totalRevenue: Float!
    completedOrders: Int!
    revenuePerCategory: [CategoryRevenue!]!
    startDate: String!
    endDate: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    getTopSellingProducts(limit: Int!): [TopProduct!]!
    getCustomerSpending(customerId: ID!): CustomerSpending!
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics!
  }

  type Mutation {
    createUser(username: String!, email: String!): User!
    updateUser(id: ID!, username: String, email: String): User!
    deleteUser(id: ID!): Boolean!
  }
`; 