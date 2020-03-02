/**
 * UpdateProfileReducer
 * @author Davi Souto
 * @since 03/03/2020
 */

import { createReducer } from 'redux';

import Store from '@App/redux/Store';
import gql from "graphql-tag";

import { ReactNativeFile } from "apollo-upload-client";
// import { AsyncStorage, Alert } from "react-native";

/*************************************************************
 * TYPES
 *************************************************************/

 export const Types = {
   UPDATE: "profile/update",
   UPDATE_SUCCESS: "profile/update_success",
   UPDATE_FAIL: "profile/update_fail",

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
    photo: false,
  },

  loading: false,
  error: false
}


export const updateProfileReducer = (state = initialState, action) => {
    switch(action.type){
      case Types.UPDATE:
        return {
          ...state,
          loading: true,
        }

      case Types.UPDATE_SUCCESS:
        // console.log("Success:", action.payload);

        return {
          ...state,
          loading: false,
        }

      case Types.UPDATE_FAIL:
        // console.log("Fail:", action.payload);

        return {
          ...state,
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

 export function doUpdateProfile(data)
 {
   if (data.photo && typeof data.photo == "object")
   {
     // data.photo.uri = data.photo.uri.replace("file://", "");
     var photo = new ReactNativeFile(data.photo);

     return {
       type: Types.UPDATE,
       graphql: {
         mutation: gql`
         mutation updateMyProfile($photo: Upload!) {
           updateMyProfile(input: {
             name: "${data.name}",
             last_name: "${data.last_name}",
             photo: $photo
           }) {
             id,
             name,
             last_name,
             photo
           }
         }
         `,
         variables: {
           photo
         }
       }
     }
   } else {
     return {
       type: Types.UPDATE,
       graphql: {
         mutation: gql`
         mutation updateMyProfile {
           updateMyProfile(input: {
             name: "${data.name}",
             last_name: "${data.last_name}",
           }) {
             id,
             name,
             last_name,
           }
         }
         `,
       }
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
