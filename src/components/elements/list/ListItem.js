import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import APPSTYLE from '../../../styles/style';
import { dateFormat } from '../../../const';
const ListItem = (props) => {
    onPress = () => {
        props.onPress(props.id);
    }
    getDate = () => {
        //TODO: change this to from now;
        return dateFormat(props.data.createdOn);
    }
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                {props.data.mediaContent && <Image style={styles.picture} source={{ uri: props.data.mediaContentThumb }} />}
                <Text numberOfLines={5} style={APPSTYLE.bigText}> {props.title} </Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={APPSTYLE.smallText}>u/{props.data.userId.username}</Text>
                <Text style={APPSTYLE.smallText}>{this.getDate()}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    infoBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    picture: {
        width: 60,
        height: 60
    },

});

export default ListItem;




