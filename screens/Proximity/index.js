/**
 * Tela de pessoas próximas
 * @author Davi Souto
 * @since  21/01/2020
 */

import React, { PureComponent } from 'react';
import { Text, View, Image } from 'react-native';

import { Container, Content } from 'native-base';

import HeaderApp from '@App/components/HeaderApp';
import GenderSelection from '@App/components/GenderSelection';
import PeopleCard from '@App/components/PeopleCard';

import Store from '@App/redux/Store';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { findNearestUsers } from '@Reducers/locationReducer';


// import ApolloClient from "apollo-boost";
// import gql from "graphql-tag";
//
// const client = new ApolloClient({
//   uri: "http://bitnary.com.br:3000/graphql",
//   request: (operation) => {
//     const token = Store.getState().auth.token;
//
//     operation.setContext({
//       headers: {
//         Authorization: token ? `Bearer ${token}` : ''
//       }
//     })
//   }
// });

// import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

class ScreenProximity extends PureComponent {

  _timer_find_users = false;

  constructor(props){
    super(props);

    this.state = {
      nearestUsers: [],
    };
  }

  componentDidMount(){
    // console.log("Vou chamar o GraphQL !");

    // client.query({
    //   query: gql`
    //   {
    //     users{
    //       id,
    //       name,
    //       email,
    //       location {
    //         type,
    //         coordinates {
    //           lat,
    //           lon
    //         }
    //       }
    //     }
    //   }
    //   `
    // }).then(result => console.log("Result:", result));
    // window.setTimeout(() => {
    //   client.query({
    //     query: gql`
    //     query {
    //       nearestUsers(id:"5e5724e542578d2605990073", distance: 1000) {
    //         id,
    //         name,
    //         email,
    //         distance
    //       }
    //     }
    //     `
    //   }).then(result => {
    //     console.log("Results:", result.data);
    //
    //     this.setState({
    //       nearestUsers: result.data.nearestUsers
    //     })
    //   });
    // }, 2000);

    this.props.navigation.addListener('willFocus', this.onReceiveFocus.bind(this));
  }

  onReceiveFocus(){
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

  ////////////////////////////////////////////

  render() {
    return (
      <Container>
        <HeaderApp title="Proximidades" showSearch />
        <Content>
          <GenderSelection />

          { this.renderNearestUsers() }
        </Content>
      </Container>
    );
  }

  renderNearestUsers(){
    if (this.props.statusLocation != "granted")
      return this.renderNotGrantedLocation();

    if (! this.props.checkedLocation || ! this.props.savedUserLocation)
      return this.renderWaitCheckLocation();

    if (! this.props.findedUsers)
      return this.renderFindingUsers();

    return (
      this.props.nearestUsers.map((user) => {
        return (
          <PeopleCard
            user={ user }
            key={ user.id }
            navigation={ this.props.navigation }
          />
        )
      })
    )
  }

  renderNotGrantedLocation(){
    return (
      <Text>Você precisa aceitar as permissões de localização</Text>
    )
  }

  renderWaitCheckLocation(){
    return (
      <Text>Aguarde, estamos buscando sua localização...</Text>
    )
  }

  renderFindingUsers(){
    return (
      <Text>Buscando usuários próximos...</Text>
    )
  }
}

///////////////////////////////////////////////////////////////////////////

const mapStateToProps = store => ({
  savedUserLocation: store.location.savedUserLocation,
  checkedLocation: store.location.checkedLocation,
  statusLocation: store.location.status,

  findedUsers: store.location.findedUsers,
  nearestUsers: store.location.nearestUsers,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ findNearestUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScreenProximity);
