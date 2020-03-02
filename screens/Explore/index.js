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
import HeaderApp from '@App/components/HeaderApp';

import Store from '@App/redux/Store';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { findNearestUsers } from '@Reducers/locationReducer';

import Constants from '@App/Constants';

import styles from './styles';

class ScreenExplore extends PureComponent {

  constructor(props){
    super(props);

    this.state = {
      hasFocus: false,
    }

    // Zoom
    this.latitudeDelta = 0.0043;
    this.longitudeDelta = 0.0034;
  }

  componentDidMount(){
    this.props.navigation.addListener('willFocus', this.onReceiveFocus.bind(this));
    this.props.navigation.addListener('willBlur', this.onBlur.bind(this));
  }

  onReceiveFocus(){
    this.setState({ hasFocus: true });

    // Wait save the user location
    if (! this.props.savedUserLocation)
    {
      // Create timer to call function again
      this._timer_find_users = window.setTimeout(() => this.onReceiveFocus(), 1000);

      return;
    }

    this._timer_find_users = false;

    this.props.findNearestUsers();
  }

  onBlur(){
    this.setState({ hasFocus: false });
  }

  ////////////////////////////////////////////

  render() {
    if (! this.state.hasFocus)
      return null;

    return (
      <Container>
        <HeaderApp title="Explorar" showMenu={ false } showSearch={ false }  />

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
    if (! this.props.savedUserLocation && ! this.props.findedUsers)
    {
      return (
        <Text>Carregando...</Text>
      );
    }

    return (
      <MapView
        initialRegion={{
          latitude: this.props.location.lat,
          longitude: this.props.location.lon,
          latitudeDelta: this.latitudeDelta,
          longitudeDelta: this.longitudeDelta,
        }}
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
        { this.renderNearestUsersMarkers() }
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
          latitude: this.props.location.lat,
          longitude: this.props.location.lon
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

  renderNearestUsersMarkers() {
    return this.props.nearestUsers.map((user) => {
      if (! user.location || ! user.location.coordinates || ! user.location.coordinates.lat)
        return;

      return (
        <MapView.Marker
          key={ user.id }
          coordinate={{
            latitude: user.location.coordinates.lat,
            longitude: user.location.coordinates.lon,
          }}
          title={ user.name + " " + user.last_name }
          description={ user.distance + "km" }
          opacity={ 0.7 }
          pinColor="#333"
          flat={ true }
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <Text style={ styles.gambIcon }></Text>
          <Icon name="ios-person" size={ 22 } color="#333" style={ styles.userIcon } />
        </MapView.Marker>
      )
    });
  }
}

///////////////////////////////////////////////////////////////////////////

const mapStateToProps = store => ({
  location: store.location.location,

  savedUserLocation: store.location.savedUserLocation,
  checkedLocation: store.location.checkedLocation,

  findedUsers: store.location.findedUsers,
  nearestUsers: store.location.nearestUsers,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ findNearestUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScreenExplore);
