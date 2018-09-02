import React, { Component } from 'react';
import { BackHandler, View, Text, Button } from 'react-native';
import { NavigationActions, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from '../home/Home';
import UserDetails from '../user/UserDetails';
import { setTopLevelNavigator, getNavigator } from './NavigationService';
import TechnologyFeed from '../technology/TechnologyFeed';
import FoodFeed from '../food/FoodFeed';
import LifeStyleFeed from '../lifestyle/LifestyleFeed';
import TopicAdd from '../elements/topic/TopicAdd';
import TopicView from '../elements/topic/TopicView';
import ModalScreen from '../elements/modal/Modal';
const AppNavigation = createDrawerNavigator({
    screen: createStackNavigator({
        Home: {
            screen: Home,
        },
        UserDetails: {
            screen: UserDetails,
        },
        Tech: {
            screen: TechnologyFeed,
        },
        Food: {
            screen: FoodFeed
        },
        Lifestyle: {
            screen: LifeStyleFeed,
        },
        NewTopic: {
            screen: TopicAdd,
        },
        TopicView: {
            screen: TopicView,
        },
       
    })
})
AppNavigation.navigationOptions = {
    header: null,
}

const AppWithModalNavigation = createStackNavigator({
    Main: AppNavigation,
    Modal: ModalScreen,
})

const RootStack = createSwitchNavigator({
    Auth: createStackNavigator({
        Login: {
            screen: Login
        },
        Register: {
            screen: Register,
        }
    }, {
            initialRouteName: 'Login'
        }),
    App: {
        screen: AppWithModalNavigation
    }
}, {
        initialRouteName: 'Auth',
    });

RootStack.navigationOptions = {
    header: null,
}
export default class AppNavigator extends Component {
    constructor(props) {
        super(props);

    }
    //TODO:Remove this 
    // componentDidMount() {
    //     BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    // }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    // }

    // onBackPress = () => {
    //     console.log('Back action');
    //     let navigation = getNavigator();
    //     let { nav } = navigation.state;
    //     let { dispatch } = navigation;
    //     if (nav.index === 0) {
    //         //Login check? must not allow this.
    //         return true;
    //     }
    //     //Handle exit app if screen is home;
    //     dispatch(NavigationActions.back());
    //     return true;
    // };

    render() {
        return (
            <RootStack ref={navigationRef => {
                setTopLevelNavigator(navigationRef)
            }} />
        )
    }
}

