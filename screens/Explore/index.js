/**
 * Tela Explorar
 * Buscar possíveis amigos próximos
 * @author Davi Souto
 * @since  20/01/2020
 */

import React, { PureComponent } from 'react';
import { Text, View, Image, Platform } from 'react-native';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import MapView, { Marker } from 'react-native-maps';

import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import Constants from '@App/Constants';

import styles from './styles';

class ScreenExplore extends PureComponent {

  constructor(props){
    super(props);

    // Zoom
    this.latitudeDelta = 0.0043;
    this.longitudeDelta = 0.0034;

    this.state = {
      loading_user: true,
      location: false,
      error_user_location: false,
      // randomMarker: false
    };
  }

  async componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        error_user_location: 'Oops, essa função não funciona no emulador. Tente no seu aparelho !',
        loading_user: false
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        error_user_location: 'Permissão de localização negada',
        loading_user: false
      });
    }

    Location.getCurrentPositionAsync({ maximumAge: 5000 }).then((location) => {
      // if (! this.props.last_location)
      // {
      //   this.props.setLastLocation({
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //     latitudeDelta: this.latitudeDelta,
      //     longitudeDelta: this.longitudeDelta
      //   });
      // }
      //
      // this.props.getLocalization(location.coords.latitude, location.coords.longitude);

      location = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: this.latitudeDelta,
        longitudeDelta: this.longitudeDelta
      }

      this.setState({
        location: location,
        loading_user: false
      });
    });

    // this.generateRandomMarker(location.coords);
  };

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
            <Title style={ styles.titleStyle }>Explorar</Title>
          </Body>
          <Right>
            {/*
            <Button transparent>
              <Icon name='menu' style={ styles.menuStyle } />
            </Button>
            */}
          </Right>
        </Header>

        <Body style={ styles.container }>
          { this.renderMap() }
        </Body>
      </Container>
    );
  }

  /**
   * Renderizar mapa
   */
  renderMap(){
    if (this.state.loading_user)
    {
      return (
        <Text>Carregando...</Text>
      );
    }

    return (
      <MapView
        initialRegion={ this.state.location }
        loadingEnabled={ true }
        ref={ (ref) => this.map = ref }
        style={ styles.mapStyle }
        showsTraffic={ false }
        rotateEnabled={ false }
        pitchEnabled={ false }
        toolbarEnabled={ false }
        showsCompass={ false }
        showsMyLocationButton={ false }
      >
        { this.renderUserMarker() }
      </MapView>
    );
  }

  /**
   * Renderizar marcador de localização do usuário
   */
  renderUserMarker() {
    return (
      <MapView.Marker
        coordinate={{
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude
        }}
        title={ "Localização" }
        description={ "Você está aqui" }
        opacity={ 0.7 }
        tracksViewChanges={ false }
        pinColor={ Constants.PRIMARY_COLOR }
        flat={ true }
        anchor={{ x: 0.5, y: 0.5 }}
      >
        {
        // <Text style={ styles.gambIcon }></Text>
        // <Icon name="home" size={ Normalize(30) } color={ ConstantsApp.PRIMARY_COLOR } style={ styles.truckIcon } />
        }
      </MapView.Marker>
    )
  }
}

///////////////////////////////////////////////////////////////////////////

export default ScreenExplore;

// const mapStateToProps = store => ({
// });
//
// const mapDispatchToProps = dispatch =>
//   bindActionCreators({  }, dispatch);
//
// export default connect(mapStateToProps, mapDispatchToProps)(ScreenAbout);
