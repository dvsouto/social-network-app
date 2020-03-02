import { StyleSheet, Platform } from 'react-native';

import Constants from '@App/Constants';
import { Normalize } from '@App/library/Font';

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Constants.PRIMARY_COLOR,
  },
  titleView: {
    height: Normalize(100),
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    color: "white",
    fontFamily: "open-sans-light",
    fontSize: Normalize(32),
    marginBottom: Normalize(16),
  },
  boxView: {
    marginHorizontal: 0,
    marginBottom: 0,
    backgroundColor: "#eee",
    borderTopLeftRadius: Normalize(32),
    borderTopRightRadius: Normalize(32),
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 3,
    },
    shadowOpacity: 0.32,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewButtonBack: {
    height: Normalize(40),
    marginTop: Normalize(36),
    marginLeft: Normalize(16),
    width: Normalize(110),
  },
  buttonBack: {
    borderColor: "white",
    width: Normalize(110),
    // paddingHorizontal: Normalize(24),
    // position: "relative",
    // left: Normalize(16),
    // top: Normalize(38)
  },
  buttonBackText: {
    fontFamily: "open-sans-light",
    color: "white",
    width: Normalize(80),
    alignItems: "center",
    fontSize: Normalize(15),
  },
  buttonBackIcon: {
    color: "white",
    marginRight: Normalize(6),
    paddingRight: 0
  },

  welcomeView: {
    padding: Normalize(20),
  },
  welcomeHeader: {
    fontFamily: "open-sans-light",
    color: "#666",
    textAlign: "center"
  },
  welcomeSubheader: {
    fontFamily: "open-sans-light",
    color: "#777",
    textAlign: "center"
  },

  formView: {
    marginBottom: Normalize(26),
  },
  itemMargin: {
    marginBottom: 12,
  },
  labelStyle: {
    fontFamily: "roboto-medium",
    color: Constants.PRIMARY_COLOR,
    opacity: Platform.select({ ios: 0.96, android: 0.72 }),
    top: -8,
    left: 12
  },
  iconStyle: {
    color: Constants.PRIMARY_COLOR,
    fontSize: 16,
    opacity: Platform.select({ ios: 0.86, android: 0.72 }),
    top: -3,
    right: 14,
    marginLeft: 12,
  },

  buttonRegisterView: {
    padding: Normalize(22),
    marginBottom: Normalize(16),
  },
  buttonRegister: {
    backgroundColor: Constants.PRIMARY_COLOR,
  },
  buttonRegisterText: {
    fontSize: Normalize(16),
    fontFamily: "open-sans-bold"
  },

  // footerStyle: {
  //   width: "100%",
  //   height: Normalize(42),
  // },
  // buttonRegister: {
  //   height: "100%",
  //   width: "100%",
  //   backgroundColor: Constants.PRIMARY_COLOR,
  // }
});

export default styles;
