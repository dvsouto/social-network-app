/**
 * Register Screen
 * @author Davi Souto
 * @since  27/02/2020
 */

import React, { Component } from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';

import { Container, Content, Form, Item, Input, Label, Icon, Button, Text, H3, Footer, Toast } from 'native-base';
import LoadingIndicator from "@App/components/LoadingIndicator";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setField, resetFields, doRegister } from '@Reducers/registerReducer';
import { setField as setFieldAuth } from '@Reducers/authReducer';

import Constants from '@App/Constants';

import styles from './styles';

class ScreenRegister extends Component {

  constructor(props){
    super(props);
  }

  _errorMessage(msg){
    return Toast.show({
      text: msg,
      buttonText: "",
      type: "danger",
      // position: "top"
    });
  }

  //////////////////////////////////

  doBackLogin(){
    if (this.props.loading)
      return;

    this.props.resetFields();

    this.props.navigation.navigate("Login");
  }

  registerUser(){
    if (this.props.loading)
      return;

    if (! this.props.name.trim())
      return this._errorMessage("Informe o nome !")

    if (! this.props.last_name.trim())
      return this._errorMessage("Informe o sobrenome !")

    if (! this.props.email.trim())
      return this._errorMessage("Informe o email !")

    if (! this.props.document.trim())
      return this._errorMessage("Informe o CPF !")

    if (! this.props.password.trim())
      return this._errorMessage("Informe a senha !");

    if (! this.props.repeat_password.trim())
      return this._errorMessage("Informe o repetir senha !");

    if (this.props.password.trim() != this.props.repeat_password)
      return this._errorMessage("Senha repetida está incorreta !")

    this.props.doRegister({
      name: this.props.name,
      last_name: this.props.last_name,
      email: this.props.email,
      document: this.props.document,
      password: this.props.password,
    }).then((result) => {
      var email = (' ' + this.props.email).slice(1);
      window.setTimeout(() => this.props.setFieldAuth("email", email), 1);

      this.props.resetFields();

      this.props.navigation.navigate("Login");

      Toast.show({
        text: "Registrado com sucesso !",
        buttonText: "",
        type: "success"
      });
    }).catch((payload) => {
      Toast.show({
        text: payload.payload.error,
        buttonText: "",
        type: "danger",
      });
    });
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Container style={ styles.containerStyle }>
        <View style={ styles.viewButtonBack }>
          <Button background={TouchableNativeFeedback.SelectableBackgroundBorderless()} bordered rounded style={ styles.buttonBack } onPress={ this.doBackLogin.bind(this) }>
            <Icon name='ios-arrow-back' style={ styles.buttonBackIcon } />
            <Text style={ styles.buttonBackText }>VOLTAR</Text>
          </Button>
        </View>

        <View style={ styles.titleView}>
          <Text style={ styles.titleText }>REGISTRE-SE</Text>
        </View>

        <Content style={ styles.boxView }>
          <View style={ styles.welcomeView }>
            <H3 style={ styles.welcomeHeader }>Bem vindo !</H3>
            <H3 style={ styles.welcomeSubheader }>Informe seus dados para o cadastro :)</H3>
          </View>

          <Form style={ styles.formView }>
            <Item floatingLabel last>
              <Label style={ styles.labelStyle }>Nome</Label>
              <Input
                autoCapitalize="words"
                autoCompleteType="name"
                autoCorrect={ false }
                keyboardType="default"
                maxLength={ 60 }
                returnKeyType="next"
                selectionColor={ Constants.PRIMARY_COLOR }
                spellCheck={ false }
                textContentType="name"
                value={ this.props.name }
                onChangeText={ value => this.props.setField("name", value) }
              />
              <Icon name='ios-person' style={ styles.iconStyle } />
            </Item>

            <Item floatingLabel last>
              <Label style={ styles.labelStyle }>Sobrenome</Label>
              <Input
                autoCapitalize="words"
                autoCompleteType="name"
                autoCorrect={ false }
                keyboardType="default"
                maxLength={ 60 }
                returnKeyType="next"
                selectionColor={ Constants.PRIMARY_COLOR }
                spellCheck={ false }
                textContentType="familyName"
                value={ this.props.last_name }
                onChangeText={ value => this.props.setField("last_name", value) }
              />
              <Icon name='ios-person' style={ styles.iconStyle } />
            </Item>

            <Item floatingLabel last>
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
              <Label style={ styles.labelStyle }>Cpf</Label>
              <Input
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={ false }
                keyboardType="number-pad"
                maxLength={ 11 }
                returnKeyType="next"
                selectionColor={ Constants.PRIMARY_COLOR }
                spellCheck={ false }
                textContentType="none"
                value={ this.props.document }
                onChangeText={ value => this.props.setField("document", value) }
              />
              <Icon name='ios-document' style={ styles.iconStyle } />
            </Item>

            <Item floatingLabel last>
              <Label style={ styles.labelStyle }>Senha</Label>
              <Input
                autoCapitalize="none"
                autoCompleteType="password"
                autoCorrect={ false }
                maxLength={ 30 }
                returnKeyType="next"
                selectionColor={ Constants.PRIMARY_COLOR }
                secureTextEntry={ true }
                spellCheck={ false }
                textContentType="password"
                value={ this.props.password }
                onChangeText={ value => this.props.setField("password", value) }
              />
              <Icon name='ios-lock' style={ styles.iconStyle } />
            </Item>

            <Item floatingLabel last>
              <Label style={ styles.labelStyle }>Repetir Senha</Label>
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
                value={ this.props.repeat_password }
                onChangeText={ value => this.props.setField("repeat_password", value) }
              />
              <Icon name='ios-lock' style={ styles.iconStyle } />
            </Item>
          </Form>

          <View style={ styles.buttonRegisterView}>
            <Button style={ styles.buttonRegister } onPress={ this.registerUser.bind(this) } block rounded>
              { this.props.loading ? (<LoadingIndicator />) : (<Text style={ styles.buttonRegisterText }>REGISTRAR</Text>) }
            </Button>
          </View>
        </Content>

        {/*
        <Footer style={ styles.footerStyle } >
          <Button style={ styles.buttonRegister } full>
            <Text>REGISTRAR</Text>
          </Button>
        </Footer>
        */}
      </Container>
    );
  }
}

///////////////////////////////////////////////////////////////////////////

const mapStateToProps = store => ({
  name: store.register.fields.name,
  last_name: store.register.fields.last_name,
  email: store.register.fields.email,
  document: store.register.fields.document,
  password: store.register.fields.password,
  repeat_password: store.register.fields.repeat_password,

  loading: store.register.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setField, resetFields, doRegister, setFieldAuth }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScreenRegister);
