/**
 * Tela de Peril
 * @author Davi Souto
 * @since  20/01/2020
 */

import React, { PureComponent } from 'react';
import { Text, View, Image, Platform } from 'react-native';

import { Container, Body, Thumbnail, Content, Drawer } from 'native-base';

import HeaderApp from '@App/components/HeaderApp';
import Sidebar from '@App/components/Sidebar';

// import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

class ScreenProfile extends PureComponent {

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
        style={{ position: "fixed", left: 0, top: 0 }}
        openDrawerOffset={ 0.25 }
        side={ Platform.select({ android: "left", ios: "right" }) }
      >
        <Container>
          <HeaderApp drawer={ this.state.drawer } showMenu />
          <Body>
            <Content contentContainerStyle={{ alignItems: "center" }}>
              <Thumbnail large source={{uri: "https://avatars0.githubusercontent.com/u/16228821?s=460&v=4"}} style={ styles.thumbnailProfile } />
              <Text style={ styles.nameProfile }>DAVI SOUTO</Text>
            </Content>
          </Body>
        </Container>
      </Drawer>
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
