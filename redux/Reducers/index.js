/**
 * Redux Reducers
 * @author Davi Souto
 * @since 28/02/2020
 */

import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { locationReducer } from './locationReducer';
import { pingReducer } from './pingReducer';
import { registerReducer } from './registerReducer';
import { updateProfileReducer } from './updateProfileReducer';

export default combineReducers({
    auth: authReducer,
    location: locationReducer,
    ping: pingReducer,
    register: registerReducer,
    updateProfile: updateProfileReducer,
});
