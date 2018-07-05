import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Header, Footer, FooterTab, Button } from 'native-base';
import BackgroundView from '../elements/view/BackgroundView';
import FeedFooter from '../elements/footer/FeedFooter';
import { navigate } from '../router/NavigationService';

class TechnologyFeed extends Component {
    static navigationOptions = {
        header: null,
    }
    onPress = () => {
        navigate('Tech', { category: 'Tech' });
    }
    render() {
        return (
            <Container>
                <BackgroundView>
                    <Content contentContainerStyle={styles.content}>
                        <Header transparent style={styles.header}>
                            <Text> Hello world! </Text>
                        </Header>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Tech</Text>
                        </View>
                        <FeedFooter category={'Tech'} onPress={this.onPress} />
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

//make this component available to the app
export default TechnologyFeed;
