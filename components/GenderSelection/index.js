/**
 * Seleção de Gênero na listagem
 * @author Davi Souto
 * @since 21/01/2020
 */
import React, { Component } from 'react';

import { Form, Picker, Icon } from 'native-base';

import Constants from '@App/Constants';

import styles from './styles';

class GenderSelection extends Component {

  constructor(props){
    super(props);

    this.state = {
      selected: "all"
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Form>
        <Picker
          mode="dropdown"
          iosHeader="Gênero"
          iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: Constants.PRIMARY_COLOR, fontSize: 25 }} />}
          style={{ width: undefined }}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
        >
          <Picker.Item label="Todos" value="all" />
          <Picker.Item label="Homens" value="male" />
          <Picker.Item label="Mulheres" value="female" />
        </Picker>
      </Form>
    )
  }
}

export default GenderSelection;
