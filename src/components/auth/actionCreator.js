import { navigate } from "../router/NavigationService";
import firebase from "react-native-firebase";
import authManager, { USER_DATA } from "../../auth/auth";
import { LOGIN_SERVICE, REGISTER_SERVICE } from "../../api/api";
import { myFetch } from "../../api/utils";
import { getStorageItem } from "../../storage";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const login = (email, password, firstLogin = false) => {
    return async (dispatch) => {
        try {
            let loginResult = await myFetch(LOGIN_SERVICE, {
                method: 'POST',
            }, { username: email, password: password });
            if (loginResult.loginStatus) {
                let { user } = loginResult;
                user.logedIn = true;
                authManager.setUser(user);
                dispatch({ type: LOGIN });
                if (!firstLogin) {
                    navigate('App');
                } else {
                    navigate('UserDetails');
                }
            } else {
                dispatch({ type: LOGOUT });
            }
        } catch (error) {
            console.log('Login error', error);
        }
    }
}
export const register = (username, email, password) => {
    return async (dispatch) => {
        try {
            let registerResult = await myFetch(REGISTER_SERVICE, { method: 'POST' },
                { username: username, password: password, email: email }
            );
            console.log('REGISTER STATUS', registerResult);
            if (registerResult.OK) {
                dispatch(login(username, password, true));
            } else {
                console.log('Register not ok');
            }
        } catch (error) {
            console.log('Register error', error);
        }
    }
}

export const checkUserCredentials = () => {
    return async (dispatch) => {
        try {
            let _user = await getStorageItem(USER_DATA);
            console.log('Check user credentials', _user);
            if (!_user) {
                dispatch({ type: LOGOUT });
            } else {
                authManager.setUser(_user);
                dispatch({ type: LOGIN });
                navigate('App');
            }
        } catch (error) {
            console.log('Error while checking user data', error);
            dispatch({ type: LOGOUT });
        }
    }
}

