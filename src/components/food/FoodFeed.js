import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content } from 'native-base';
import BackgroundView from '../elements/view/BackgroundView';
import FeedFooter from '../elements/footer/FeedFooter';
import { navigate } from '../router/NavigationService';
import { myFetch } from '../../api/utils';
import { GET_POST_SERVICE } from '../../api/api';
class FoodFeed extends Component {
    static navigationOptions = {
        header: null,
    }
    onPress = () => {
        navigate('NewTopic', { category: 'Food' })
    }
    componentDidMount() {
        myFetch(GET_POST_SERVICE, { method: 'POST' }, { category: 'Food', skip: 0, take: 1 }).then((result) => {
            console.log('Results', result);
        }).catch(error => {
            console.log('Errrrrrrrrrr', error);
        })
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
                        <FeedFooter category={'Food'} onPress={this.onPress} />
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
