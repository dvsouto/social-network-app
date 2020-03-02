/**
 * App Navigator
 * @author Davi Souto
 * @since  20/01/2020
 */

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import navigatorTabs from './navigatorTabs';
import { tabBarOptions, defaultNavigationOptions } from './tabBarOptions';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome';

//////////////////////////////////////////////////////////

// Navigator da aplicação
const HomeNavigator = createMaterialTopTabNavigator(
  navigatorTabs,
  {
    initialRouteName: 'Profile',
    headerMode: 'none',
    tabBarOptions: tabBarOptions,
    defaultNavigationOptions: defaultNavigationOptions,
    // tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: true,
    lazy: false,
  }
);

export default HomeNavigator;
