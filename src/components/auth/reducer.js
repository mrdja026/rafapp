import { combineReducers } from 'redux';
import { LOGIN, LOGOUT } from './actionCreator';

const initState = {
    userLogedIn: false,
}

const auth = (state = initState, action) => {
    switch (action.type) {
        case LOGIN: {
            return { ...state, userLogedIn: true };
        }
        case LOGOUT: {
            return { ...state, userLogedIn: false };
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({ auth });