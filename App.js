/**
 * Social Network App
 * @author Davi Souto
 * @since 31/10/2019
 */
import React, { Component } from 'react';

import { AppLoading } from 'expo';

import { Root, Drawer } from "native-base";

import { YellowBox, Text } from 'react-native';

import * as Font from 'expo-font';

import Sidebar from '@App/components/Sidebar';
import AppContainer from '@App/Navigator/AppContainer';

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
        <Drawer
          ref={ (ref) => this.drawer = ref }
          content={ <Sidebar /> }
        >
          <AppContainer
            ref={nav => {
              this.navigator = nav;
            }}
          />
        </Drawer>
      </Root>
    );
  }
}
