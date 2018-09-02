import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Header, Form, Item, Label, Input, Textarea, Button } from 'native-base';
import BackgroundView from '../view/BackgroundView';
import { choseMedia } from '../../upload/mediaChooser';
import { getWidth } from '../../../screenManager';
import { myFetch } from '../../../api/utils';
import { CREATE_POST_SERVICE } from '../../../api/api';
import { connect } from 'react-redux';
import { navigate } from '../../router/NavigationService';
import TopicMediaChooser from './TopicMediaChooser';
class TopicAdd extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            textContent: '',
            mediaContent: { uri: null },

        }
        this.category = this.props.navigation.getParam('category');
        if (this.category == null) {
            console.error('CAtegory not suplied');
        }
    }
    onTitleChange = (text) => {
        this.setState({ title: text });
    }
    onTextContentChange = (text) => {
        this.setState({ textContent: text });
    }
    savePost = async () => {
        if (this.state.title.length == 0) {
            console.error('MUst titlt lol');
        }
        let reqData = {
            category: this.category,
            textContent: this.state.textContent,
            title: this.state.title,
            userId: this.props.user._id,
            mediaContent: this.state.mediaContent.uri != null ? this.state.mediaContent : null,
        }
        try {
            let response = await myFetch(CREATE_POST_SERVICE, { method: 'POST' }, reqData);
            if (response.ok) {
                let { _id } = response.post;
                navigate('TopicView', { topic_id: _id });
            } else {
                console.log('ERRORR', response)
            }
        } catch (error) {
            console.error(error);
        }
    }

    mediaChooseOk = (data) => {
        this.setState({
            mediaContent: data,
        });
    }

    mediaChooseFail = (data) => {
        console.log('Fail stuff', data);
    }

    render() {
        return (
            <Container>
                <BackgroundView>
                    <Content contentContainerStyle={styles.content}>
                        <Header transparent style={styles.header}>
                            <Text> Add a new post to {this.category} </Text>
                        </Header>
                        <Form>
                            <Item floatingLabel>
                                <Label> Title </Label>
                                <Input value={this.state.title} onChangeText={this.onTitleChange} />
                            </Item>
                            <Item floatingLabel>
                                <Label> Content (optional) </Label>
                                <Input value={this.state.textContent} onChangeText={this.onTextContentChange} />
                            </Item>
                            <TopicMediaChooser
                                newPost={true}
                                canDelete={false}
                                failCallback={this.mediaChooseFail}
                                successCallback={this.mediaChooseOk} />
                        </Form>
                        <Button primary onPress={this.savePost}>
                            <Text> Save </Text>
                        </Button>
                    </Content>
                </BackgroundView>
            </Container >
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
        justifyContent: 'flex-start'
    },
    mediaHolder: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'white'
    },
    mediaButtonHolder: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        height: 75,
        width: '100%'
    },
    mediaButtonText: {
        fontSize: 25,
        textAlign: 'center',
        textAlignVertical: 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(TopicAdd);