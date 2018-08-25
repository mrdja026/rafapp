import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'native-base';
export default QuickReply = (props) => {
    return (
        <View style={styles.container}>
            <Input placeholder={'Enter quick reply'} value={props.newComment} onChangeText={props.setNewComment} />
            <Button style={{ margin: 5 }} onPress={props.sendComment}>
                <Text> Post </Text>
            </Button>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});