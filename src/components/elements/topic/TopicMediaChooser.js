import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { getWidth } from '../../../screenManager';
import APPSTYLE from '../../../styles/style';
import { choseMedia } from '../../upload/mediaChooser';
import PropTypes from 'prop-types';
class TopicMediaChooser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaContent: this.props.loadedContent ? { uri: this.props.loadedContent } : { uri: null }
        }
    }
    open = async () => {
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
                this.setState({
                    mediaContent: {
                        uri: response.responseData.uri,
                        b64: response.responseData.data,
                        type: response.responseData.type,
                    },
                });
            }
            this.props.successCallback({ ...this.state.mediaContent });
        } catch (error) {
            this.props.failCallback(error);
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
    render() {
        return (
            <View style={styles.mediaHolder}>
                {
                    this.state.mediaContent.uri && <Image source={this.state.mediaContent}
                        style={{ width: getWidth(), height: 300, margin: 10 }} resizeMode={'contain'} />
                }
                {
                    this.props.canDelete && <TouchableOpacity style={[styles.mediaButtonHolder, this.getButtonStyle()]} onPress={this.open}>
                        {this.state.mediaContent.uri && <Text style={styles.mediaButtonText}>  {'Click again and cancel to remove'} </Text>}
                        {!this.state.mediaContent.uri && <Text style={styles.mediaButtonText}>  {'Press here to uplaod'} </Text>}
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
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

TopicMediaChooser.propTypes = {
    successCallback: PropTypes.func.isRequired,
    failCallback: PropTypes.func.isRequired,
    canDelete: PropTypes.bool.isRequired,
}

export default TopicMediaChooser;

