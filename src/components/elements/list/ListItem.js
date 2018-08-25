import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = (props) => {
    onPress = () => {
        props.onPress(props.id);
    }
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={onPress} style={{ flex: 1, flexDirection: 'row', height: 70, justifyContent: 'flex-start', alignItems: 'center' }}>
                {props.data.mediaContent && <Image style={{ width: 60, height: 60 }} source={{ uri: props.data.mediaContentThumb }} />}
                <Text numberOfLines={5} style={{ fontSize: 25, color: '#324291' }}> {props.title} </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default ListItem;
