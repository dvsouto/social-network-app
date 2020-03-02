/**
 * Authentication Screen
 * @author Davi Souto
 * @since  26/02/2020
 */

import React, { Component } from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';

import { Container, Content, Form, Item, Input, Label, Icon, Button, Text, Toast } from 'native-base';
import LoadingIndicator from "@App/components/LoadingIndicator";

import Store from '@App/redux/Store';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { doLogin, setField } from '@Reducers/authReducer';
import { ping } from "@Reducers/pingReducer";

import Constants from '@App/Constants';

import styles from './styles';

class ScreenAuthenticate extends Component {

  constructor(props){
    super(props);

    // Persistir login
    if (Store.getState().auth.token)
      props.navigation.navigate('App');
  }

  doLogin(){
    // this.props.ping();

    if (this.props.loading)
      return;

    this.props.doLogin(this.props.email, this.props.password).then((payload) => {
      this.props.navigation.navigate("App");
    }).catch((payload) => {
      console.log(payload.payload.error);
      Toast.show({
        text: payload.payload.error,
        buttonText: "",
        type: "danger",
        // position: "top"
      });
    })
  }

  callRegisterScreen(){
    this.props.setField("password", "");

    this.props.navigation.navigate("Register");
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Container style={ styles.containerStyle }>

          <View style={ styles.topView }>
            <Image source={ require("@App/assets/icons/rocket.png") } style={ styles.topIconStyle } />
          </View>

          <Content style={ styles.bottomView }>
            <Form style={ styles.formView }>
              <Item style={ styles.itemMargin } floatingLabel last>
                <Label style={ styles.labelStyle }>Email</Label>
                <Input
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={ false }
                  keyboardType="email-address"
                  maxLength={ 60 }
                  returnKeyType="next"
                  selectionColor={ Constants.PRIMARY_COLOR }
                  spellCheck={ false }
                  textContentType="emailAddress"
                  value={ this.props.email }
                  onChangeText={ value => this.props.setField("email", value) }
                />
                <Icon name='ios-mail' style={ styles.iconStyle } />
              </Item>
              <Item floatingLabel last>
                <Label style={ styles.labelStyle }>Senha</Label>
                <Input
                  autoCapitalize="none"
                  autoCompleteType="password"
                  autoCorrect={ false }
                  maxLength={ 30 }
                  returnKeyType="done"
                  selectionColor={ Constants.PRIMARY_COLOR }
                  secureTextEntry={ true }
                  spellCheck={ false }
                  textContentType="password"
                  value={ this.props.password }
                  onChangeText={ value => this.props.setField("password", value) }
                />
                <Icon name='ios-lock' style={ styles.iconStyle } />
              </Item>
            </Form>

            <View style={ styles.buttonsContainer }>
              <View style={ styles.viewButtonWrapper }>
                <Button background={TouchableNativeFeedback.Ripple("#eee", false)} block rounded style={ styles.buttonSignIn } onPress={ this.doLogin.bind(this) }>
                  { (this.props.loading) ? (<LoadingIndicator color="white" />) : (<Text style={ styles.buttonText }>ENTRAR</Text>) }
                </Button>
              </View>

              <View style={ styles.viewButtonWrapper }>
                <Button background={TouchableNativeFeedback.Ripple("#ddd", false)} block bordered rounded style={ styles.buttonRegister } onPress={ this.callRegisterScreen.bind(this) }>
                  <Text style={ [styles.buttonText, styles.buttonRegisterText] }>REGISTRE-SE</Text>
                </Button>
              </View>

              <Button background={TouchableNativeFeedback.Ripple("#fff", false)} block transparent>
                <Text style={ [styles.buttonText, styles.buttonForgetPasswordText] }>Esqueci minha senha</Text>
              </Button>
            </View>
          </Content>

      </Container>
    );
  }
}

///////////////////////////////////////////////////////////////////////////

const mapStateToProps = store => ({
  email: store.auth.fields.email,
  password: store.auth.fields.password,

  loading: store.auth.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ doLogin, setField, ping }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScreenAuthenticate);
