/**
 * Authenticate Navigator
 * Screens to login, register, forget password, etc.
 * @author Davi Souto
 * @since  09/05/2019
 */

import { createStackNavigator } from 'react-navigation-stack';

// Screens
import ScreenAuthenticate from '@App/screens/Authenticate';
// import ScreenRegister from '@PaynetApp/screens/Register';

/////////////////////////////////////////////////////////////////

// Navigator de autenticação
const AuthNavigator = createStackNavigator({
  SignIn: {
    title: 'Authenticate',
    screen: ScreenAuthenticate,
  },
  // Register: {
  //   title: 'Register',
  //   screen: ScreenRegister,
  // }
}, {
  initialRouteName: 'SignIn',
  navigationOptions: {
  },
  headerMode: 'none',
  mode: 'modal',
  animationEnabled: true
});

export default AuthNavigator;
