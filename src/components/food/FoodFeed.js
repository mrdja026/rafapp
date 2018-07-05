import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Content } from 'native-base';
import BackgroundView from '../elements/view/BackgroundView';
import FeedFooter from '../elements/footer/FeedFooter';
import { navigate } from '../router/NavigationService';
import { connect } from 'react-redux';
import { getFoodData } from './actionCreator';
import moment from 'moment';
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
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ height: 70, flex: 1 }}>
                <Text> {item.title} </Text>
                <Text> {item.textContent} </Text>
                <Text> {moment(new Date(item.createdOn)).format('LLL')} </Text>
            </TouchableOpacity>
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
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            {!this.props.loading && <FlatList data={this.props.items}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.renderItem}
                            />}
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
