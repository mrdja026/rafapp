import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'native-base'
import APPSTYLE, { DEFAULT_FONT_COLOR } from '../../../styles/style';

export default class VotingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _onIncrement = () => {
        this.props.incrementScore();
    }
    _onDecrement = () => {
        this.props.decrementScore();
    }

    render() {
        return (
            <View style={style.container}>
                <IncrementButton increment={this._onIncrement} />
                <Text style={APPSTYLE.smallText}>{this.props.score}</Text>
                <DecrementButton increment={this._onDecrement} />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconStyle: {
        color: DEFAULT_FONT_COLOR,
    }
})


const IncrementButton = (props) => {
    return (
        <TouchableOpacity onPress={props.increment}>
            <Icon style={style.iconStyle} type="FontAwesome" name="plus" />
        </TouchableOpacity>
    )
}

const DecrementButton = (props) => {
    return (
        <TouchableOpacity onPress={props.increment}>
            <Icon style={style.iconStyle} type="FontAwesome" name="minus" />
        </TouchableOpacity>
    )
}
