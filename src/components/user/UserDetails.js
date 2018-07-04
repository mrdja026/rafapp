import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Container, Header, Content, Form, Item, Label, Input, Button } from 'native-base';
import BackgroundView from '../elements/view/BackgroundView';
import { getWidth } from '../../screenManager';
import { connect } from 'react-redux';
import { myFetch } from '../../api/utils';
import ImagePicker from 'react-native-image-picker';
import { UPDATE_USER_SERVICE, CHANGE_PROFILE_PICTURE } from '../../api/api';
import { navigate } from '../router/NavigationService';
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
                uri: this.props.user.avatarUri
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

    imagePicker = async () => {
        let options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                this.setState({ avatarLoading: true });
                let data = {
                    type: response.type,
                    b64: response.data,
                    userId: this.props.user._id,
                }
                myFetch(CHANGE_PROFILE_PICTURE, { method: 'POST' }, { data: data })
                    .then(result => {
                        console.log('Image result ', result);
                        this.setState({
                            avatarLoading: false,
                            avatarSource: {
                                uri: result.user.avatarUri,
                            }
                        })
                    }).catch(error => {
                        console.log(error);
                        this.setState({
                            avatarLoading: true
                        });
                    });
            }
        });
    }

    update = async () => {
        if (this.state.newPassword.length > 0 && this.state.newPassword != this.state.confirmNewPassword) {
            this.setState({ confirmPassError: true });
            return;
        }
        let reqObject = {
            id: this.props.user._id,
            email: this.state.email,
            password: this.state.newPassword,
            bio: this.state.bio,
            firstLogin: 0,
        }
        try {
            let response = await myFetch(UPDATE_USER_SERVICE, { method: 'POST' }, {
                userData: { ...reqObject }
            });
            if (response.ok) {
                navigate('Home');
            }
        } catch (error) {
            console.error('Update use fail')
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
                                    {this.state.avatarLoading && <View style={{ position: 'absolute', flexDirection: 'column', top: 0, left: 0, justifyContent: 'center', alignItems: 'center' }}>
                                        <ActivityIndicator style={{ alignSelf: 'auto' }} size={30} color={'white'} />
                                    </View>}
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
                                        <Input onChangeText={this.setNewEmail} value={this.state.email} />
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