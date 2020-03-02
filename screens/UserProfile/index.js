/**
 * User Profile
 * @author Davi Souto
 * @since  01/03/2020
 */

import React, { PureComponent } from 'react';
import { Text, View, Image, Platform } from 'react-native';

import { Container, Body, Thumbnail, Content } from 'native-base';

import HeaderApp from '@App/components/HeaderApp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

class ScreenUserProfile extends PureComponent {
  constructor(props){
    super(props);

    this.user = this.props.navigation.state.params.user;
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Container>
        <HeaderApp title="Perfil" showMenu={ false } />
        <Body>
          <Content contentContainerStyle={{ alignItems: "center" }}>
            <Thumbnail large source={{uri: "https://avatars0.githubusercontent.com/u/16228821?s=460&v=4"}} style={ styles.thumbnailProfile } />
            <Text style={ styles.nameProfile }>{ this.user.name + " " + this.user.last_name }</Text>
          </Content>
        </Body>
      </Container>
    );
  }
}

///////////////////////////////////////////////////////////////////////////

const mapStateToProps = store => ({
  // user: store.auth.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScreenUserProfile);
