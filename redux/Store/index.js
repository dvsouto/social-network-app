/**
 * Redux Store
 * @author Davi Souto
 * @since 28/02/2020
 */
import { createStore, applyMiddleware } from 'redux';
import Reducers from '@App/redux/Reducers';

import GraphqlMiddleware from '@App/redux/GraphqlMiddleware';

export default createStore(Reducers, applyMiddleware(
  GraphqlMiddleware
));
