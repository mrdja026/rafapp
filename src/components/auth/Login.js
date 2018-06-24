import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { login } from './actionCreator';
class Login extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.userLogedIn) {
            this.props.navigation.navigate('App');
        } else {

        }
    }

    onPress = () => {
        // console.log('this', this.props.navigation.navigate('App'));
        this.props.login();
    }
    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Text> Raf app </Text>
                </Header>
                <View style={styles.content}>
                    <Button style={{ alignSelf: 'auto' }} primary onPress={this.onPress}>
                        <Text> Login  </Text>
                    </Button>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        login: () => (dispatch(login())),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


