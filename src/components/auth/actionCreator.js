import { navigate } from "../router/NavigationService";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const login = () => {
    return (dispatch, getState) => {
        // dispatch({ type: 'LOGIN' })
        navigate('App');
    }
}
