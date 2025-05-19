Fullstack sales analytics dashboard using Node and React - Express, GraphQL, Apollo, MongoDB/Mongoose, React Router, MUI, Recharts.

Frontend: run 'npm i' and 'npm run dev' in the directory and open localhost:5173 in the browser.

Backend:

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
