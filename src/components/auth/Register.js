import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Button, Text, Label, Input, Form, Item } from 'native-base';
import { register } from './actionCreator';
import { connect } from 'react-redux';

class Register extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            username: 'mrdjan',
            email: 'test@test.com',
            password: 'smederevo026',

        }
    }
    onPress = () => {
        this.props.register(this.state.username, this.state.email, this.state.password);
    }

    onChangeEmail = (text) => {
        this.setState({
            email: text,
        })
    }
    onChangePassword = (text) => {
        this.setState({
            password: text,
        })
    }
    onUserNameChange = (text) => {
        this.setState({
            username: text,
        })
    }
    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Text> Create new account </Text>
                </Header>
                <Content contentContainerStyle={null}>
                    <Form style={styles.form}>
                        <Item floatingLabel>
                            <Label> Username </Label>
                            <Input onChangeText={this.onUserNameChange} value={this.state.username} />
                        </Item>
                        <Item floatingLabel>
                            <Label> Email </Label>
                            <Input onChangeText={this.onChangeEmail} value={this.state.email} />
                        </Item>
                        <Item floatingLabel last>
                            <Label> Password </Label>
                            <Input onChangeText={this.onChangePassword} value={this.state.password} secureTextEntry={true} />
                        </Item>
                    </Form>
                    <View style={styles.content}>
                        <Button style={{ alignSelf: 'auto' }} primary onPress={this.onPress}>
                            <Text> Register  </Text>
                        </Button>
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
    }
})

mapStateToProps = (state) => {
    return {

    }
}

mapDispatchToProps = (dispatch) => {
    return {
        register: (username, email, password) => (dispatch(register(username, email, password)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
