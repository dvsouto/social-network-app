/**
 * Card de pessoas
 * @author Davi Souto
 * @since 21/01/2020
 */
import React, { Component } from 'react';

import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Center, Body } from 'native-base';

import styles from './styles';

class PeopleCard extends Component {

  constructor(props){
    super(props);
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Card style={{flex: 0}}>
        <CardItem>
          <Left>
            <Thumbnail source={{uri: 'https://picsum.photos/350/350'}} />
            <Body>
              <Text>Davi Souto</Text>
              <Text note>11 de Dezembro de 1996</Text>
              <Text note>0.2 km</Text>
            </Body>
          </Left>

        </CardItem>
        <CardItem>
          <Body>
            {/*<Image source={{uri: 'https://picsum.photos/120/200'}} style={{height: 120, width: 200, flex: 1}}/>
            <Text>
              Lorem ipsum
            </Text>
            */}
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{color: '#87838B'}}>
              <Icon name="logo-facebook" />
              <Text>Facebook</Text>
            </Button>
          </Left>

          <Right>
            <Button transparent textStyle={{color: '#87838B'}}>
              <Icon name="logo-instagram" />
              <Text>Instagram</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default PeopleCard;
