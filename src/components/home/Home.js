import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Button, Text, Input, Item } from 'native-base';
import { navigate } from '../router/NavigationService';
import { connect } from 'react-redux';
import BackgroundView from '../elements/view/BackgroundView';
import { ADD_MESSAGE } from '../../api/api';
import authManager from '../../auth/auth';
class Home extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }
    onPress = () => {
    }
    onChangeMessage = (text) => {
        this.setState({ message: text });
    }
    render() {
        return (
            <Container>
                <BackgroundView>
                    <Content contentContainerStyle={styles.content}>
                        <Header transparent style={styles.header}>
                            <Text> Welcome {this.props.user.username} </Text>
                        </Header>
                        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                            <Button style={{ alignSelf: 'auto' }} primary onPress={this.onPress}>
                                <Text> Send  </Text>
                            </Button>
                            {/* <Text> {JSON.stringify(this.props.user)}  </Text> */}
                            <Item>
                                <Input onChangeText={this.onChangeMessage} value={this.state.message} />
                            </Item>
                        </View>

                    </Content>
                </BackgroundView>
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
    }
});

mapStateToProps = (state) => {
    let { auth } = state.auth;
    return {
        ...auth
    }
}

mapDispatchToProps = () => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);