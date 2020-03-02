/**
 * Authenticate Navigator
 * Screens to login, register, forget password, etc.
 * @author Davi Souto
 * @since  09/05/2019
 */

import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

// Screens
import ScreenAuthenticate from '@App/screens/Authenticate';
import ScreenRegister from '@App/screens/Register';

import Constants from '@App/Constants';

/////////////////////////////////////////////////////////////////

// Navigator de autenticação
const AuthNavigator = createStackNavigator({
  Login: {
    title: 'Authenticate',
    screen: ScreenAuthenticate,
    navigationOptions: {
      headerShown: false,
    }
  },
  Register: {
    title: 'Register',
    screen: ScreenRegister,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Registre-se",
      headerBackTitle: "Voltar",
    }
  }
}, {
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    headerTransparent: true,
    gestureEnabled: true,
    cardOverlayEnabled: true,
    ...TransitionPresets.SlideFromRightIOS,
  },
  headerMode: 'screen',
  gestureDirection: "horizontal",
  animationEnabled: true
});

export default AuthNavigator;
