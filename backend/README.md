# GraphQL API

A GraphQL API built with Node.js, Express, Apollo Server, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or accessible URL)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a .env file in the root directory with the following variables:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/graphql-api
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The GraphQL playground will be available at: http://localhost:4000/graphql

## API Features

- User Management (CRUD operations)
- GraphQL Playground for testing queries and mutations

## Example Queries

```graphql
# Get all users
query {
  users {
    id
    username
    email
    createdAt
  }
}

# Get single user
query {
  user(id: "user_id") {
    username
    email
  }
}

# Create user
mutation {
  createUser(username: "john_doe", email: "john@example.com") {
    id
    username
    email
    createdAt
  }
}

# Update user
mutation {
  updateUser(id: "user_id", username: "jane_doe") {
    id
    username
    email
  }
}

# Delete user
mutation {
  deleteUser(id: "user_id")
}
``` 