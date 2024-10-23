const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas'); // Adjust the path as needed
require('dotenv').config();

const startServer = async () => {
  const app = express();

  // Create a new Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Your context setup here
    },
  });

  // Start the server
  await server.start();

  // Apply the Apollo GraphQL middleware to the Express app
  server.applyMiddleware({ app, path: '/' });

  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

// Call the start function
startServer();
