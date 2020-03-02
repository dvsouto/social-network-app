/**
 * Authenticate Navigator
 * Screens to login, register, forget password, etc.
 * @author Davi Souto
 * @since  09/05/2019
 */

import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

import HomeNavigator from '@App/Navigator/HomeNavigator';

// Screens
import ScreenUserProfile from '@App/screens/UserProfile';
import ScreenEditProfile from "@App/screens/EditProfile";

import Constants from '@App/Constants';

/////////////////////////////////////////////////////////////////

// Navigator de autenticação
const AppNavigator = createStackNavigator({
  Home: {
    title: "Home",
    screen: HomeNavigator,
    navigationOptions: {
      headerShown: false,
    }
  },
  UserProfile: {
    title: 'User Profile',
    screen: ScreenUserProfile,
    navigationOptions: {
      ...TransitionPresets.ModalPresentationIOS,
      headerShown: false,
    }
  },
  EditProfile: {
    title: "Edit Profile",
    screen: ScreenEditProfile,
    navigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: false,
    }
  }
}, {
  initialRouteName: 'Home',
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

export default AppNavigator;
