/**
 * PingReducer
 * Test connection with GraphQL
 * @author Davi Souto
 * @since 28/02/2020
 */

import { createReducer } from 'redux';

import Store from '@App/redux/Store';
import gql from "graphql-tag";


/*************************************************************
 * TYPES
 *************************************************************/

 export const Types = {
   PING: "ping/ping",
   PING_SUCCESS: "ping/ping_success",
   PING_FAIL: "ping/ping_fail",
 }

/*************************************************************
 * REDUCER
 *************************************************************/

const initialState = {
  loading: false,
  error: false
}


export const pingReducer = (state = initialState, action) => {
    switch(action.type){
      case Types.PING:
        console.log("CALL PING");

        return {
          ...state,
          loading: true,
        }

      case Types.PING_SUCCESS:
        console.log("PING SUCCESS:", action.payload);

        return {
          ...state,
          loading: false,
        }

      case Types.PING_FAIL:
        console.log("PING FAIL:", action.payload);

        return {
          ...state,
          logged: false,
          loading: false,
          error: "Ocorreu um erro. Você está conectado a internet ?",
        }

      //////////////////////////////

      default:
        return state;
    }
}

/*************************************************************
 * ACTIONS
 *************************************************************/

export const ping = () => ({
  type: Types.PING,
  graphql: {
    query: gql`
      {
        ping
      }
    `
  }
});
