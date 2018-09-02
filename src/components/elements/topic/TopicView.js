import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Input, Button, Label, Footer, Item } from 'native-base';
import BackgroundView from '../view/BackgroundView';
import { myFetch } from '../../../api/utils';
import { GET_BY_ID_POST_SERVICE, CREATE_COMMENT_SERVICE, GET_ALL_COMMENT_SERVICE } from '../../../api/api';
import { connect } from 'react-redux';
import CommentBox from '../comment/CommentBox';
import QuickReply from '../comment/QuickReply';
import APPSTYLE from '../../../styles/style';
import { dateFormat } from '../../../const';
import TopicMediaChooser from './TopicMediaChooser';
import { navigate, goBack } from '../../router/NavigationService';
import CommentModal from '../modal/CommentModal';
import { showToast } from '../../toast/rafToast';
import { errorToast } from '../../toast/consts';
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

    sendComment = async (topicId, userId, comment) => {
        try {
            let commentResponse = await myFetch(CREATE_COMMENT_SERVICE,
                { method: 'POST' },
                {
                    topicId: topicId,
                    userId: userId,
                    content: comment,
                });
            if (commentResponse.ok) {
                this.setState({ newComment: null, commentsLoading: true });
                this.getCommentData();
            }
        } catch (error) {
            showToast(errorToast());
        }
    }

    dimissAction = () => {
    }

    sendCommentFromModal = async (comment) => {
        if (comment)
            await this.sendComment(this.topic_id, this.props.user._id, comment);
    }

    openCommentDialog = () => {
        let renderF = () => {
            return (
                <CommentModal navigation={this.props.navigation}
                    okAction={this.sendCommentFromModal}
                    dismissFunction={this.dimissAction}
                    replyTo={this.state.post.title} />
            )
        }
        this.props.navigation.navigate('Modal', {
            renderFunction: () => {
                return renderF();
            }
        });
    }


    render() {
        return (
            <Container>
                <BackgroundView>
                    <Content contentContainerStyle={styles.content}>
                        <Header style={{ alignItems: 'center', justifyContent: 'flex-start' }} transparent>
                            {!this.state.postLoading && <Text style={APPSTYLE.headingText}> {this.state.post.title} </Text>}
                        </Header>
                        <View style={{ flex: 10, }}>
                            <ScrollView>
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
                                            <Label style={APPSTYLE.normalText}> {this.state.post.textContent} </Label>
                                            <Label style={APPSTYLE.normalText}> {dateFormat(this.state.post.createdOn)} </Label>
                                        </View>
                                        <CommentBox commentExpand={null}
                                            loading={this.state.commentsLoading}
                                            comments={this.state.comments} />
                                    </View>
                                }
                            </ScrollView>
                        </View>
                        <Footer>
                            <TouchableOpacity style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }} onPress={this.openCommentDialog}>
                                <Text style={[APPSTYLE.bigText, { color: 'white' }]}> Tap to add comment</Text>
                            </TouchableOpacity>
                        </Footer>
                    </Content>
                </BackgroundView>
            </Container >
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
