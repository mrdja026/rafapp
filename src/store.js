import { createStore, applyMiddleware, combineReducers } from 'redux';
import auth from './components/auth/reducer';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
    auth,
})

export default createStore(
    rootReducer,
    applyMiddleware(thunk),
);