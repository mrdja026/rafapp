import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Form, Item, Label, Input, Button } from 'native-base';
import BackgroundView from '../elements/view/BackgroundView';
import { getWidth } from '../../screenManager';
import { connect } from 'react-redux';
import { myFetch } from '../../api/utils';
import ImagePicker from 'react-native-image-picker';
import { UPDATE_USER_SERVICE } from '../../api/api';

const CONFIRM_PASS_TEXT = 'Confirm new password';
const CONFIRM_PASS_TEXT_MISSMATCH = 'Your passwords do not match';

class UserDetails extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            bio: this.props.user.bio,
            newPassword: '',
            confirmNewPassword: '',
            email: this.props.user.email,
            confirmPassError: false,
            avatarSource: {
                uri: ''
            }
        }
    }

    onChangeBio = (text) => {
        this.setState({ bio: text });
    }

    setNewEmail = (text) => {
        this.setState({ email: text });
    }


    setNewPassword = (text) => {
        this.setState({ newPassword: text });
    }

    setConfirmPassword = (text) => {
        this.setState({ confirmNewPassword: text })
    }

    imagePicker = () => {
        let options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
                console.log('Image picked', response);
            }
        });
    }

    update = async () => {
        // console.log('Updateeee', this.props.user, this.state.bio);
        // myFetch('http://10.0.2.2:3000/updateUser', { method: 'POST' }, { id: '5b3a1e49b63aee3f0c32c567', prop: 'bio', value: this.state.bio }).then((result) => {
        //     console.log('Result', result);
        // }).catch(err => {
        //     console.log('Errr', err);
        // });
        if (this.state.newPassword.length > 0 && this.state.newPassword != this.state.confirmNewPassword) {
            this.setState({ confirmPassError: true });
            return;
        }
        try {
            let reqObject = {
                id: this.props.user.id,
                email: this.state.email,
                password: this.state.newPassword,
                bio: this.state.bio,
                avatarUrl: this.state.avatarSource.uri
            }
            try {
                let response = await myFetch(UPDATE_USER_SERVICE, { method: 'POST' }, {
                    userData: { ...reqObject }
                });
                console.log('New user data?', response);
            } catch (error) {
            }
        } catch (error) {

        }

    }

    render() {
        return (
            <Container>
                <BackgroundView>
                    <Header transparent>
                        <Text> User details </Text>
                    </Header>
                    <Content contentContainerStyle={style.content}>
                        <ScrollView>
                            <View style={style.pictureHolder}>
                                <View>
                                    <TouchableOpacity onPress={this.imagePicker}>
                                        <Image
                                            source={this.state.avatarSource.uri != '' ? this.state.avatarSource : require('../../../assets/img/default_profile.png')}
                                            style={style.profilePicture} />
                                        <View style={style.chooseText}>
                                            <Text>Choose profile picture</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Form>
                                    <Item floatingLabel>
                                        <Label> Username </Label>
                                        <Input disabled={true} value={this.props.user.username} />
                                    </Item>
                                    <Item floatingLabel>
                                        <Label> Email </Label>
                                        <Input value={this.state.email} />
                                    </Item>
                                    <Item floatingLabel style={{ height: 80 }}>
                                        <Label> Bio </Label>
                                        <Input value={this.state.bio} onChangeText={this.onChangeBio} />
                                    </Item>
                                    <Item floatingLabel>
                                        <Label> New Password </Label>
                                        <Input secureTextEntry onChangeText={this.setNewPassword} value={this.state.newPassword} />
                                    </Item>
                                    <Item floatingLabel>
                                        <Label> {this.state.confirmPassError ? CONFIRM_PASS_TEXT_MISSMATCH : CONFIRM_PASS_TEXT} </Label>
                                        <Input secureTextEntry onChangeText={this.setConfirmPassword} value={this.state.confirmNewPassword} />
                                    </Item>
                                </Form>
                            </View>
                            <View style={style.buttonHolder}>
                                <Button primary style={{ alignSelf: 'auto' }} onPress={this.update}>
                                    <Text style={{ fontSize: 20 }}> Save </Text>
                                </Button>
                            </View>
                        </ScrollView>
                    </Content>
                </BackgroundView>
            </Container>
        )
    }
}

const style = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    pictureHolder: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    profilePicture: {
        height: 200,
        width: getWidth()
    },
    chooseText: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    }

});

mapStateToProps = (state) => {
    let { auth } = state.auth;
    return {
        ...auth,
    }
}

mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);