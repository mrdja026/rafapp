import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Header, Form, Item, Label, Input, Textarea, Button } from 'native-base';
import BackgroundView from '../view/BackgroundView';
import ImagePicker from 'react-native-image-picker';
import { choseMedia } from '../../../../server/utls/mediaChooser';
import { getWidth } from '../../../screenManager';
import { myFetch } from '../../../api/utils';
import { CREATE_POST_SERVICE } from '../../../api/api';
import { connect } from 'react-redux';
class TopicAdd extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            title: 'Test title',
            textContent: 'Test content',
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
    mediaUpload = async () => {
        console.log('Media upload presss');
        let options = {
            title: 'Select picture',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        try {
            let response = await choseMedia(options);
            if (response.ok && response.userCanceled) {
                this.setState({
                    mediaContent: {
                        uri: null,
                    }
                });
            }
            if (response.ok && !response.userCanceled) {
                console.log('responsedata', response.responseData)
                this.setState({
                    mediaContent: {
                        uri: response.responseData.uri,
                    }
                });
            }
        } catch (error) {
            console.log('error media', error);
        }
    }

    getButtonStyle = () => {
        if (!this.state.mediaContent.uri) {
            return {};
        } else {
            return {
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%'
            }
        }
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
        }

        try {
            let response = await myFetch(CREATE_POST_SERVICE, { method: 'POST' }, reqData);
            console.log('Post response lol', response);
        } catch (error) {
            console.error(error);
        }
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
                            <View style={styles.mediaHolder}>
                                {this.state.mediaContent.uri && <Image source={this.state.mediaContent} style={{ width: getWidth(), height: 300, margin: 10 }} resizeMode={'contain'} />}
                                <TouchableOpacity style={[styles.mediaButtonHolder, this.getButtonStyle()]} onPress={this.mediaUpload}>
                                    {this.state.mediaContent.uri && <Text style={styles.mediaButtonText}>  {'Click again and cancel to remove'} </Text>}
                                    {!this.state.mediaContent.uri && <Text style={styles.mediaButtonText}>  {'Press here to uplaod'} </Text>}
                                </TouchableOpacity>

                            </View>
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