import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
class CommentBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text> Comments </Text>
                <ScrollView contentContainerStyle={styles.container}>
                    {!this.props.loading && this.props.comments.map(item => {
                        return (
                            <SingleComment onPress={this.props.commentExpand} key={item._id} item={item} />
                        )
                    })}
                    {this.props.loading && <ActivityIndicator size={30} color={'blue'} />}
                </ScrollView>
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
                <Text> {props.item.content} </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    singleComment: {
        margin: 5,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1
    }
});
export default CommentBox;
