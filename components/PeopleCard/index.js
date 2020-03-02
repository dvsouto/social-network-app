/**
 * Card de pessoas
 * @author Davi Souto
 * @since 21/01/2020
 */
import React, { Component } from 'react';

import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Center, Body } from 'native-base';

import Environment from "@App/Environment";

import styles from './styles';

class PeopleCard extends Component {

  static defaultProps = {
    user: {
      name: '',
      birthdate: '11 de Dezembro de 1996',
      distance: 0
    }
  }

  constructor(props){
    super(props);
  }

  viewUserProfile(user){
    this.props.navigation.navigate('UserProfile', { user: this.props.user });
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Card style={{flex: 0}}>
        <CardItem button onPress={ this.viewUserProfile.bind(this) }>
          <Left>
            { this.renderThumbnailProfile() }
            <Body>
              <Text>{ this.props.user.name + " " + this.props.user.last_name }</Text>
              <Text note>11 de Dezembro de 1996</Text>
              <Text note>{ this.props.user.distance } km</Text>
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

  renderThumbnailProfile(){
    if (this.props.user.photo && typeof this.props.user.photo == "string")
      return (<Thumbnail source={{ uri: Environment.storageProfilePhoto + this.props.user.photo }} />)
    return (<Thumbnail source={ require("@App/assets/icons/empty_photo.jpg") } />)
  }
}

export default PeopleCard;
