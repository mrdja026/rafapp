import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Button, Text } from 'native-base';
import { navigate } from '../router/NavigationService';

export default class Home extends Component {
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
                <Header style={styles.header}>
                    <Text> Home component?? </Text>
                </Header>
                <View style={styles.content}>
                    <Button style={{ alignSelf: 'auto' }} primary onPress={this.onPress}>
                        <Text> Home  </Text>
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