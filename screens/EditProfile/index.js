/**
 * Tela de Peril
 * @author Davi Souto
 * @since  20/01/2020
 */

import React, { PureComponent } from 'react';
import { View, Text, Image, Platform } from 'react-native';

import { Container, Body, Thumbnail, Content, Drawer, Button, Icon, Form, Item, Input, Label, Badge } from 'native-base';

import * as Permissions from 'expo-permissions';

import HeaderApp from '@App/components/HeaderApp';
import Sidebar from '@App/components/Sidebar';

import Constants from "@App";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './styles';

class ScreenEditProfile extends PureComponent {

  constructor(props){
    super(props);

    this.state = {
      drawer: false,
    }
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Drawer
        ref={(ref) => { if (! this.state.drawer) this.setState({ drawer: ref }) }}
        content={ <Sidebar navigation={ this.props.navigation } drawer={ this.state.drawer } /> }
        openDrawerOffset={ 0.25 }
        side={ Platform.select({ android: "left", ios: "right" }) }
      >
        <Container>
          <HeaderApp title="Alterar Perfil" drawer={ this.state.drawer } showMenu={ false } showBack={ true } navigation={ this.props.navigation } />
          <Body>
            <View>
              <View style={ styles.photoHeader }>
                <View style={ styles.thumbnailView }>
                  <Thumbnail large source={{uri: "https://avatars0.githubusercontent.com/u/16228821?s=460&v=4"}} style={ styles.thumbnailProfile } />
                  <Button style={ styles.photoButton }>
                    <Icon name="camera" />
                  </Button>
                </View>
              </View>
            </View>

            <Content style={ styles.formContent }>
              <Form style={ styles.formView }>
                <Item stackedLabel last>
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
                  />
                </Item>

                <Item stackedLabel last>
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
                  />
                </Item>
              </Form>
            </Content>
          </Body>
        </Container>
      </Drawer>
    );
  }
}

///////////////////////////////////////////////////////////////////////////

const mapStateToProps = store => ({
  user: store.auth.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScreenEditProfile);
