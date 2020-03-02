/**
 * GraphQLClient
 * Effect request on GraphQL API
 * @author Davi Souto
 * @since 28/02/2020
 */

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "apollo-boost";

import Store from '@App/redux/Store';
import Environment from "@App/Environment";

import { createUploadLink } from "apollo-upload-client";

// Create ApolloClient
if (! window._graphql_client)
{
  window._graphql_client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new ApolloLink((operation, forward) => {
      const token = Store.getState().auth.token;

      operation.setContext({
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });

      return forward(operation);
    }).concat(new createUploadLink({
      uri: Environment.apiUrl,
    })),
  });

  window._graphql_client.defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
}

export default window._graphql_client;
