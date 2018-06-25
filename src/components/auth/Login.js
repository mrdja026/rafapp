import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Container, Content, Button, Text, Form, Item, Input, Label, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { login, userAuthChanged } from './actionCreator';
import { navigate, goBack } from '../router/NavigationService';
import firebase from 'react-native-firebase';
import BackgroundView from '../elements/view/BackgroundView';
class Login extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            username: 'test@test.com',
            password: 'smederevo026'
        }
    }

    componentDidMount() {
        this.onAuthChanged = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.userAuthChanged(user);
            } else {
                let user = {
                    logedIn: false
                }
                this.props.userAuthChanged(user);
            }
        });
    }

    componentWillUnmount() {
        this.onAuthChanged();
    }

    componentWillMount() {
    }

    onUserNameChange = (text) => {
        this.setState({
            username: text
        })
    }

    onPasswordChanged = (text) => {
        this.setState({
            password: text,
        })
    }

    onPress = () => {
        this.props.login(this.state.username, this.state.password);
    }
    register = () => {
        navigate('Register');
    }
    resetPass = () => {
        console.log('Reset pass?');
    }
    render() {
        return (
            <Container>
                {!this.props.loading &&
                    <BackgroundView>
                        <Content contentContainerStyle={styles.loginForm}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Form style={styles.form}>
                                    <Item floatingLabel>
                                        <Label> Username </Label>
                                        <Input onChangeText={this.onUserNameChange} value={this.state.username} />
                                    </Item>
                                    <Item floatingLabel last>
                                        <Label> Password </Label>
                                        <Input onChangeText={this.onPasswordChanged} value={this.state.password} secureTextEntry={true} />
                                    </Item>
                                </Form>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Button style={{ alignSelf: 'auto' }} primary onPress={this.onPress}>
                                    <Text> Login  </Text>
                                </Button>
                                <View style={styles.infoSection}>
                                    <View style={styles.horizontalText}>
                                        <Text> Create account</Text><Text onPress={this.register} style={styles.linkTextColor}> here! </Text>
                                    </View>
                                    <View style={styles.horizontalText}>
                                        <Text>Forgot your password, request new </Text><Text onPress={this.resetPass} style={styles.linkTextColor}> here! </Text>
                                    </View>
                                </View>
                            </View>
                        </Content>
                    </BackgroundView>
                }
                {
                    this.props.loading && <BackgroundView style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'auto' }}>
                        <Spinner color='blue' />
                    </BackgroundView>
                }
            </Container >
        )
    }
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginForm: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    form: {
        paddingBottom: 10
    },

    infoSection: {
        padding: 10,
    },
    horizontalText: {
        flexDirection: 'row',
        paddingBottom: 20,
    },
    linkTextColor: {
        color: 'blue'
    }
})

mapStateToProps = (state) => {
    let { auth } = state.auth;
    return {
        ...auth,
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        login: (e, p) => (dispatch(login(e, p))),
        userAuthChanged: (data) => (dispatch(userAuthChanged(data))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


