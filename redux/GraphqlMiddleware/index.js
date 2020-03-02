/**
 * GraphQL Request Middleware
 * @author Davi Souto
 * @since 28/02/2020
 */
// import ApolloClient from "apollo-boost";
// import gql from "graphql-tag";

import GraphQLClient from "@App/library/GraphQLClient";

const GraphqlMiddleware = ({ dispatch }) => next => action => {
  // Verificar se foi passado o parâmetro graphql no Redux
  if (! action.graphql)
    return next(action);

  next(action);

  graphql = action.graphql;

  type = "query";

  // Retrive type operation
  if (graphql.query) type = "query";
  if (graphql.mutate || graphql.mutation) type = "mutate";
  if (graphql.subscribe) type = "subscribe";

  if (graphql.mutation)
    graphql.mutate = graphql.mutation;

  // Suffix de sucesso e de erro para o dispatch do Redux
  success_suffix = "success";
  fail_suffix = "fail";

  return new Promise((resolve, reject) => {
    var obj_request = {}

    if (type == "mutate") obj_request["mutation"] = graphql["mutate"];
    else obj_request[type] = graphql[type];

    if (graphql.variables)
      obj_request.variables = graphql.variables;

    // console.log(graphql);

    // Disable cache
    obj_request.fetchPolicy = "no-cache";

    // Effect requisition on GraphQL API
    GraphQLClient[type](obj_request).then((result) => {
        action_dispatch = {
          type: action.type + "_" + success_suffix,
          payload: result
        };

        // Dispatch success action
        dispatch(action_dispatch);

        // console.log("GraphQL Query:", result);

        // Resolve promise
        window.setTimeout(() => resolve(action_dispatch), 1);
    }).catch((error) => {
      if (error.graphQLErrors && error.graphQLErrors.length > 0)
        error = error.graphQLErrors[0].message;

      action_dispatch = {
        type: action.type + "_" + fail_suffix,
        payload: {
          error: error,
        }
      };

      // console.log("GraphQL Error:", error);

      // Dispatch fail action
      dispatch(action_dispatch);

      // Reject promise
      window.setTimeout(() => reject(action_dispatch), 1);
    });
  })

}

export default GraphqlMiddleware;
