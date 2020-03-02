/**
 * Tela de Peril
 * @author Davi Souto
 * @since  20/01/2020
 */

import React, { PureComponent } from 'react';
import { View, Text, Image, Platform, AsyncStorage } from 'react-native';

import { Container, Body, Thumbnail, Content, Drawer, Button, Icon, Form, Item, Input, Label, Badge, ActionSheet, Toast } from 'native-base';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import HeaderApp from '@App/components/HeaderApp';
import Sidebar from '@App/components/Sidebar';

import Constants from "@App";
import Environment from "@App/Environment";

import Store from '@App/redux/Store';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setField, resetFields, doUpdateProfile } from '@Reducers/updateProfileReducer';
import { setUserField } from '@Reducers/authReducer';

import styles from './styles';

class ScreenEditProfile extends PureComponent {

  constructor(props){
    super(props);

    this.state = {
      drawer: false,
    }

    this.props.setField("name", Store.getState().auth.user.name);
    this.props.setField("last_name", Store.getState().auth.user.last_name);
    this.props.setField("photo", Store.getState().auth.user.photo || false);
  }

  selectPhoto(){
    if (this.props.loading)
      return;

    ActionSheet.show({
      options: [ "Remover foto", "Câmera", "Biblioteca", "Cancelar" ],
      cancelButtonIndex: 3,
      destructiveButtonIndex: 0,
      title: "Escolher foto"
    }, (buttonIndex) => {
      switch (parseInt(buttonIndex)) {
        case 2:
          return this.selectLibraryPhoto();
        break;
      }
    })
  }

  async selectLibraryPhoto(){
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1
        // aspect: [16, 9],
      });

      if (! result.cancelled)
        this.onImageReceive(result);
    } else {
      Toast.show({
        text: "Permissão de acesso a biblioteca requerida !",
        buttonText: "",
        type: "danger",
      })
    }
  }

  onImageReceive(image_result) {
    console.log(image_result);

    if (image_result.uri)
    {
      const image_name = image_result.uri.split("/").pop();
      const ext = image_name.split(".").pop().toLowerCase();

      var type = image_result.type;

      if (ext == "jpg" || ext == "jpeg" && type.indexOf("/") < 0) type += "/jpeg";
      if (ext == "png" && type.indexOf("/") < 0) type += "/png";
      if (ext == "gif" && type.indexOf("/") < 0) type += "/gif";

      this.props.setField("photo", {
        "name": image_name, //"profile_picture",
        "type": type,
        "uri": Platform.OS === "android" ? image_result.uri : image_result.uri.replace("file://", "")
      })
    }
    // console.log("IMAGE", image_result);
    // Image.getSize(image_result.uri, (width, height) => {
    //   let imageSettings = {
    //     offset: { x: 0, y: 0 },
    //     size: { width: image_result.width, height: image_result.height }
    //   };
    //   ImageEditor.cropImage(image_result.uri, imageSettings, (uri) => {
    //     // @TODO ALTERAR PARA METODO NOVO:
    //     // FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64, }).then((data) => {
    //     //   this.props.setFieldPhoto({
    //     //     "extension": image_result.uri.split('.').pop(),
    //     //     "base64": data
    //     //   });
    //     //
    //     //   this.setState({ showMessage: true });
    //     // });
    //
    //     // @Deprecated
    //     ImageStore.getBase64ForTag(uri, (data) => {
    //       this.props.setFieldPhoto({
    //         "extension": image_result.uri.split('.').pop(),
    //         "base64": data
    //       });
    //
    //       this.setState({ showMessage: true });
    //     }, e => console.warn("getBase64ForTag: ", e))
    //   }, e => console.warn("cropImage: ", e))
    // });
    //
    // if (image_result.uri)
    // {
    //   this.setState({ hasPhoto: image_result.uri });
    //
    //   // Alert.alert("Foto anexada com sucesso !");
    // }
  }

  ////////////////////////////////////////////

  /**
   * Save new user profile
   * @author Davi Souto
   * @since 02/03/2020
   */
  saveProfile(){
    if (this.props.loading)
      return;

    this.props.doUpdateProfile({
      name: this.props.name,
      last_name: this.props.last_name,
      photo: this.props.photo,
    }).then((result) => {
      const data = result.payload.data.updateMyProfile;

      this.props.setUserField("name", data.name);
      this.props.setUserField("last_name", data.last_name);

      if (data.photo)
        this.props.setUserField("photo", data.photo || false);

      // Update AsyncStorage
      window.setTimeout(() => {
        AsyncStorage.setItem("@social-network:auth:user", JSON.stringify(Store.getState().auth.user));
      }, 10);

      this.props.navigation.goBack();

      Toast.show({
        text: "Perfil atualizado com sucesso !",
        buttonText: "",
        type: "success",
      })
    }).catch((err) => {
      console.log(err);

      Toast.show({
        text: "Ocorreu um erro ao atualizar o perfil",
        buttonText: "",
        type: "danger",
      })
    })
  }

  ////////////////////////////////////////////

  render() {
    return (
      <Drawer
        ref={(ref) => { if (! this.state.drawer) this.setState({ drawer: ref }) }}
        content={ <Sidebar navigation={ this.props.navigation } drawer={ this.state.drawer } /> }
        openDrawerOffset={ 0.25 }
        side={ Platform.select({ android: "left", ios: "right" }) }
      >
        <Container>
          <HeaderApp
            title="Alterar Perfil"
            drawer={ this.state.drawer }
            showBack={ true }
            showSave={ true }
            btnSaveFunction={ this.saveProfile.bind(this) }
            loading={ this.props.loading }
            navigation={ this.props.navigation } />
          <Body>
            <View>
              <View style={ styles.photoHeader }>
                <View style={ styles.thumbnailView }>
                  { this.renderThumbnailPhoto() }
                  <Button style={ styles.photoButton } onPress={ this.selectPhoto.bind(this) }>
                    <Icon name="camera" />
                  </Button>
                </View>
              </View>
            </View>

            <Content style={ styles.formContent }>
              <Form style={ styles.formView }>
                <Item stackedLabel last>
                  <Label style={ styles.labelStyle }>Nome</Label>
                  <Input
                    autoCapitalize="words"
                    autoCompleteType="name"
                    autoCorrect={ false }
                    keyboardType="default"
                    maxLength={ 60 }
                    returnKeyType="next"
                    selectionColor={ Constants.PRIMARY_COLOR }
                    spellCheck={ false }
                    textContentType="name"
                    value={ this.props.name }
                    onChangeText={ value => this.props.setField("name", value) }
                  />
                </Item>

                <Item stackedLabel last>
                  <Label style={ styles.labelStyle }>Sobrenome</Label>
                  <Input
                    autoCapitalize="words"
                    autoCompleteType="name"
                    autoCorrect={ false }
                    keyboardType="default"
                    maxLength={ 60 }
                    returnKeyType="next"
                    selectionColor={ Constants.PRIMARY_COLOR }
                    spellCheck={ false }
                    textContentType="familyName"
                    value={ this.props.last_name }
                    onChangeText={ value => this.props.setField("last_name", value) }
                  />
                </Item>
              </Form>
            </Content>
          </Body>
        </Container>
      </Drawer>
    );
  }

  renderThumbnailPhoto() {
    if (typeof this.props.photo == "object" && this.props.photo != null)
      return (<Thumbnail large source={{uri: this.props.photo.uri }} style={ styles.thumbnailProfile } />);

    if (this.props.photo && typeof this.props.photo == "string")
      return (<Thumbnail large source={{uri: Environment.storageProfilePhoto + this.props.photo }} style={ styles.thumbnailProfile } />);

    return (
      <Thumbnail large source={ require("@App/assets/icons/empty_photo.jpg") } style={ styles.thumbnailProfile } />
    )
  }
}

///////////////////////////////////////////////////////////////////////////

const mapStateToProps = store => ({
  name: store.updateProfile.fields.name,
  last_name: store.updateProfile.fields.last_name,
  photo: store.updateProfile.fields.photo,

  loading: store.updateProfile.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setField, resetFields, doUpdateProfile, setUserField }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScreenEditProfile);
