/**
 * Navigator App Container
 * @author Davi Souto
 * @since  26/02/2020
 */

import { createAppContainer } from 'react-navigation';

import RootNavigator from './RootNavigator';

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
