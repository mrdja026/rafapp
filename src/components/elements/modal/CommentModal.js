import React, { Component } from 'react';
import { View, Text, Item, Label, Input, Button } from 'native-base';
import APPSTYLE, { DEFAULT_FONT_COLOR } from '../../../styles/style';
import { goBack, navigate } from '../../router/NavigationService';

export default class CommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        }
    }

    onTextChange = (text) => {
        this.setState({ comment: text });
    }
    dismissAction = () => {
        this.props.dismissFunction && this.props.dismissFunction();
        goBack();
    }

    sendComment = () => {
        this.props.okAction(this.state.comment);
        goBack();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button transparent onPress={this.dismissAction}>
                        <Text style={[APPSTYLE.normalText, {}]}>X</Text>
                    </Button>
                    <Text style={APPSTYLE.headingText}>Add comment</Text>
                    <Button transparent onPress={this.sendComment}>
                        <Text style={[APPSTYLE.normalText, {}]}>POST</Text>
                    </Button>
                </View>
                <View style={{ marginTop: 20, }}>
                    <View style={{ width: '100%', borderBottomColor: '#edcda3', borderBottomWidth: 1 }}>
                        <Text style={[APPSTYLE.normalText, {}]}>{this.props.replyTo}</Text>
                    </View>
                    <Item style={{}} floatingLabel>
                        <Label style={APPSTYLE.normalText}> Your reply </Label>
                        <Input value={this.state.comment} onChangeText={this.onTextChange} />
                    </Item>
                </View>
            </View>
        )
    }
}