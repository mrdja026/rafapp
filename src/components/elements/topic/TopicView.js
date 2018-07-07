import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, Image } from 'react-native';
import { Container, Content, Header, Input, Button } from 'native-base';
import BackgroundView from '../view/BackgroundView';
import { myFetch } from '../../../api/utils';
import { GET_BY_ID_POST_SERVICE, CREATE_COMMENT_SERVICE } from '../../../api/api';
import { connect } from 'react-redux';
class TopicView extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.topic_id = this.props.navigation.getParam('topic_id');
        if (!this.topic_id) {
            console.error('Topic id must be defined');
        }
        this.state = {
            loading: true,
            newComment: '',
        }
    }

    componentDidMount = async () => {
        try {
            let response = await myFetch(GET_BY_ID_POST_SERVICE, { method: 'POST' }, {
                id: this.topic_id
            });
            if (response.ok) {
                console.log('TOpic response', response.post)
                this.setState({
                    post: response.post,
                    loading: false
                });
            }
        } catch (error) {
            console.error('Error while getting post data');
        }
    }

    setNewComment = (text) => {
        this.setState({
            newComment: text
        });
    }

    sendComment = async () => {
        try {
            let commentResponse = await myFetch(CREATE_COMMENT_SERVICE,
                { method: 'POST' },
                {
                    topicId: this.topic_id,
                    userId: this.props.user._id,
                    content: this.state.newComment,
                });
            console.log('REsponse comment', commentResponse);
        } catch (error) {
            console.log('Comment error', error);
        }
    }


    render() {
        return (
            <Container>
                <BackgroundView>
                    <Header transparent>
                        {!this.state.loading && <Text> {this.state.post.title} </Text>}
                    </Header>
                    <Content contentContainerStyle={styles.content}>
                        {this.state.loading && <ActivityIndicator size={30} color={'blue'} />}
                        {!this.state.loading &&
                            <ScrollView contentContainerStyle={{
                                flex: 1,
                                flexDirection: 'column',
                                paddingLeft: 5,
                                paddingRight: 5,
                            }}>
                                {this.state.post.mediaContent && <View>
                                    <Image resizeMode={'contain'}
                                        style={{ height: 200, width: '100%' }}
                                        source={{ uri: this.state.post.mediaContent }}
                                    />
                                </View>}
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text> {this.state.post.textContent} </Text>
                                    <Text> {this.state.post.createdOn} </Text>
                                </View>
                                <View style={{ borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Input value={this.state.newComment} onChangeText={this.setNewComment} />
                                    <Button onPress={this.sendComment}>
                                        <Text> Post </Text>
                                    </Button>
                                </View>
                                <View style={{ borderWidth: 1 }}>
                                    <Text> COmments </Text>
                                    {this.state.post.comments && this.state.post.comments.map(item => {
                                        return (
                                            <Text> {item.content} </Text>
                                        )
                                    })}
                                </View>
                            </ScrollView>
                        }
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
    }
});
mapStateToProps = (state) => {
    let { auth } = state.auth;
    return {
        ...auth,
    }
}

mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopicView);
// export default TopicView;
