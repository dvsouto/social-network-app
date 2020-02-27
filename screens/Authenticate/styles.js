import { StyleSheet, Platform } from 'react-native';

import Constants from '@App/Constants';

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#eee"
  },
  topView: {
    flex: 0.35,
    backgroundColor: Constants.PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomView: {
    flex: 0.65,
    backgroundColor: "#eee",
  },
  topIconStyle: {
    height: "65%",
    resizeMode: "contain"
  },
  formView: {
    marginTop: "12%",
    padding: 0
  },
  itemMargin: {
    marginBottom: 22,
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
  buttonsContainer: {
    marginTop: 14,
    padding: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSignIn: {
    // marginBottom: 18,
    backgroundColor: Constants.PRIMARY_COLOR,
  },
  buttonRegister: {
    // marginBottom: 8,
    borderColor: Constants.PRIMARY_COLOR
  },
  buttonText: {
    fontFamily: "roboto-medium"
  },
  buttonRegisterText: {
    color: Constants.PRIMARY_COLOR,
  },
  buttonForgetPasswordText: {
    fontFamily: "roboto",
    color: Constants.PRIMARY_COLOR,
  },
  viewButtonWrapper: {
    width: "100%",
    height: 45,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 18,
  }
});

export default styles;
