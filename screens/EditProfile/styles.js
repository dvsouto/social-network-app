import { StyleSheet, Dimensions, Platform } from 'react-native';

import Constants from '@App/Constants';
import { Normalize } from "@Library/Font"

const styles = StyleSheet.create({
  photoHeader: {
    height: Normalize(180),
    width: Dimensions.get('window').width,
    backgroundColor: Constants.PRIMARY_COLOR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  thumbnailView: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnailProfile: {
    borderWidth: 2,
    borderColor: "white",
    width: Normalize(120),
    height: Normalize(120),
    borderRadius: 70
  },

  nameProfile: {
    color: "white",
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },

  buttonEditProfile: {
    width: Normalize(40),
    height: Normalize(40),
    borderColor: "white",
    padding: 0,
    margin: 0,
  },
  buttonEditProfileIcon: {
    color: "white",
    fontSize: Normalize(18),
    width: Normalize(40),
    height: Normalize(40),
    left: Platform.select({ ios: Normalize(-13), android: 0 }),
    top: Normalize(10),
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
  },

  formContent: {
    width: Dimensions.get('window').width,
  },
  formView: {
    paddingHorizontal: Normalize(22),
    marginTop: Normalize(32),
  },
  photoButton: {
    right: 0,
    bottom: Normalize(25),
    borderWidth: 1,
    borderColor: "white",
    opacity: 1,
    borderRadius: Normalize(25),
    width: Normalize(46),
    height: Normalize(46),
    backgroundColor: "#333", //Constants.PRIMARY_COLOR,
  }

});

export default styles;
