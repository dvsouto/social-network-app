/**
 * Tela principal
 * @author Davi Souto
 * @since  09/05/2019
 */

import React, { PureComponent } from 'react';
import { Text, View, Image } from 'react-native';

import styles from './styles';

class Sidebar extends PureComponent {

  constructor(props){
    super(props);
  }

  ////////////////////////////////////////////

  render() {
    return (
      <View>
        <Text>Sidebar</Text>
      </View>
    );
  }
}

///////////////////////////////////////////////////////////////////////////

export default Sidebar;

// const mapStateToProps = store => ({
// });
//
// const mapDispatchToProps = dispatch =>
//   bindActionCreators({  }, dispatch);
//
// export default connect(mapStateToProps, mapDispatchToProps)(ScreenAbout);
