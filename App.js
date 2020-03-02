/**
 * Social Network App
 * @author Davi Souto
 * @since 31/10/2019
 */
import React, { Component } from 'react';
import { View, Text, YellowBox, StatusBar, Platform } from 'react-native';
import { AppLoading } from 'expo';

import { Root } from "native-base";

import * as Font from 'expo-font';

import { AsyncStorage } from "react-native";

import { Provider } from 'react-redux';
import Store from '@App/redux/Store';

import { setPersistedData } from '@Reducers/authReducer';

import Navigator from '@App/Navigator';
// import NavigationService from '@Components/Navigator/NavigationService';

/**
 * Carregar fontes em cache
 * @param object[] fonts
 */
function cacheFonts(fonts) {
  return Font.loadAsync(fonts);
}

export default class App extends Component {
  state = {
    appIsReady: false,
  };

  /**
   * Não exibir warnings de require cycle
   */
  muteWarnings() {
    YellowBox.ignoreWarnings([
      'Require cycle:',
      'Module RCTBluetoothSerial',
      'ImageStore is deprecated',
      '[GraphQL error]'
    ]);
  }

  async _loadResourcesAsync() {
    const fonts = cacheFonts({
      'open-sans-light': require('@App/assets/fonts/OpenSans-Light.ttf'),
      'open-sans': require('@App/assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('@App/assets/fonts/OpenSans-Bold.ttf'),
      'roboto': require('@App/assets/fonts/Roboto-Regular.ttf'),
      'roboto-medium': require('@App/assets/fonts/Roboto-Medium.ttf'),
      'Roboto_medium': require('@App/assets/fonts/Roboto-Medium.ttf'),
      'roboto-bold': require('@App/assets/fonts/Roboto-Bold.ttf'),
      'roboto-light': require('@App/assets/fonts/Roboto-Light.ttf'),
    });

    const async_get_email = AsyncStorage.getItem("@social-network:auth:email").then(function(_email){
      email = _email;

      console.log("EMAIL RECUPERADO: ", email);
    });

    const async_get_token = AsyncStorage.getItem("@social-network:auth:token").then(function(_token){
      token = _token;
    });

    const async_get_user = AsyncStorage.getItem("@social-network:auth:user").then(function(_user){
      user = JSON.parse(_user);

      console.log("USER:", user);
    });

    await Promise.all([ fonts, async_get_token, async_get_token, async_get_user ]);

    Store.dispatch(setPersistedData(email, token, user));
  }

  finishedLoading()
  {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;

    // this.dev_debug();

    this.setState({ appIsReady: true });
  }

  constructor(props){
    super(props);

    this.muteWarnings();
  }

  render(){
    if (! this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={ this._loadResourcesAsync }
          onFinish={ this.finishedLoading.bind(this) }
          onError={ console.error }
        />
      );
    }

    return (
      <Root>
        <Provider store={ Store }>
          <StatusBar barStyle="light-content" translucent={ true } />
          <Navigator
            ref={nav => {
              this.navigator = nav;
            }}
          />
        </Provider>
      </Root>
    );
  }
}
