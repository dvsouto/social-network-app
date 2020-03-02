/**
 * Tela de Peril
 * @author Davi Souto
 * @since  20/01/2020
 */

import React, { PureComponent } from 'react';

import { Platform, TouchableNativeFeedback } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';

import LoadingIndicator from "@App/components/LoadingIndicator";

import Constants from '@App/Constants';

// import { Text, View, Image } from 'react-native';


import styles from './styles';

class HeaderApp extends PureComponent {
  static defaultProps = {
    title: '',
    drawer: false,

    showMenu: false,
    showBack: false,
    showSearch: false,
    showSave: false,
    loading: false,

    btnSaveFunction: () => {},
  }

  constructor(props){
    super(props);
  }

  openSidebarMenu(){
    if (this.props.drawer)
      this.props.drawer._root.open();
  }

  navigateBack(){
    this.props.navigation.goBack();
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
            Platform.OS == "android" && this.props.showMenu && ! this.props.loading ? (
              <Button background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.15)", false)} onPress={ this.openSidebarMenu.bind(this) } transparent>
                <Icon name='menu' style={ styles.menuStyle }  />
              </Button>
            ) : false
          }

          {
            this.props.showBack && ! this.props.loading ? (
              <Button background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.15)", false)} onPress={ this.navigateBack.bind(this) } transparent>
                <Icon name='ios-arrow-back' style={ styles.backButtonStyle }  />
              </Button>
            ) : false
          }
        </Left>
        <Body>
          <Title style={ styles.titleStyle }>{ this.props.title }</Title>
        </Body>
        <Right>
          {
            Platform.OS == "ios" && this.props.showMenu ? (
              <Button onPress={ this.openSidebarMenu.bind(this) } transparent>
                <Icon name='menu' style={ styles.menuStyle }  />
              </Button>
            ) : false
          }

          { this.renderSearchButton() }
          { this.renderSaveButton() }
          { this.renderLoading() }
        </Right>
      </Header>
    )
  }

  renderSearchButton(){
    if (this.props.showSearch && ! this.props.loading)
    {
      return (
        <Button background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.15)", false)} transparent>
          <Icon name='search' style={ styles.menuStyle }  />
        </Button>
      )
    }

    return false;
  }

  renderSaveButton(){
    if (this.props.showSave && ! this.props.loading)
    {
      return (
      <Button onPress={ this.props.btnSaveFunction.bind(this) } background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.15)", false)} transparent>
        <Text style={ styles.saveText }>Salvar</Text>
      </Button>
      )
    }

    return false;
  }

  renderLoading(){
    if (this.props.loading)
      return (<LoadingIndicator color="white" />);

    return false;
  }
}

export default HeaderApp;
