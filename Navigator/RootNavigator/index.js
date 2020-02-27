/**
 * Navigator Router
 * @author Davi Souto
 * @since  26/02/2020
 */

import { createSwitchNavigator } from 'react-navigation';

import AppNavigator from '@App/Navigator/AppNavigator';
import AuthNavigator from '@App/Navigator/AuthNavigator';

/////////////////////////////////////////////////////////////////

export default createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Auth',
  }
);
