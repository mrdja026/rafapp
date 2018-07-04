import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content } from 'native-base';
import BackgroundView from '../elements/view/BackgroundView';
import FeedFooter from '../elements/footer/FeedFooter';
class FoodFeed extends Component {
    static navigationOptions = {
        header: null,
    }
    render() {
        return (
            <Container>
                <BackgroundView>
                    <Content contentContainerStyle={styles.content}>
                        <Header transparent style={styles.header}>
                            <Text> Taaasty and we love it </Text>
                        </Header>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>FoodFeed</Text>
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
export default FoodFeed;
