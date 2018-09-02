import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import APPSTYLE, { BORDER_COLOR } from '../../../styles/style';
import { dateFormat } from '../../../const';
class CommentBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={APPSTYLE.normalText}> Comments </Text>
                <View style={styles.container}>
                    {!this.props.loading && this.props.comments.map(item => {
                        return (
                            <SingleComment onPress={this.props.commentExpand} key={item._id} item={item} />
                        )
                    })}
                    {this.props.loading && <ActivityIndicator size={30} color={'blue'} />}
                </View>
            </View>
        );
    }
}

const SingleComment = (props) => {
    onPress = () => {
        // props.onPress(props.item._id);
    }
    return (
        <View style={styles.singleComment}>
            <TouchableOpacity onPress={this.onPress}>
                <Text style={APPSTYLE.normalText}>{props.item.content} </Text>
            </TouchableOpacity>
            <View style={styles.commentInfo}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={APPSTYLE.smallText}>@{props.item.userId.username}</Text>
                    <Text style={APPSTYLE.smallText}>{dateFormat(props.item.createdOn)}</Text>
                </View>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={APPSTYLE.smallText}>Reply</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    singleComment: {
        marginBottom: 10,
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        borderLeftWidth: 1,
    },
    commentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});
export default CommentBox;
