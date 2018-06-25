import { navigate } from "../router/NavigationService";
import firebase from "react-native-firebase";
import authManager from "../../auth/auth";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const login = (email, password) => {
    return async () => {
        try {
            console.log('Say wha?');
            let response = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('Login response', response);
        } catch (error) {
            console.log('Login error', error);
        }
    }
}

export const register = (email, password) => {
    return async () => {
        try {
            let response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            console.log('Register response', response);
        } catch (error) {
            console.log('Register error', error);
        }
    }
}

export const userAuthChanged = (user) => {
    return async (dispatch) => {
        authManager.setUser(user);
        if (user._user) {
            dispatch({ type: LOGIN });
            navigate('App');
        } else {
            dispatch({ type: LOGOUT });
        }
    }
}
