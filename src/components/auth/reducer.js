import { combineReducers } from 'redux';
import { LOGIN, LOGOUT } from './actionCreator';
import authManager from '../../auth/auth';

const initState = {
    userLogedIn: false,
    loading: true,
}

const auth = (state = initState, action) => {
    switch (action.type) {
        case LOGIN: {
            return { ...state, userLogedIn: true, user: authManager.getUser(), loading: false };
        }
        case LOGOUT: {
            return { ...state, userLogedIn: false, loading: false, user: authManager.getUser() };
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({ auth });