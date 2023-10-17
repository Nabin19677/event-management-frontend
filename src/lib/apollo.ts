"use client"; 

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/query', // Replace with your GraphQL API endpoint
});

const authLink = setContext((_, { headers }) => {
  // Get the token from your preferred storage (e.g., cookies, local storage, or a state management library)
  const token = localStorage.getItem("TOKEN"); // Implement this function to retrieve the token

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;