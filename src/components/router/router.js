import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from '../home/Home';
import { setTopLevelNavigator, getNavigator } from './NavigationService';
import TestComponent from '../home/TestScreen';


const AppNavigation = DrawerNavigator({
    App: StackNavigator({
        Home: {
            screen: Home,
        },
        NotHome: {
            screen: TestComponent,
        }
    })
})
AppNavigation.navigationOptions = {
    header: null,
}
const RootStack = StackNavigator({
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register
    },
    App: {
        screen: AppNavigation
    }
}, {

        initialRouteName: 'Login',
    });

RootStack.navigationOptions = {
    header: null,
}
export default class AppNavigator extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        let navigation = getNavigator();
        let { nav } = navigation.state;
        let { dispatch } = navigation;
        if (nav.index === 0) {
            //Login check? must not allow this.
            return true;
        }
        //Handle exit app if screen is home;
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        return (
            <RootStack ref={navigationRef => {
                setTopLevelNavigator(navigationRef)
            }} />
        )
    }
}