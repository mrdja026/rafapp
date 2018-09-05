import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import TopicAdd from '../topic/TopicAdd';
import { Container, Content } from 'native-base';
import { myFetch } from '../../../api/utils';
import BackgroundView from '../view/BackgroundView';
import DefaultFeedHeader from '../header/Header';
import FeedFooter from '../footer/FeedFooter';
import { navigate } from '../../router/NavigationService';
import ListItem from '../list/ListItem';
class AppFeed extends Component {
    static navigationOptions = {
        header: null,
    }
    onPress = () => {
        let renderF = () => {
            return (
                <TopicAdd
                    navigation={this.props.navigation}
                    category={this.props.category} />
            )
        }
        navigate('Modal', {
            renderFunction: () => {
                return renderF();
            }
        });
    }
    keyExtractor = (item, /*index*/) => {
        return item._id;
    }

    listItemOnPress = (id) => {
        navigate('TopicView', { topic_id: id });

    }

    renderItem = ({ item }) => {
        return (
            <ListItem
                id={item._id}
                title={item.title}
                data={item}
                onPress={this.listItemOnPress}
            />
        )
    }

    renderSeparator = () => {
        return (
            <View style={{ flex: 1, height: 2, backgroundColor: "#324291" }}>
            </View>
        )
    }

    

    render() {
        return (
            <Container>
                <BackgroundView>
                    <Content contentContainerStyle={styles.content}>
                        <DefaultFeedHeader
                            subbed={this.props.subbed}
                            toggleSubscription={this.props.toggleSubscription}
                            title={this.props.title} />
                        <View style={styles.listHolder}>
                            {!this.props.loading && <FlatList data={this.props.items}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.renderItem}
                                ItemSeparatorComponent={this.renderSeparator}
                            />}
                            {this.props.loading && <ActivityIndicator size={30} color={'blue'} />}
                        </View>
                        <FeedFooter category={this.props.category} onPress={this.onPress} />
                    </Content>
                </BackgroundView>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    listHolder: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    }
});
export default AppFeed;
