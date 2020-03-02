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
  },

  gambIcon: {
    width: 0,
    height: 0,
    opacity: 0,
    position: 'absolute',
  },
  userIcon: {
    shadowOffset:{  width: 3,  height: 3,  },
    shadowColor: 'black',
    shadowOpacity: 0.25,
  },
});

export default styles;
