import { StyleSheet } from 'react-native';

import Constants from '@App/Constants';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Constants.PRIMARY_COLOR,
  },
  titleStyle: {
    color: "white",
  },
  menuStyle: {
    color: "white"
  },
  thumbnailProfile: {
    marginTop: 12,
    marginBottom: 8
  },
  nameProfile: {
    color: "#777",
    fontSize: 18,
    fontFamily: "open-sans-bold"
  }
});

export default styles;
