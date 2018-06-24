import { navigate } from "../router/NavigationService";
import firebase from "react-native-firebase";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const login = (email, password) => {
    console.log('What?', email, password);
    return async (dispatch) => {
        try {
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
