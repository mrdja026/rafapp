import React, { Component } from 'react';
import BackgroundView from '../view/BackgroundView';
export default class ModalScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.renderF = this.props.navigation.getParam('renderFunction');
    }

    dissmisFunction = () => {
        // this.props.dismissCallback();
    }


    render() {
        return (
            <BackgroundView>
                {this.renderF()}
            </BackgroundView>
        );
    }
}