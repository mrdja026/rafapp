import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Header } from 'native-base';
import BackgroundView from '../elements/view/BackgroundView';
import FeedFooter from '../elements/footer/FeedFooter';

class LifeStyleFeed extends Component {
    static navigationOptions = {
        header: null,
    }
    render() {
        return (
            <Container>
                <BackgroundView>
                    <Content contentContainerStyle={styles.content}>
                        <Header transparent style={styles.header}>
                            <Text> Easy living </Text>
                        </Header>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Lifestyle feed</Text>
                        </View>
                        <FeedFooter />
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

export default LifeStyleFeed;
