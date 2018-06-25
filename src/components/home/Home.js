import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Button, Text, Input, Item } from 'native-base';
import { navigate } from '../router/NavigationService';
import { connect } from 'react-redux';
import BackgroundView from '../elements/view/BackgroundView';
class Home extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
    }
    onPress = () => {
        //console.log('Press button');
        navigate('NotHome');
    }
    render() {
        return (
            <Container>
                <BackgroundView>
                    <Content contentContainerStyle={styles.content}>
                        <Header transparent style={styles.header}>
                            <Text> Home component?? </Text>
                        </Header>
                        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                            <Button style={{ alignSelf: 'auto' }} primary onPress={this.onPress}>
                                <Text> Home  </Text>
                            </Button>
                            <Text> {JSON.stringify(this.props.user)}  </Text>
                            <Item>
                                <Input value={'CLOASODAOSDOAS'} />
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