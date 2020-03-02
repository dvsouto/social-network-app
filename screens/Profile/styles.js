import { StyleSheet, Dimensions, Platform } from 'react-native';

import Constants from '@App/Constants';
import { Normalize } from "@Library/Font"

const styles = StyleSheet.create({
  profileHeader: {
    height: Normalize(110),
    width: Dimensions.get('window').width,
    paddingBottom: Normalize(25),
    backgroundColor: Constants.PRIMARY_COLOR,
    flexDirection: "row",
    alignItems: "center"
  },

  thumbnailView: {
    flex: 0.3,
    paddingLeft: Normalize(14),
  },
  nameView: {
    flex: 0.5,
  },
  rightProfileView: {
    flex: 0.2,
    paddingRight: Normalize(16),
    alignItems: "flex-end"
  },

  thumbnailCircle: {
    marginTop: 12,
    marginBottom: 8,
  },
  thumbnailProfile: {
    borderWidth: 2,
    borderColor: "white",
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

  viewMainButtons: {
    flexDirection: "row",
    height: Normalize(110),
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  mainButtonView: {
    height: Normalize(110),
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  mainButton: {
    width: "100%",
    height: Normalize(60),
    borderRadius: Normalize(10),
    alignItems: "center",
    justifyContent: "center"
  },
  mainButtonText: {
    color: "#999",
    fontFamily: "open-sans",
    fontSize: Normalize(11),
    marginTop: Normalize(9),
  },

  mainButtonActive: {
    backgroundColor: Constants.PRIMARY_COLOR,
  },
  mainButtonBordered: {
    borderColor: Constants.PRIMARY_COLOR,
  },
  mainButtonBorderedText: {
    color: Constants.PRIMARY_COLOR
  },
  mainButtonIcon: {
    fontSize: Normalize(22),
  },
  mainButtonBorderedIcon: {
    color: Constants.PRIMARY_COLOR,
  }

});

export default styles;
