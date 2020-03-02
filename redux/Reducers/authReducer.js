/**
 * AuthReducer
 * @author Davi Souto
 * @since 28/02/2020
 */

import { createReducer } from 'redux';

import Store from '@App/redux/Store';
import gql from "graphql-tag";

import { AsyncStorage, Alert } from "react-native";

/*************************************************************
 * TYPES
 *************************************************************/

 export const Types = {
   LOGIN: "auth/login",
   LOGIN_SUCCESS: "auth/login_success",
   LOGIN_FAIL: "auth/login_fail",

   LOGOUT: "auth/logout",

   SET_PERSISTED_DATA: "auth/set_persisted_data",

   SET_FIELD: "auth/set_field",
   RESET_FIELDS: "register/reset_fields",
 }

/*************************************************************
 * REDUCER
 *************************************************************/

const initialState = {
  token: false,
  logged: false,

  fields: {
    email: '',
    password: '',
  },

  user: false,

  loading: false,
  error: ''
}


export const authReducer = (state = initialState, action) => {
    switch(action.type){
      case Types.LOGIN:
        console.log("START LOGIN !!");

        return {
          ...state,
          loading: true,
        }

      case Types.LOGIN_SUCCESS:
        console.log("LOGIN SUCCESS:", action.payload);

        if (action.payload.data && action.payload.data.login && action.payload.data.login.token)
        {
          AsyncStorage.setItem("@social-network:auth:token", action.payload.data.login.token);
          AsyncStorage.setItem("@social-network:auth:email", state.fields.email);
          AsyncStorage.setItem("@social-network:auth:user", JSON.stringify(action.payload.data.login.user));
        }

        console.log("TOKEN = ", action.payload.data.login.token);

        return {
          ...state,
          password: false,
          token: action.payload.data.login.token,
          user: action.payload.data.login.user,
          loading: false,
          logged: true,
        }

      case Types.LOGIN_FAIL:
      console.log("LOGIN FAIL", action.payload);
        state.password = false;

        return {
          ...state,
          logged: false,
          loading: false,
          error: "Ocorreu um erro durante o login. Você está conectado a internet ?",
        }

      //////////////////////////////

      case Types.LOGOUT:
        AsyncStorage.removeItem("@social-network:auth:token");
        AsyncStorage.removeItem("@social-network:auth:user");

        return {
          ...state,
          fields: {
            ...state.fields,
            password: ''
          },
          token: false,
          logged: false,
          error: '',
        }

      //////////////////////////////

      case Types.SET_PERSISTED_DATA:
        return {
          ...state,
          token: action.token,
          fields: {
            ...state.fields,
            email: action.email,
          },
          user: action.user
        }

      //////////////////////////////

      case Types.SET_FIELD:
        state.fields[action.field] = action.value;

        return {
          ...state
        }

      case Types.RESET_FIELDS:
        return {
          ...state,
          fields: {
            email: '',
            password: '',
          },
        }


      //////////////////////////////

      default:
        return state;
    }
}

/*************************************************************
 * ACTIONS
 *************************************************************/

 export function doLogin(email, password)
 {
   return {
     type: Types.LOGIN,
     graphql: {
       mutation: gql`
         mutation {
           login (email: "${email}", password: "${password}") {
             token,
             user {
               id,
               email,
               name,
               last_name
             }
           }
         }
       `,
       variables: {
         email,
         password
       }
     }
   }
 }

 export function doLogout()
 {
   return {
     type: Types.LOGOUT,
   }
 }

export const setPersistedData = (email, token, user) => ({
  type: Types.SET_PERSISTED_DATA,
  email,
  token,
  user,
})

export const setField = (field, value) => ({
  type: Types.SET_FIELD,
  field,
  value: value || '',
});

export const resetFields = () => ({
  type: Types.RESET_FIELDS,
});
