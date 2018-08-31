import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, Image } from 'react-native';
import { Container, Content, Header, Input, Button, Label } from 'native-base';
import BackgroundView from '../view/BackgroundView';
import { myFetch } from '../../../api/utils';
import { GET_BY_ID_POST_SERVICE, CREATE_COMMENT_SERVICE, GET_ALL_COMMENT_SERVICE } from '../../../api/api';
import { connect } from 'react-redux';
import CommentBox from '../comment/CommentBox';
import QuickReply from '../comment/QuickReply';
import APPSTYLE from '../../../styles/style';
import { dateFormat } from '../../../const';
import TopicMediaChooser from './TopicMediaChooser';
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
            postLoading: true,
            commentsLoading: true,
            newComment: '',
        }
    }

    getPostData = async () => {
        try {
            let response = await myFetch(GET_BY_ID_POST_SERVICE, { method: 'POST' }, {
                id: this.topic_id
            });
            if (response.ok) {
                this.setState({
                    post: response.post,
                    postLoading: false
                });
            }
        } catch (error) {
            console.error('Error while getting post data');
        }
    }

    getCommentData = async () => {
        try {
            let response = await myFetch(GET_ALL_COMMENT_SERVICE, { method: 'POST' }, { topicId: this.topic_id });
            if (response.ok) {
                this.setState({
                    comments: response.comments,
                    commentsLoading: false,
                });
            }
        } catch (error) {
            console.error('Error while getting comment data');
        }
    }

    componentDidMount = async () => {
        await this.getPostData();
        this.getCommentData();
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
            if (commentResponse.ok) {
                this.setState({ newComment: null, commentsLoading: true });
                this.getCommentData();
            }
        } catch (error) {
            console.log('Comment error', error);
        }
    }


    render() {
        return (
            <Container>
                <BackgroundView>
                    <Header transparent style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {!this.state.postLoading && <Text style={APPSTYLE.headingText}> {this.state.post.title} </Text>}
                    </Header>
                    <Content contentContainerStyle={styles.content}>
                        {this.state.postLoading && <ActivityIndicator size={30} color={'blue'} />}
                        {!this.state.postLoading &&
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                paddingLeft: 5,
                                paddingRight: 5,
                            }}>
                                {this.state.post.mediaContent && <View>
                                    <TopicMediaChooser
                                        successCallback={() => { }}
                                        failCallback={() => { }}
                                        loadedContent={this.state.post.mediaContent}
                                        canDelete={this.props.user._id == this.state.post.userId._id} />
                                </View>}
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Label> {this.state.post.textContent} </Label>
                                    <Label> {dateFormat(this.state.post.createdOn)} </Label>
                                </View>
                                <QuickReply sendComment={this.sendComment} newComment={this.state.newComment} setNewComment={this.setNewComment} />
                                <CommentBox commentExpand={null}
                                    loading={this.state.commentsLoading}
                                    comments={this.state.comments} />
                            </View>
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
    },
});
mapStateToProps = (state) => {
    let { auth } = state.auth;
    console.log('Topic view auth bla', auth);
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
