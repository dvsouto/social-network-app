/**
 * RegisterReducer
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
   REGISTER: "register/register",
   REGISTER_SUCCESS: "register/register_success",
   REGISTER_FAIL: "register/register_fail",

   SET_FIELD: "register/set_field",
   RESET_FIELDS: "register/reset_fields",
 }

/*************************************************************
 * REDUCER
 *************************************************************/

const initialState = {
  fields: {
    name: '',
    last_name: '',
    email: '',
    document: '',
    password: '',
    repeat_password: '',
  },

  loading: false,
  error: false
}


export const registerReducer = (state = initialState, action) => {
    switch(action.type){
      case Types.REGISTER:
        return {
          ...state,
          loading: true,
        }

      case Types.REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
        }

      case Types.REGISTER_FAIL:
        return {
          ...state,
          logged: false,
          loading: false,
          error: "Ocorreu um erro durante o cadastro. Você está conectado a internet ?",
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
            name: '',
            last_name: '',
            email: '',
            document: '',
            password: '',
            repeat_password: '',
          },
        }


      default:
        return state;
    }
}

/*************************************************************
 * ACTIONS
 *************************************************************/

 export function doRegister(data)
 {
   return {
     type: Types.REGISTER,
     graphql: {
       mutation: gql`
         mutation createUser{
          createUser(input: {
            name: "${data.name}",
            last_name: "${data.last_name}",
            email: "${data.email}",
            document: "${data.document}",
            password: "${data.password}"
          }) {
            id
          }
        }
       `,
       // variables: {
       //   name: data.name,
       //   last_name: data.last_name,
       //   email: data.email,
       //   document: data.document,
       //   password: data.password,
       // }
     }
   }
 }

export const setField = (field, value) => ({
  type: Types.SET_FIELD,
  field,
  value: value || '',
});

export const resetFields = () => ({
  type: Types.RESET_FIELDS,
});
