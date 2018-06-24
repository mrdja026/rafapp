import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from '../home/Home';
import { setTopLevelNavigator } from './NavigationService';


const AppNavigation = DrawerNavigator({
    screen: StackNavigator({
        Home: {
            screen: Home,
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

    render() {
        return (
            <RootStack ref={navigationRef => {
                setTopLevelNavigator(navigationRef)
            }} />
        )
    }
}