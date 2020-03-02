/**
 * Tela de Peril
 * @author Davi Souto
 * @since  20/01/2020
 */

import React, { PureComponent } from 'react';
import { View, Text, Image, Platform } from 'react-native';

import { Container, Body, Thumbnail, Content, Drawer, Button, Icon, List, ListItem, Left, Right } from 'native-base';

import * as Permissions from 'expo-permissions';

import HeaderApp from '@App/components/HeaderApp';
import Sidebar from '@App/components/Sidebar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setStatusLocation, getUserLocation } from '@Reducers/locationReducer';

// import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

class ScreenProfile extends PureComponent {

  constructor(props){
    super(props);

    this.state = {
      drawer: false,
    }

    this.checkPermissionLocation();
  }

  ////////////////////////////////////////////

  /**
   * Ask permission of location to user
   * @author Davi Souto
   * @since 01/03/2020
   */
  async checkPermissionLocation(){
    Permissions.askAsync(Permissions.LOCATION).then((status) => this.setStatusLocation(status.status));
  }

  setStatusLocation(status){
    this.props.setStatusLocation(status);

    if (status == "granted"){
      this.props.getUserLocation();
    }
  }

  editProfile() {
    this.props.navigation.navigate("EditProfile");
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Drawer
        ref={(ref) => { if (! this.state.drawer) this.setState({ drawer: ref }) }}
        content={ <Sidebar navigation={ this.props.navigation } drawer={ this.state.drawer } /> }
        style={{ position: "fixed", left: 0, top: 0 }}
        openDrawerOffset={ 0.25 }
        side={ Platform.select({ android: "left", ios: "right" }) }
      >
        <Container>
          <HeaderApp title="Perfil" drawer={ this.state.drawer } showMenu />
          <Body>
            <View>
              <View style={ styles.profileHeader }>
                <View style={ styles.thumbnailView }>
                  <View style={ styles.thumbnailCircle }>
                    <Thumbnail large source={{uri: "https://avatars0.githubusercontent.com/u/16228821?s=460&v=4"}} style={ styles.thumbnailProfile } />
                  </View>
                </View>

                <View style={ styles.nameView }>
                  <Text style={ styles.nameProfile }>{ this.props.user.name + " " + this.props.user.last_name }</Text>
                </View>

                <View style={ styles.rightProfileView }>
                  <Button style={ styles.buttonEditProfile } onPress={ this.editProfile.bind(this) } bordered rounded>
                    <Icon type="MaterialIcons" name="edit" style={ styles.buttonEditProfileIcon } />
                  </Button>
                </View>
              </View>

              <Container>
                <View style={ styles.viewMainButtons }>
                  <View style={ styles.mainButtonView }>
                    <Button style={ [styles.mainButton, styles.mainButtonActive] }>
                      <Icon active={ true } type="SimpleLineIcons" name="cursor" style={ [ styles.mainButtonIcon, styles.mainButtonActiveIcon ] } />
                    </Button>

                    <Text style={ styles.mainButtonText }>Localização</Text>
                  </View>

                  <View style={ styles.mainButtonView }>
                    <Button style={ [styles.mainButton, styles.mainButtonBordered] } bordered>
                      <Icon type="SimpleLineIcons" name="map" style={ [ styles.mainButtonIcon, styles.mainButtonBorderedIcon ] } />
                    </Button>

                    <Text style={ styles.mainButtonText }>Mapa</Text>
                  </View>

                  <View style={ styles.mainButtonView }>
                    <Button style={ [styles.mainButton, styles.mainButtonBordered] } bordered>
                      <Icon type="SimpleLineIcons" name="share" style={ [ styles.mainButtonIcon, styles.mainButtonBorderedIcon ] } />
                    </Button>

                    <Text style={ styles.mainButtonText }>Redes Sociais</Text>
                  </View>
                </View>

                <Content>
                  <List>
                    <ListItem>
                      <Left>
                        <Icon name="share" />
                        <Text>Redes Sociais</Text>
                      </Left>
                      <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                    </ListItem>

                    <ListItem button>
                      <Left>
                        <Icon name="cog" />
                        <Text>Configurações</Text>
                      </Left>
                      <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                    </ListItem>

                    <ListItem>
                      <Left>
                        <Icon name="lock" />
                        <Text>Alterar Senha</Text>
                      </Left>
                      <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                    </ListItem>

                    <ListItem>
                      <Left>
                        <Icon name="help-buoy" />
                        <Text>Suporte</Text>
                      </Left>
                      <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                    </ListItem>
                  </List>
                </Content>
              </Container>
            </View>
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
  bindActionCreators({ setStatusLocation, getUserLocation  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScreenProfile);
