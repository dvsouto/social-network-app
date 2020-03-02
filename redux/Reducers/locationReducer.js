/**
 * LocationReducer
 * Reducer of user location
 * @author Davi Souto
 * @since 01/03/2020
 */

import { createReducer } from 'redux';

import Store from '@App/redux/Store';
import gql from "graphql-tag";

import * as Location from 'expo-location';


/*************************************************************
 * TYPES
 *************************************************************/

 export const Types = {
   GET_USER_LOCATION: "location/get",
   GET_USER_LOCATION_SUCCESS: "location/get_success",

   SAVE_USER_LOCATION: "location/user/save",
   SAVE_USER_LOCATION_SUCCESS: "location/user/save_success",
   SAVE_USER_LOCATION_FAIL: "location/user/save_fail",

   FIND_NEAREST_USERS: "location/nearest_users",
   FIND_NEAREST_USERS_SUCCESS: "location/nearest_users_success",
   FIND_NEAREST_USERS_FAIL: "location/nearest_users_fail",

   SET_STATUS_LOCATION: "location/status/set",
   SET_SAVED_CHECKED_LOCATION: "location/status/saved/set"
 }


/*************************************************************
 * REDUCER
 *************************************************************/

const initialState = {
  location: {
    lat: null,
    lng: null,
  },

  checkedLocation: false,

  savingUserLocation: false,
  savedUserLocation: false,

  // savedCheckedLocation: false,

  nearestUsers: [],
  findingUsers: false,
  findedUsers: false,

  loading: false,
  status: "denied"
}

export const locationReducer = (state = initialState, action) => {
    switch(action.type){
      /**
       * Recuperar localização do usuário
       */
      case Types.GET_USER_LOCATION:
        _loading = state.loading;

        if (state.status == "granted" && ! state.loading)
        {
          _loading = true;

          Location.getCurrentPositionAsync({
            // accuracy: Location.Accuracy.Highest,
            accuracy: Location.Accuracy.High,
            maximumAge: 30000,
          }).then((location) => Store.dispatch(_getUserLocationSuccess(location)));
        }

        return {
          ...state,
          loading: _loading,
        }
      break;

      case Types.GET_USER_LOCATION_SUCCESS:
        let location = {
          lat: null,
          lon: null
        };

        if (action.location && action.location.coords)
        {
          if (action.location.coords.latitude)
            location.lat = action.location.coords.latitude;

          if (action.location.coords.longitude)
            location.lon = action.location.coords.longitude;
        }

        // Send user location to server
        if (location.lat && location.lon)
        {
          window.setTimeout(() => Store.dispatch(saveUserLocation(location)), 1);
        }

        console.log("LOCALIZATION: ", location);

        return {
          ...state,
          location: location,
          loading: false,
          checkedLocation: true,
        }
      break;

      /**
       * Update status of user location
       */
      case Types.SET_STATUS_LOCATION:
        return {
          ...state,
          status: action.status.trim()
        }
      break;

      /**
       * Update if haved save the user location on server
       */
      // case Types.SET_SAVED_CHECKED_LOCATION:
      //   return {
      //     ...state,
      //     savedCheckedLocation: action.status
      //   }
      // break;

      //////////////////////////////////

      case Types.FIND_NEAREST_USERS:
        return {
          ...state,
          findingUsers: true
        }

      case Types.FIND_NEAREST_USERS_SUCCESS:
        console.log("Nearest users:", action.payload);

        return {
          ...state,
          findingUsers: false,
          findedUsers: true,
          nearestUsers: action.payload.data.nearestUsersOfMe,
        }

      case Types.FIND_NEAREST_USERS_FAIL:
        // console.log("err nearest", action.payload);

        return {
          ...state,
          findingUsers: false
        }

      //////////////////////////////////

      case Types.SAVE_USER_LOCATION:
        return {
          ...state,
          savingUserLocation: true
        }

      case Types.SAVE_USER_LOCATION_SUCCESS:
        return {
          ...state,
          savingUserLocation: false,
          savedUserLocation: true
        }

      case Types.SAVE_USER_LOCATION_FAIL:
        return {
          ...state,
          savingUserLocation: false
        }

      default:
        return state;
    }
}

/*************************************************************
 * ACTIONS
 *************************************************************/

 /**
  * Recuperar localização do usuário
  */
 export const getUserLocation = () => ({
   type: Types.GET_USER_LOCATION,
 });

 const _getUserLocationSuccess = (location) => ({
   type: Types.GET_USER_LOCATION_SUCCESS,
   location,
 });

 /**
  * Update location permission status
  * @author Davi Souto
  * @since 01/03/2020
  */
 export const setStatusLocation = (status) => ({
   type: Types.SET_STATUS_LOCATION,
   status,
 });

 /**
  * Update if haved save the user location on server
  * @author Davi Souto
  * @since 01/03/2020
  */
 // export const setSaveCheckedLocation = (status) => ({
 //   type: Types.SET_SAVED_CHECKED_LOCATION,
 //   status,
 // })

 ///////////////////////////////////

 /**
  * Find nearest users of me
  * @author Davi Souto
  * @since 01/03/2020
  */
 export function findNearestUsers()
 {
   return {
     type: Types.FIND_NEAREST_USERS,
     graphql: {
       query: gql`
        query nearestUsersOfMe {
          nearestUsersOfMe(distance: 3000) {
            id,
            name,
            last_name,
            email,
            distance,
            location {
              coordinates {
                lat,
                lon
              }
            }
          }
        }
       `,
     }
   }
 }

 /**
  * Save user location on server
  * @author Davi Souto
  * @since 01/03/2020
  */
 export function saveUserLocation(location){
   return {
     type: Types.SAVE_USER_LOCATION,
     graphql: {
       mutation: gql`
         mutation updateMyLocation {
          updateMyLocation(input: { lat: ${location.lat}, lon: ${location.lon} }) {
            id,
          }
        }
       `,
     }
   }
 }
