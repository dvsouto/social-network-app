/**
 * Tela de pessoas próximas
 * @author Davi Souto
 * @since  21/01/2020
 */

import React, { PureComponent } from 'react';
import { Text, View, Image } from 'react-native';

import { Container, Header, Left, Body, Right, Button, Icon, Title, Thumbnail, Content, Form } from 'native-base';

import GenderSelection from '@App/components/GenderSelection';
import PeopleCard from '@App/components/PeopleCard';

import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

class ScreenProximity extends PureComponent {

  constructor(props){
    super(props);
  }
  ////////////////////////////////////////////

  render() {
    return (
      <Container>
        <Header style={ styles.headerStyle }>
          <Left>
          </Left>

          <Body style={{ flex: 1.5 }}>
            <Title style={ styles.titleStyle }>Pessoas na região</Title>
          </Body>

          <Right>
            <Button transparent>
              <Icon name='search' style={ styles.menuStyle }  />
            </Button>
          </Right>
        </Header>
        <Content>
          <GenderSelection />

          <PeopleCard />
          <PeopleCard />
          <PeopleCard />
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
