/**
 * Sidebar menu
 * @author Davi Souto
 * @since  27/02/2020
 */

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Drawer, Content, Icon, Left, Button, Text } from 'native-base';

// import { Normalize } from  '@App/library/Font';
import Constants from '@App/Constants';

import Store from '@App/redux/Store';
import { doLogout } from '@Reducers/authReducer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './styles';

// const tweenDurationTime = 345;

class Sidebar extends Component {

  constructor(props){
    super(props);

    this.menu_image = require("@App/assets/icons/rocket.png");
  }

  doLogout(){
    if (this.props.drawer)
      this.props.drawer._root.close();

    Store.dispatch(doLogout());

    this.props.navigation.navigate('Auth');
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Container style={ styles.container }>
        <View style={ styles.top_view }>
          <Image source={ this.menu_image } style={ styles.logo} />
        </View>

        <View style={ styles.user_view }>
          <Icon name='contact' style={ styles.user_icon } />
          <Text style={ styles.user_text }>{ this.props.user.name + " " + this.props.user.last_name }</Text>
        </View>

        { this.renderMenuList() }
      </Container>
    );
  }

  renderMenuList(){
    return (
      <Content style={ styles.menu_list }>
        <Button style={ styles.menu_button } onPress={ this.doLogout.bind(this) } iconLeft>
          <Icon style={ styles.menu_button_icon } name='power' />
          <Text style={ styles.menu_button_text}>Sair</Text>
        </Button>
      </Content>
    )
  }

}

///////////////////////////////////////////////////////////////////////////

const mapStateToProps = store => ({
  user: store.auth.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
