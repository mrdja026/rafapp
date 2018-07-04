import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Button, Text, Input, Item } from 'native-base';
import { connect } from 'react-redux';
import BackgroundView from '../elements/view/BackgroundView';
import ImagePicker from 'react-native-image-picker';
import { getWidth } from '../../screenManager';
import { navigate } from '../router/NavigationService';
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

                            <Button primary onPress={()=>{ navigate('UserDetails')}}>
                                <Text> User details </Text>
                            </Button>

                        </Header>
                    </Content>
                </BackgroundView>
            </Container >
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