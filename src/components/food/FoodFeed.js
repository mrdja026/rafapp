import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Container, Header, Content } from 'native-base';
import BackgroundView from '../elements/view/BackgroundView';
import FeedFooter from '../elements/footer/FeedFooter';
import { navigate } from '../router/NavigationService';
import { connect } from 'react-redux';
import { getFoodData } from './actionCreator';
import ListItem from '../elements/list/ListItem';
class FoodFeed extends Component {
    static navigationOptions = {
        header: null,
    }
    onPress = () => {
        navigate('NewTopic', { category: 'Food' })
    }
    componentDidMount() {
        if (this.props.items.length <= 0) {
            this.props.getData();
        }
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
                        <Header transparent style={styles.header}>
                            <Text> Taaasty and we love it </Text>
                        </Header>
                        <View style={styles.listHolder}>
                            {!this.props.loading && <FlatList data={this.props.items}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.renderItem}
                                ItemSeparatorComponent={this.renderSeparator}
                            />}
                            {this.props.loading && <ActivityIndicator size={30} color={'blue'} />}
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
    listHolder: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    }
});
mapStateToProps = (state) => {
    let { food } = state.food;
    return {
        ...food
    }
}
mapDispatchToProps = (dispatch) => {
    return {
        getData: (data) => (dispatch(getFoodData(data))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodFeed);
