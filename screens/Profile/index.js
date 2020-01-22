/**
 * Tela de Peril
 * @author Davi Souto
 * @since  20/01/2020
 */

import React, { PureComponent } from 'react';
import { Text, View, Image } from 'react-native';

import { Container, Header, Left, Body, Right, Button, Icon, Title, Thumbnail, Content } from 'native-base';

import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

class ScreenProfile extends PureComponent {

  constructor(props){
    super(props);
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Container>
        <Header style={ styles.headerStyle }>
          <Left>
            {/*
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
            */}
          </Left>
          <Body>
            <Title style={ styles.titleStyle }>Perfil</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' style={ styles.menuStyle }  />
            </Button>
          </Right>
        </Header>
        <Body>
          <Content contentContainerStyle={{ alignItems: "center" }}>
            <Thumbnail large source={{uri: "https://avatars0.githubusercontent.com/u/16228821?s=460&v=4"}} style={ styles.thumbnailProfile } />
            <Text style={ styles.nameProfile }>DAVI SOUTO</Text>
          </Content>
        </Body>
      </Container>
    );
  }
}

///////////////////////////////////////////////////////////////////////////

export default ScreenProfile;

// const mapStateToProps = store => ({
// });
//
// const mapDispatchToProps = dispatch =>
//   bindActionCreators({  }, dispatch);
//
// export default connect(mapStateToProps, mapDispatchToProps)(ScreenAbout);
