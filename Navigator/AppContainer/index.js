/**
 * AppContainer
 * @author Davi Souto
 * @since 20/01/2020
 */

import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

import AppNavigator from '@App/Navigator/AppNavigator';

// const RootStack = createStackNavigator({
//     AppNavigator
// });

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
