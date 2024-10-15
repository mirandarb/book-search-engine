import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: '/graphql', // Adjust this to your GraphQL endpoint
  cache: new InMemoryCache(),
});
