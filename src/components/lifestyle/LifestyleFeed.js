import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Header } from 'native-base';
import BackgroundView from '../elements/view/BackgroundView';
import FeedFooter from '../elements/footer/FeedFooter';
import { navigate } from '../router/NavigationService';

class LifeStyleFeed extends Component {
    static navigationOptions = {
        header: null,
    }
    onPress = () => {
        navigate('Lifestyle', { category: 'Lifestyle' })
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
                        <FeedFooter category={'Lifestyle'} onPress={this.onPress} />
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
