import { StyleSheet } from 'react-native';

import Constants from '@App/Constants';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Constants.PRIMARY_COLOR,
  },
  titleStyle: {
    color: "white"
  },
  menuStyle: {
    color: "white"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
  mapStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
  }
});

export default styles;
