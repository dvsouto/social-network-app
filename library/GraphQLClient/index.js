/**
 * GraphQLClient
 * Effect request on GraphQL API
 * @author Davi Souto
 * @since 28/02/2020
 */

import ApolloClient from "apollo-boost";

import Store from '@App/redux/Store';
import Environment from "@App/Environment";

// Create ApolloClient
if (! window._graphql_client)
{
  window._graphql_client = new ApolloClient({
    uri: Environment.apiUrl,
    request: (operation) => {
      const token = Store.getState().auth.token;

      operation.setContext({
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      })
    },
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
