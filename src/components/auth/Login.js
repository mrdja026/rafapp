import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Container, Content, Button, Text, Form, Item, Input, Label, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { login, userAuthChanged } from './actionCreator';
import { navigate, goBack } from '../router/NavigationService';
import BackgroundView from '../elements/view/BackgroundView';
class Login extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            username: 'mrdjan1',
            password: 'smederevo026'
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
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

    checkAuth = () => {
        fetch('http://10.0.2.2:3000/testAuth', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'same-origin'
        }).then((result) => {
            console.log('skk', result);
            result.json().then((json) => {
                console.log('JSONSS', json);
            })
        }).catch(error => {
            console.log('Test auth err', error);
        })
    }

    onPress = () => {
        fetch('http://10.0.2.2:3000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then((ok) => {
            console.log('result', ok);
        }).catch(error => {
            console.log('Login error', error);
        })
    }
    logout = () => {
        fetch('http://10.0.2.2:3000/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
        }).then((ok) => {
            console.log('result', ok);
        }).catch(error => {
            console.log('Logout error', error);
        })
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
                                <Button style={{ alignSelf: 'auto' }} primary onPress={this.checkAuth}>
                                    <Text> Check  </Text>
                                </Button>
                                <Button style={{ alignSelf: 'auto' }} primary onPress={this.logout}>
                                    <Text> Logout  </Text>
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


