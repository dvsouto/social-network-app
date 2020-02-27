import React from 'react';

import navigatorTabs from './navigatorTabs';

import Constants from '@App/Constants';

import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Tab Bar Options
 */
const tabBarOptions = {
  activeTintColor: Constants.PRIMARY_COLOR,
  inactiveTintColor: "#888",
  style: {
    height: 62,
    // paddingVertical: 5,
    backgroundColor: "#fafafa",
    borderTopWidth: 2,
    borderTopColor: "#f3f3f3"
  },
  labelStyle: {
    fontSize: 11,
    lineHeight: 18,
    padding: 0
    // fontFamily: "CircularStd-Book"
  },
  iconStyle: {},
  showIcon: true,
  pressOpacity: 0.65,
  indicatorStyle: {
    backgroundColor: "#7703fc",
    opacity: 0.45
  }
}

//////////////////////////////////////////////////////////

/**
 * Deenhar ícone nas tabs
 */
const defaultNavigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state;
  const icon = navigatorTabs[routeName].icon || "";
  const title = navigatorTabs[routeName].title || routeName;

  return {
    tabBarIcon: ({ focused, tintColor }) => {
      return (<Icon name={ icon } size={22} focused={ focused } color={ tintColor } style={{ paddingTop: 2 }} />);
    },
    title: title
  };
}

//////////////////////////////////////////////////////////

export {
  tabBarOptions,
  defaultNavigationOptions
}
