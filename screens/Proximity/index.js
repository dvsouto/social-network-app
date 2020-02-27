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

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://bitnary.com.br:3000/graphql"
});

// import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

class ScreenProximity extends PureComponent {

  constructor(props){
    super(props);

    this.state = {
      nearestUsers: [],
    };
  }

  componentDidMount(){
    console.log("Vou chamar o GraphQL !");

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

    client.query({
      query: gql`
      query {
        nearestUsers(id:"5e5724e542578d2605990073", distance: 1000) {
          id,
          name,
          email,
          distance
        }
      }
      `
    }).then(result => {
      console.log("Results:", result.data);

      this.setState({
        nearestUsers: result.data.nearestUsers
      })
    }
    );
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Container>
        <HeaderApp showSearch />
        <Content>
          <GenderSelection />

          {
            this.state.nearestUsers.map((user) => {
              return (
                <PeopleCard
                  user={ user }
                  key={ user.id }
                />
              )
            })
          }
        </Content>
      </Container>
    );
  }
}

///////////////////////////////////////////////////////////////////////////

export default ScreenProximity;

// const mapStateToProps = store => ({
// });
//
// const mapDispatchToProps = dispatch =>
//   bindActionCreators({  }, dispatch);
//
// export default connect(mapStateToProps, mapDispatchToProps)(ScreenAbout);
