import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import APPSTYLE from '../../../styles/style';
import { dateFormat } from '../../../const';
import VotingComponent from './Voting';
import { myFetch } from '../../../api/utils';
import { VOTE_POST_SERVICE } from '../../../api/api';
import { errorToast } from '../../toast/consts';
import { showToast } from '../../toast/rafToast';
const UP_VOTE = '+';
const DOWN_VOTE = '-';
const ListItem = (props) => {
    onPress = () => {
        props.onPress(props.id);
    }
    getDate = () => {
        //TODO: change this to from now;
        return dateFormat(props.data.createdOn);
    }

    incrementPostScore = async () => {
        try {
            let result = await myFetch(VOTE_POST_SERVICE, { method: 'POST' }, { id: props.id, type: UP_VOTE });
            console.log('Updateted post', result);
        } catch (error) {
            showToast(errorToast())
        }

    }
    decrementPostScore = async () => {
        try {
            let result = await myFetch(VOTE_POST_SERVICE, { method: 'POST' }, { id: props.id, type: DOWN_VOTE });
            console.log('Updateted post', result);
        } catch (error) {
            showToast(errorToast())
        }
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2 }}>
                <VotingComponent
                    score={props.data.score}
                    incrementScore={this.incrementPostScore}
                    decrementScore={this.decrementPostScore}
                />
            </View>
            <View style={{ flex: 8 }}>
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
            </View>
        </View>
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




