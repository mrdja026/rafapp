import { NavigationActions } from 'react-navigation';

let _navigator;

export const setTopLevelNavigator = (navRef) => {
    _navigator = navRef;
}

export const navigate = (routeName, params) => {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}

