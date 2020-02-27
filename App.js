/**
 * Social Network App
 * @author Davi Souto
 * @since 31/10/2019
 */
import React, { Component } from 'react';
import { YellowBox, Text, StatusBar } from 'react-native';
import { AppLoading } from 'expo';

import { Root } from "native-base";

import * as Font from 'expo-font';

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
    ]);
  }

  async _loadResourcesAsync() {
    const fonts = cacheFonts({
      'open-sans': require('@App/assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('@App/assets/fonts/OpenSans-Bold.ttf'),
      'roboto': require('@App/assets/fonts/Roboto-Regular.ttf'),
      'roboto-medium': require('@App/assets/fonts/Roboto-Medium.ttf'),
      'Roboto_medium': require('@App/assets/fonts/Roboto-Medium.ttf'),
      'roboto-bold': require('@App/assets/fonts/Roboto-Bold.ttf'),
      'roboto-light': require('@App/assets/fonts/Roboto-Light.ttf'),
    });

    await Promise.all([ fonts ]);
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
        <StatusBar barStyle="light-content" />
        <Navigator
          ref={nav => {
            this.navigator = nav;
          }}
        />
      </Root>
    );
  }
}
