import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Header } from 'native-base';
import BackgroundView from '../view/BackgroundView';
class TopicAdd extends Component {
    render() {
        return (
            <Container>
                <BackgroundView>
                    <Content contentContainerStyle={styles.content}>
                        <Header transparent style={styles.header}>
                            <Text> Add a new post </Text>
                        </Header>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Post form</Text>
                        </View>
                    </Content>
                </BackgroundView>
            </Container>
        );
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
});
export default TopicAdd;
