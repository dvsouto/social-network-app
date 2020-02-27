/**
 * Tela de Peril
 * @author Davi Souto
 * @since  20/01/2020
 */

import React, { PureComponent } from 'react';

import { Platform, TouchableNativeFeedback } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import Constants from '@App/Constants';

// import { Text, View, Image } from 'react-native';


import styles from './styles';

class HeaderApp extends PureComponent {
  static defaultProps = {
    showMenu: false,
    showSearch: false,
    drawer: false,
  }

  constructor(props){
    super(props);
  }

  openSidebarMenu(){
    if (this.props.drawer)
      this.props.drawer._root.open();
  }

  //////////////////////////////

  render(){
    return (
      <Header style={ styles.headerStyle } androidStatusBarColor={ Constants.PRIMARY_COLOR }>
        <Left>
          {/*
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
          */}
          {
            Platform.OS == "android" && this.props.showMenu ? (
              <Button background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.15)", false)} onPress={ this.openSidebarMenu.bind(this) } transparent>
                <Icon name='menu' style={ styles.menuStyle }  />
              </Button>
            ) : false
          }
        </Left>
        <Body>
          <Title style={ styles.titleStyle }>Perfil</Title>
        </Body>
        <Right>
          {
            Platform.OS == "ios" && this.props.showMenu ? (
              <Button onPress={ this.openSidebarMenu.bind(this) } transparent>
                <Icon name='menu' style={ styles.menuStyle }  />
              </Button>
            ) : false
          }

          {
            this.props.showSearch ? (
              <Button background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.15)", false)} transparent>
                <Icon name='search' style={ styles.menuStyle }  />
              </Button>
            ) : false
          }
        </Right>
      </Header>
    )
  }
}

export default HeaderApp;
