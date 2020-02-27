/**
 * Authentication Screen
 * @author Davi Souto
 * @since  26/02/2020
 */

import React, { Component } from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';

import { Container, Content, Form, Item, Input, Label, Icon, Button, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Constants from '@App/Constants';

import styles from './styles';

class Authenticate extends Component {

  constructor(props){
    super(props);
  }

  doLogin(){
    this.props.navigation.navigate("App");
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
                <Input />
                <Icon name='ios-mail' style={ styles.iconStyle } />
              </Item>
              <Item floatingLabel last>
                <Label style={ styles.labelStyle }>Senha</Label>
                <Input />
                <Icon name='ios-lock' style={ styles.iconStyle } />
              </Item>
            </Form>

            <View style={ styles.buttonsContainer }>
              <View style={ styles.viewButtonWrapper }>
                <Button background={TouchableNativeFeedback.Ripple("#eee", false)} block rounded style={ styles.buttonSignIn } onPress={ this.doLogin.bind(this) }>
                  <Text style={ styles.buttonText }>ENTRAR</Text>
                </Button>
              </View>

              <View style={ styles.viewButtonWrapper }>
                <Button background={TouchableNativeFeedback.Ripple("#ddd", false)} block bordered rounded style={ styles.buttonRegister }>
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

export default Authenticate;

// const mapStateToProps = store => ({
// });
//
// const mapDispatchToProps = dispatch =>
//   bindActionCreators({  }, dispatch);
//
// export default connect(mapStateToProps, mapDispatchToProps)(ScreenAbout);
