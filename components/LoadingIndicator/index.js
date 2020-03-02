/**
 * Componente de Loading
 * @author Davi Souto
 * @since  20/12/2018
 */

import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

import Constants from '@App/Constants';

import styles from './styles';

export default class LoadingIndicator extends Component {
  static defaultProps = {
    style: {},
    color: Constants.PRIMARY_COLOR
  }

  render() {
    return (
      <View style={ [ styles.viewContainer, this.props.style ] }>
        <ActivityIndicator size="large" color={ this.props.color } />
      </View>
    );
  }
}
