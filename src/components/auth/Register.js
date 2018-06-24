import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Button, Text } from 'native-base';

export default class Register extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
    }
    onPress = () => {
        console.log('Press button');
    }
    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Text> Raf app </Text>
                </Header>
                <View style={styles.content}>
                    <Button style={{ alignSelf: 'auto' }} primary onPress={this.onPress}>
                        <Text> Register  </Text>
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