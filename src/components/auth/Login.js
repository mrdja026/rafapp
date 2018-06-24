import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Button, Text, Form, Item, Input, Label } from 'native-base';
import { connect } from 'react-redux';
import { login } from './actionCreator';
import { navigate } from '../router/NavigationService';
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

    componentWillMount() {
        if (this.props.userLogedIn) {
            this.props.navigation.navigate('App');
        } else {
        }
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
                <Header style={styles.header}>
                    <Text> Login </Text>
                </Header>
                <Content contentContainerStyle={null}>
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
                    <View style={styles.content}>
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
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        paddingBottom: 10
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


