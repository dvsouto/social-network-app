import { StyleSheet, Platform } from 'react-native';

import Constants from '@App/Constants';
import { Normalize } from  '@App/library/Font';

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    paddingBottom: Normalize(22),
    // backgroundColor: "#333"
    backgroundColor: "#fff"
  },

  top_view: {
    // backgroundColor: "#f7f7f7",
    backgroundColor: Constants.PRIMARY_COLOR,
    width: "100%",
    height: Normalize(102),
    alignItems: "center",
    justifyContent: "center"
  },

  user_view: {
    paddingVertical: Normalize(12),
    paddingHorizontal: Normalize(22),
    marginHorizontal: Normalize(22),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: Normalize(12),
    // backgroundColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(0,0,0,0.08)",
    borderRadius: Normalize(18),
  },
  user_icon: {
    // color: "white",
    color: "#333",
    marginRight: Normalize(8),
  },
  user_text: {
    // color: "white",
    color: "#333"
  },

  logo: {
    width: "22%",
    resizeMode: "contain"
  },

  menu_list: {
    alignSelf: "stretch",
    paddingTop: Normalize(22),
    borderRadius: 0,
  },
  menu_list_item: {
  },
  menu_body: {
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    borderRadius: 0,
  },
  menu_icon: {
    color: "#fff",
    backgroundColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
    alignItems: "center"
  },
  menu_text: {
    color: "#fff",
    fontSize: Normalize(17)
  },

  menu_button: {
    backgroundColor: Constants.PRIMARY_COLOR,
    borderBottomColor: Constants.PRIMARY_COLOR,
    borderBottomWidth: 0,
  },
  menu_button_icon: {
    // width: Normalize(32),
    width: Normalize(22),
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    // backgroundColor: Constants.PRIMARY_COLOR_2,
    // padding: Normalize(4),
    // borderRadius: 18,
  },
  menu_button_text: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default styles;
