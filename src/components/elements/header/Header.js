import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Header, Icon, View } from 'native-base';
import APPSTYLE, { BORDER_COLOR } from '../../../styles/style';
const DefaultFeedHeader = (props) => {
    console.log("Header props", props);
    return (
        <Header transparent style={styles.header}>
            <Text style={APPSTYLE.bigText}> {props.title} </Text>
            <TouchableOpacity onPress={props.toggleSubscription}>
                {props.subbed.loading && <ActivityIndicator color={'blue'} size={25} />}
                {!props.subbed.loading && <View>
                    {props.subbed.subbed && <Icon style={{ color: '#324291' }} type="FontAwesome" name="bell" />}
                    {!props.subbed.subbed && <Icon style={{ color: '#324291' }} type="FontAwesome" name="pencil" />}
                </View>}
            </TouchableOpacity>
        </Header>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
    }
});

export default DefaultFeedHeader;
