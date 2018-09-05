import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import BackgroundView from '../elements/view/BackgroundView';
import { navigate } from '../router/NavigationService';
import FirebaseManager from '../../firebase';
import { myFetch } from '../../api/utils';
import { DEVICE_REGISTER_TOKEN } from '../../api/api';
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
    async componentDidMount() {
        await FirebaseManager.init();
        try {
            let token = await FirebaseManager.getToken();
            FirebaseManager.setUserToken(token);
            let tokenResult = await myFetch(DEVICE_REGISTER_TOKEN, { method: 'POST' }, { token: token });
        } catch (error) {
            console.error('Silent error', error);
        }
        //await FirebaseManager.getInitialNotification();
    }
    componentWillUnmount() {
        FirebaseManager.destroy();
    }
    render() {
        return (
            <Container>
                <BackgroundView>
                    <Content contentContainerStyle={styles.content}>
                        <Header transparent style={styles.header}>
                            <Text> Welcome {this.props.user.username} </Text>
                        </Header>
                        {/* <Button primary onPress={()=>{ navigate('UserDetails')}}>
                                <Text> User details </Text>
                            </Button> */}
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => { navigate('Food') }}>
                                <ImageBackground style={{ flex: 1 }} resizeMode={'contain'} source={require('../../../assets/img/food_cat.png')}>
                                    <View style={styles.category}>
                                        <Text style={styles.textHeadline}> Food </Text>
                                        <Text style={styles.textSubHedline}> 0 items </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => { navigate('Lifestyle') }}>
                                <ImageBackground style={{ flex: 1 }} resizeMode={'cover'} source={require('../../../assets/img/lifestyle_cat.png')}>
                                    <View style={[styles.category, { borderTopWidth: 0, borderBottomWidth: 0 }]}>
                                        <Text style={styles.textHeadline}> Lifestyle </Text>
                                        <Text style={styles.textSubHedline}> 0 items </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => { navigate('Tech') }}>
                                <ImageBackground style={{ flex: 1 }} resizeMode={'cover'} source={require('../../../assets/img/gaben_cat.png')}>
                                    <View style={styles.category}>
                                        <Text style={styles.textHeadline}> Technology </Text>
                                        <Text style={styles.textSubHedline}> 0 items </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
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
    },
    category: {
        paddingTop: 5,
        paddingBottom: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'white'
    },
    textHeadline: {
        fontSize: 50,
        color: 'white',
    },
    textSubHedline: {
        fontSize: 30,
        color: 'white',
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