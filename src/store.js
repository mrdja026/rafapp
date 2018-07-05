import { createStore, applyMiddleware, combineReducers } from 'redux';
import auth from './components/auth/reducer';
import food from './components/food/reducer';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
    auth,
    food,
})

export default createStore(
    rootReducer,
    applyMiddleware(thunk),
);