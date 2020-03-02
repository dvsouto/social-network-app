import { StyleSheet, Platform, NativeModules } from 'react-native';

import Constants from '@App/Constants';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Constants.PRIMARY_COLOR,
    paddingTop: Platform.select({ ios: 20, android: NativeModules.StatusBarManager.HEIGHT / 1.2 }),
    borderBottomWidth: 0,
  },
  titleStyle: {
    color: "white",
  },
  menuStyle: {
    color: "white",
    fontSize: 32,
  },
  backButtonStyle: {
    color: "white",
    fontSize: 28,
  }
});

export default styles;
